import React from 'react'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'

import {IFile, ITechReqRow} from '../models/ITechReq'

/**
 * Компонент для отображения списка секций внутри выбранного файла в окне выбора для связей
 */
type TProps = {
    file: IFile
    handleSelectSection: (section: ITechReqRow) => void
}

const ListSection: React.FC<TProps> = ({ file, handleSelectSection }) => {

    const renderTree = (row: ITechReqRow): JSX.Element => (
        row.type === 'str'
        ?
            <React.Fragment key={row.id}>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => handleSelectSection(row)}>
                        <ListItemIcon>
                            <ArticleIcon />
                        </ListItemIcon>
                        <ListItemText primary={row.value} />
                    </ListItemButton>
                </ListItem>
                {Array.isArray(row.children)
                    ? row.children.map((node) => renderTree(node))
                    : null
                }
            </React.Fragment>
        :
            <React.Fragment key={row.id}></React.Fragment>
    )

    return (
        <>
            {file.rows.map(row => renderTree(row))}
        </>
    )
}

export default ListSection