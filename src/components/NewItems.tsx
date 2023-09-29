import React, { useState } from 'react'
import { Box, Button, Modal, TextField } from '@mui/material'

/**
 * Компонент для добавления новго проекта или файла
 */
type TProps = {
    handlerAdd: (value: string) => void
    labelValue: string
}

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

const NewItems: React.FC<TProps> = ({ handlerAdd, labelValue }) => {

    const [ open, setOpen ] = useState<boolean>(true)
    const [ newName, setNewName ] = useState<string>('')

    const handleClose = () => {
        setOpen(false)
        handlerAdd('')
    }

    const handleAdd = () => {
        setOpen(false)
        handlerAdd(newName)
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <TextField
                        label={labelValue}
                        variant="outlined"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <Button
                        variant="outlined"
                        sx={{ marginTop: '10px' }}
                        disabled={newName.trim().length < 7}
                        onClick={handleAdd}
                    >
                        Создать
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default NewItems