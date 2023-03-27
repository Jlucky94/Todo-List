import React, {useEffect} from 'react';
import {Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {PackType} from "../../api/packsAPI";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {getPacksTC} from "./packsSlice";


const Packs = () => {
        const packs = useAppSelector(state => state.packs.cardPacks)
        const dispatch = useAppDispatch()
        useEffect(() => {
            dispatch(getPacksTC())
            console.log(packs)
        }, [])
        const createData = (pack: PackType) => ({
            key:pack._id,
            name: pack.name,
            cardsCount: pack.cardsCount,
            lastUpdate: pack.updated,
            createdBy: pack.user_name
        });


        const data = packs.map(pack => createData(pack))


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
                                        <TableCell align="left">{row.cardsCount}</TableCell>
                                        <TableCell align="left">{row.lastUpdate}</TableCell>
                                        <TableCell align="left">{row.createdBy}</TableCell>
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