import React, { ChangeEvent, useEffect, useState } from 'react'
import {
    Button, Divider,
    Grid,
    Menu,
    MenuItem,
    TextField
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'

import TechReqRow from './TechReqRow'
import { IFile, IFormatText, ITechReqRow } from '../../../models/ITechReq'
import FormatText from '../FormatText'
import TechReqTable from './TechReqTable'
import { getItem, getNode } from '../../../utils/searchTreeNode'
import { getEmptyImg, getEmptySection, getEmptyTable } from '../../../utils/tmplRow'
import NewItems from '../../../components/NewItems'
import TechReqImg from './TechReqImg'

type TProps = {
    data: IFile
    selectedSection: string
    handlerSave: (fileId: number, rows: ITechReqRow[]) => void
}

const TechReq: React.FC<TProps> = ({ data, handlerSave, selectedSection }) => {

    const [ rows, setRows ] = useState<ITechReqRow[]>(data.rows)
    const [ selectRow, setSelectRow ] = useState<string>('')
    const [ typeRow, setTypeRow ] = useState<string>('')
    const [ addImg, setAddImg ] = useState<boolean>(false)

    const [contextMenu, setContextMenu] = React.useState<{
        mouseX: number
        mouseY: number
    } | null>(null)

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault()
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                :
                null,
        )
    }

    const handleFirstRow = (event: React.MouseEvent) => {
        event.preventDefault()
        if (rows.length) return
        setSelectRow('')
        handleContextMenu(event)
    }

    const handleSelectRow = (id: string) => {
        setSelectRow(id)
    }

    const handlerSaveRows = (): void => {
        if (!checkData(rows)) {
            alert('Заполните все поля')
        } else {
            handlerSave(data.id, rows)
        }
    }

    const checkData = (items: ITechReqRow[]): boolean => {
        for (let i = 0; i < items.length; i++) {
            const item = items[i]
            if (item.type !== 'str') continue
            if (item.value.trim() === '') {
                return false
            }
            if (Array.isArray(item.children)) {
                const temp = checkData(item.children)
                if (!temp) return false
            }
        }
        return true
    }

    const handleChangeFormat = (formatItem: (keyof IFormatText)[]) => {
        const copyRows = [...rows]
        const row = getItem(selectRow, copyRows)
        if (row) {
            formatItem.forEach((item, index) =>
                row.styles[item] = index ? false : !row.styles[item])
        }
        setRows(copyRows)
    }

    const handleClose = () => {
        setContextMenu(null)
    }

    const handleAddTable = () => {
        const copyRows: ITechReqRow[] = [...rows]
        const node = getNode(selectRow, copyRows)
        if (node) {
            node.items.splice(
                node.ind + 1,
                0,
                getEmptyTable()
            )
        }
        setRows(copyRows)
        setContextMenu(null)
    }

    const handleAddImg = () => {
        setAddImg(true)
        setContextMenu(null)
    }

    const handlerAddImgPath = (value: string): void => {
        if (value) {
            const copyRows: ITechReqRow[] = [...rows]
            const node = getNode(selectRow, copyRows)
            if (node) {
                node.items.splice(
                    node.ind + 1,
                    0,
                    getEmptyImg(value)
                )
            }
            setRows(copyRows)
        }
        setAddImg(false)
    }

    const handleAddSection = () => {
        const copyRows: ITechReqRow[] = [...rows]
        const node = getNode(selectRow, copyRows)
        if (node) {
            node.items.splice(
                node.ind + 1,
                0,
                getEmptySection('str')
            )
        } else {
            copyRows.push(getEmptySection('str'))
        }
        setRows(copyRows)
        setContextMenu(null)
    }
    const handleAddSubSection = () => {
        const copyRows: ITechReqRow[] = [...rows]
        const node = getNode(selectRow, copyRows)
        if (node) {
            node.items[node.ind].children.push(getEmptySection('str'))
        }
        setRows(copyRows)
        setContextMenu(null)
    }

    const handleAddText = () => {
        const copyRows: ITechReqRow[] = [...rows]
        const node = getNode(selectRow, copyRows)
        if (node) {
            node.items.splice(
                node.ind + 1,
                0,
                getEmptySection('txt')
            )
        } else {
            copyRows.push(getEmptySection('txt'))
        }
        setRows(copyRows)
        setContextMenu(null)
    }

    const handleRemoveSection = () => {
        const copyRows: ITechReqRow[] = [...rows]
        const node = getNode(selectRow, copyRows)
        if (node) {
            node.items.splice(node.ind, 1)
        }
        setRows(copyRows)
        setContextMenu(null)
    }

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const copyRows = [...rows]
        const row = getItem(selectRow, copyRows)
        if (row) row.value = event.target.value
        setRows(copyRows)
    }

    const renderTree = (row: ITechReqRow, isView: boolean = false): JSX.Element => (
        (selectedSection === '' || (selectedSection !== '' && selectedSection === row.id) || isView)
            ?
                <React.Fragment key={row.id}>
                    {(row.type === 'str' || row.type === 'txt') &&
                        <TechReqRow
                            handleContextMenu={handleContextMenu}
                            handleChange={handleChange}
                            key={row.id}
                            data={row}
                            selectRow={handleSelectRow}
                        />
                    }
                    {row.type === 'table' &&
                        <TechReqTable
                            handleContextMenu={handleContextMenu}
                            selectRow={handleSelectRow}
                            data={row}
                        />
                    }
                    {row.type === 'img' &&
                        <TechReqImg
                            handleContextMenu={handleContextMenu}
                            selectRow={handleSelectRow}
                            data={row}
                        />
                    }
                    {Array.isArray(row.children)
                        ? row.children.map((node) => renderTree(node, (selectedSection !== '' && selectedSection === row.id)))
                        : null
                    }
                </React.Fragment>
            :
                <React.Fragment key={row.id}></React.Fragment>
    )

    useEffect(() => {
        setRows(data.rows)
        setSelectRow('')
    }, [data])

    useEffect(() => {
        const result = getItem(selectRow, rows)
        if (result) {
            setTypeRow(result.type)
        } else {
            setTypeRow('')
        }
    }, [selectRow])

    return (
        <>
            <Grid item xs={12} >
                <TextField
                    fullWidth
                    value={'Requirement'}
                    className={'my-center my-disabled'}
                    disabled={true}
                    onContextMenu={handleFirstRow}
                />
            </Grid>
            {rows.map(item => renderTree(item))}
            {(selectRow && ['str', 'txt', 'img'].includes(typeRow)) && <FormatText row={getItem(selectRow, rows)} handleChangeFormat={handleChangeFormat} />}
            <Button
                variant="outlined"
                color="success"
                startIcon={<SaveIcon />}
                onClick={handlerSaveRows}
            >
                Сохранить
            </Button>
            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
            >
                <MenuItem onClick={handleAddSection}>Добавить раздел</MenuItem>
                {(selectRow && typeRow === 'str') ? <MenuItem onClick={handleAddSubSection}>Добавить подраздел</MenuItem> : null}
                {(selectRow && ['str', 'txt', 'img', 'table'].includes(typeRow)) ? <MenuItem onClick={handleAddText}>Добавить текст</MenuItem> : null}
                {selectRow ? <MenuItem onClick={handleRemoveSection}>Удалить</MenuItem> : null}
                {(selectRow && typeRow === 'str') ? <Divider /> : null}
                {(selectRow && ['str', 'txt', 'img', 'table'].includes(typeRow)) ? <MenuItem onClick={handleAddTable}>Добавить таблицу</MenuItem> : null}
                {(selectRow && ['str', 'txt', 'img', 'table'].includes(typeRow)) ? <MenuItem onClick={handleAddImg}>Добавить изображение</MenuItem> : null}
            </Menu>
            {addImg && <NewItems handlerAdd={handlerAddImgPath} labelValue={'Введите ссылку к изображению'} />}
        </>
    )
}

export default TechReq