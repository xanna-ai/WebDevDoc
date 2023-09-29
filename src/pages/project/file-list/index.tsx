import React, { useEffect, useState } from 'react'
import { TreeItem, TreeItemContentProps, TreeItemProps, TreeView, useTreeItem } from '@mui/lab'
import {Divider, Menu, MenuItem, Typography} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import clsx from 'clsx'

import { IDataLink, IFile, IProject, ITechReqRow } from '../../../models/ITechReq'
import SetLink from '../../../components/SetLink'
import { getItem, getLinks, getParents } from '../../../utils/searchTreeNode'

const CustomContent = React.forwardRef(function CustomContent(
    props: TreeItemContentProps,
    ref,
) {
    const {
        classes,
        className,
        label,
        nodeId,
        icon: iconProp,
        expansionIcon,
        displayIcon,
        onClick,
    } = props;

    const {
        disabled,
        expanded,
        selected,
        focused,
        handleExpansion,
        preventSelection,
    } = useTreeItem(nodeId)

    const icon = iconProp || expansionIcon || displayIcon

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => preventSelection(event)

    const handleExpansionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleExpansion(event)

    return (
        <div className={clsx(className, classes.root, {
            [classes.expanded]: expanded,
            [classes.selected]: selected,
            [classes.focused]: focused,
            [classes.disabled]: disabled,
        })}
             onMouseDown={handleMouseDown}
             ref={ref as React.Ref<HTMLDivElement>}
        >
            <div onClick={handleExpansionClick} className={classes.iconContainer}>
                {icon}
            </div>
            <Typography
                id={nodeId}
                onClick={onClick}
                component="div"
                className={classes.label}
            >
                {label}
            </Typography>
        </div>
    )
})

const CustomTreeItem = (props: TreeItemProps) => <TreeItem ContentComponent={CustomContent} {...props} />

type TProps = {
    data: IProject
    handleChoiceFile: (id: number) => void
    handlerSelectedSection: (fileId: number, sectionId: string) => void
}

const FileList: React.FC<TProps> = ({ data, handleChoiceFile, handlerSelectedSection }) => {

    const [ addLink, setAddLink ] = useState<boolean>(false)
    const [ expanded, setExpanded ] = useState<string[]>([])
    const [ selected, setSelected ] = useState<string[]>([])
    const [ dataLink, setDataLink ] = useState<IDataLink>({ fileId: 0, rowId: '' })
    const [ files, setFiles ] = useState<IFile[]>(data.files)
    const [ contextMenuLink, setContextMenuLink ] = React.useState<{
        mouseX: number
        mouseY: number
    } | null>(null)

    const handleContextMenuLink = (event: React.MouseEvent) => {
        event.preventDefault()
        setContextMenuLink(
            contextMenuLink === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                :
                null,
        )
    }

    const handleCloseLink = () => {
        setContextMenuLink(null)
    }

    const handleLinkAdd = (event: React.MouseEvent, data: IDataLink) => {
        event.preventDefault()
        setDataLink({ fileId: data.fileId, rowId: (event.target as Element).id })
        handleContextMenuLink(event)
    }

    const handlerAddLink = () => {
        handleCloseLink()
        setAddLink(true)
    }

    const handlerShowLink = () => {
        handleCloseLink()
        const resExpanded: string[] = []
        const resSelected: string[] = [dataLink.rowId]
        const links = getLinks(files, dataLink.fileId, dataLink.rowId)
        if (links.length) {
            links.push(dataLink)
            links.forEach(link => {
                const file = files.filter(f => f.id === link.fileId)
                const parents = getParents(link.rowId, file[0].rows, [String(file[0].id)])
                if (!resSelected.includes(link.rowId)) resSelected.push(link.rowId)
                parents.forEach(p => {
                    if (!resExpanded.includes(p)) resExpanded.push(p)
                })
            })
        }
        setSelected(resSelected)
        setExpanded(resExpanded)
    }

    const handlerShowAll = () => {
        handleCloseLink()
        const resExpanded: string[] = []
        files.forEach(file => {
            resExpanded.push(String(file.id))
            file.rows.forEach(row => resExpanded.push(row.id))
        })
        setExpanded(resExpanded)
    }

    const handlerHideAll = () => {
        handleCloseLink()
        setExpanded([])
    }

    const handlerCreateLink = (dst: IDataLink) => {
        const copyFiles = [...files]

        let direct: 'src' | 'dst' | '' = ''
        let temp: ITechReqRow | null = null

        for (let i = 0; i < copyFiles.length; i++) {
            if (copyFiles[i].id === dataLink.fileId || copyFiles[i].id === dst.fileId) {
                direct = copyFiles[i].id === dataLink.fileId ? 'src' : 'dst'
                if (direct === 'src') {
                    temp = getItem(dataLink.rowId, copyFiles[i].rows)
                    if (temp) temp.link.push(dst)
                } else {
                    temp = getItem(dst.rowId, copyFiles[i].rows)
                    if (temp) temp.link.push(dataLink)
                }
            }
        }
        setFiles(copyFiles)
    }

    const handleViewFormLink = () => setAddLink(false)

    const renderTree = (nodes: ITechReqRow, fileId: number) => (
        nodes.type === 'str'
        ?
            <CustomTreeItem
                id={nodes.id}
                key={nodes.id}
                nodeId={nodes.id}
                label={nodes.value}
                onContextMenu={(e) => handleLinkAdd(e, { fileId, rowId: nodes.id })}
                onClick={(e) => handlerSelectedSection(fileId, (e.target as Element).id)}
            >
                {Array.isArray(nodes.children)
                    ? nodes.children.map((node) => renderTree(node, fileId))
                    : null
                }
            </CustomTreeItem>
        :
            null
    )

    const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds)
    }

    const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setSelected(nodeIds)
    }

    useEffect(() => {
        setFiles(data.files)
    }, [data])

    return (
        <>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
                sx={{ overflow: 'auto', maxHeight: 'calc(100vh - 64px)' }}
            >
                {files.map(file => (
                    <CustomTreeItem
                        key={file.id}
                        nodeId={`${file.id}`}
                        label={file.name}
                        onClick={() => handleChoiceFile(file.id)}
                    >
                        {file.rows.map(row => renderTree(row, file.id))}
                    </CustomTreeItem>
                ))}
            </TreeView>
            <Menu
                open={contextMenuLink !== null}
                onClose={handleCloseLink}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenuLink !== null
                        ? { top: contextMenuLink.mouseY, left: contextMenuLink.mouseX }
                        : undefined
                }
            >
                <MenuItem onClick={handlerAddLink}>Добавить связь</MenuItem>
                <MenuItem onClick={handlerShowLink}>Просмотр связей</MenuItem>
                <Divider />
                <MenuItem onClick={handlerShowAll}>Развернуть дерево</MenuItem>
                <MenuItem onClick={handlerHideAll}>Свернуть дерево</MenuItem>
            </Menu>
            {addLink &&
                <SetLink
                    handleViewFormLink={handleViewFormLink}
                    files={data.files.filter(file => file.id !== dataLink.fileId)}
                    handlerCreateLink={handlerCreateLink}
                />
            }
        </>
    )
}

export default FileList