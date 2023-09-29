import React from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'

import { ITechReqRow } from '../../../models/ITechReq'

type TProps = {
    data: ITechReqRow
    handleContextMenu: (event: React.MouseEvent) => void
    selectRow: (id: string) => void
}

const TechReqTable: React.FC<TProps> = ({ data, handleContextMenu, selectRow }) => {

    const { id, tableData } = data

    const handlerContext = (event: React.MouseEvent<HTMLTableElement, MouseEvent>) => {
        selectRow(id)
        handleContextMenu(event)
    }

    return (
        <TableContainer component={Paper}>
            <Table
                border={1}
                size={'small'}
                onContextMenu={(event) => handlerContext(event)}
                onClick={() => selectRow(id)}
            >
                <TableBody>
                    {tableData && tableData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell align={'center'}>{row.col1}</TableCell>
                            <TableCell align={'center'}>{row.col2}</TableCell>
                            <TableCell align={'center'}>{row.col3}</TableCell>
                            <TableCell align={'center'}>{row.col4}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TechReqTable