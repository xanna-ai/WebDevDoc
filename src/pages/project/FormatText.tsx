import React from 'react'
import { Box, Button, ButtonGroup } from '@mui/material'

import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'

import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'

import { IFormatText, ITechReqRow } from '../../models/ITechReq'

type TProps = {
    row: ITechReqRow | null,
    handleChangeFormat: (formatItem: (keyof IFormatText)[]) => void
}

const FormatText: React.FC<TProps> = ({ row, handleChangeFormat }) => {

    const stateBtn = (state: boolean): 'contained' | 'outlined' => state ? 'contained' : 'outlined'

    return (
        row
            ?
                <Box sx={{ marginRight: '50px' }}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button variant={stateBtn(row.styles.bold)} onClick={() => handleChangeFormat(['bold'])}><FormatBoldIcon /></Button>
                        <Button variant={stateBtn(row.styles.italic)} onClick={() => handleChangeFormat(['italic'])}><FormatItalicIcon /></Button>
                        <Button variant={stateBtn(row.styles.underline)} onClick={() => handleChangeFormat(['underline'])}><FormatUnderlinedIcon /></Button>
                    </ButtonGroup>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ marginLeft: '15px' }}>
                        <Button variant={stateBtn(row.styles.left)} onClick={() => handleChangeFormat(['left', 'center', 'right'])}><FormatAlignLeftIcon /></Button>
                        <Button variant={stateBtn(row.styles.center)} onClick={() => handleChangeFormat(['center', 'left', 'right'])}><FormatAlignCenterIcon /></Button>
                        <Button variant={stateBtn(row.styles.right)} onClick={() => handleChangeFormat(['right', 'left', 'center'])}><FormatAlignRightIcon /></Button>
                    </ButtonGroup>
                </Box>
            :
                null
    )
}

export default FormatText