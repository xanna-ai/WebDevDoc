import React, { useState } from 'react'
import { Box, List, Modal } from '@mui/material'

import { IDataLink, IFile, ITechReqRow } from '../models/ITechReq'
import ListFiles from './ListFiles'
import ListSection from './ListSection'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
}

type TProps = {
    handleViewFormLink: () => void
    handlerCreateLink: (dst: IDataLink) => void
    files: IFile[]
}

/**
 * Компонент для установки связей
 * @param handleViewFormLink - функция отвечающая за отображение формы связей
 * @param files - список файлов
 * @param handlerCreateLink - функция формирования связи
 * @constructor
 */
const SetLink: React.FC<TProps> = ({ handleViewFormLink, files, handlerCreateLink }) => {

    const [ open, setOpen ] = useState<boolean>(true)
    const [ selectFile, setSelectFile ] = useState<IFile | null>(null)

    const handleClose = () => {
        handleViewFormLink()
        setOpen(false)
    }

    const handleSelectFile = (file: IFile) => setSelectFile(file)

    const handleSelectSection = (section: ITechReqRow) => {
        handlerCreateLink({ fileId: selectFile ? selectFile.id : 0, rowId: section.id})
        setOpen(false)
        handleViewFormLink()
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style }}>
                <List>
                    {selectFile
                        ?
                            <ListSection file={selectFile} handleSelectSection={handleSelectSection} />
                        :
                            <ListFiles files={files} handleSelectFile={handleSelectFile} />
                    }
                </List>
            </Box>
        </Modal>
    )
}

export default SetLink