import React from 'react'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import DescriptionIcon from '@mui/icons-material/Description'

import { IFile } from '../models/ITechReq'

/**
 * Компонент для отображения списка файлов в окне выбора для связей
 * files            - список файлов
 * handleSelectFile - функция для пометки, какой файл выбран в данный момент
 */
type TProps = {
    files: IFile[]
    handleSelectFile: (file: IFile) => void
}

const ListFiles: React.FC<TProps> = ({ files, handleSelectFile }) => {
    return (
        <>
            {files.map(file => (
            <ListItem key={file.id} disablePadding>
                <ListItemButton onClick={() => handleSelectFile(file)}>
                    <ListItemIcon>
                        <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary={file.name} />
                </ListItemButton>
            </ListItem>
            ))}
        </>
    )
}

export default ListFiles