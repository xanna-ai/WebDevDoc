import React, { ChangeEvent } from 'react'
import { Grid, TextField } from '@mui/material'

import { ITechReqRow } from '../../../models/ITechReq'

type TProps = {
    data: ITechReqRow
    selectRow: (id: string) => void
    handleContextMenu: (event: React.MouseEvent) => void
    handleChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}

const TechReqRow: React.FC<TProps> = ({ data, selectRow, handleContextMenu, handleChange }) => {

    const { id, value, styles } = data

    let style: string = ''
    if (styles.bold) style += 'my-bold '
    if (styles.italic) style += 'my-italic '
    if (styles.underline) style += 'my-underline '
    if (styles.left) style += 'my-left '
    if (styles.center) style += 'my-center '
    if (styles.right) style += 'my-right '

    return (
        <>
            <Grid onContextMenu={handleContextMenu} item xs={12} >
                <TextField
                    id={`${id}`}
                    fullWidth
                    value={value}
                    className={style}
                    onFocus={() => selectRow(id)}
                    onChange={handleChange}
                    multiline
                />
            </Grid>
        </>
    )
}

export default TechReqRow