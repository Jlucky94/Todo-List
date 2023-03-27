import React from 'react';
import {Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";


const Packs = () => {

        function createData(
            name: string,
            cardsCount: number,
            updated: number,
            userName: number,
        ) {
            return {name, cardsCount, updated, userName};
        }

        const data = [
            createData('Frozen yoghurt', 159, 6.0, 24),
            createData('Ice cream sandwich', 237, 9.0, 37),
            createData('Eclair', 262, 16.0, 24),
            createData('Cupcake', 305, 3.7, 67),
            createData('Gingerbread', 356, 16.0, 49),
        ]


        return (
            <div>
                <Container style={{display: 'flex', flexDirection: 'column'}}>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="left">Cards</TableCell>
                                    <TableCell align="left">Last update</TableCell>
                                    <TableCell align="left">Created by</TableCell>
                                    <TableCell align="left">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.userName}</TableCell>
                                        <TableCell align="left">{row.cardsCount}</TableCell>
                                        <TableCell align="left">{row.updated}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </div>
        );
    }
;

export default Packs;