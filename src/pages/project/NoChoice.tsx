import React from 'react'
import { Box, Typography } from '@mui/material'

const NoChoice = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#c5bbbb' }}>
            <Typography variant="h4" component="div">
                Выберите файл для просмотра и редактирования
            </Typography>
        </Box>
    )
}

export default NoChoice