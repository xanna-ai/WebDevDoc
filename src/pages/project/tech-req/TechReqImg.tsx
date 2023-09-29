import React from 'react'
import { Box } from '@mui/material'

import { ITechReqRow } from '../../../models/ITechReq'

type TProps = {
    data: ITechReqRow
    handleContextMenu: (event: React.MouseEvent) => void
    selectRow: (id: string) => void
}

const TechReqImg: React.FC<TProps> = ({ data, handleContextMenu, selectRow }) => {

    const { id, value, styles } = data

    let style = 'center'
    if (styles.left) style = 'start'
    if (styles.right) style = 'end'
    if (styles.center) style = 'center'

    const handlerContext = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        selectRow(id)
        handleContextMenu(event)
    }

    return (
        <Box
            sx={{ width: '100%', minHeight: '200px', marginY: '5px', display: 'flex', justifyContent: style }}
            onContextMenu={(event) => handlerContext(event)}
            onClick={() => selectRow(id)}
        >
            <Box
                sx={{
                    height: '200px',
                    width: '200px',
                    backgroundImage: `url(${value})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}
            />
        </Box>
    )
}

export default TechReqImg