import React from 'react';
import {Icon, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {PackType, UpdatePackRequestType} from "../../../api/packsAPI";
import SchoolIcon from '@mui/icons-material/School';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import {deletePackTC, updatePackTC} from "../packsSlice";

const PacksTable = () => {
    const dispatch = useAppDispatch()
    const packs = useAppSelector(state => state.packs.cardPacks)
    const userId = useAppSelector(state => state.profile.data._id)
    const createData = (pack: PackType) => ({
        key: pack._id,
        name: pack.name,
        cards: pack.cardsCount,
        updated: pack.updated,
        creator: pack.user_name,
        userId: pack.user_id
    });
    const rows = packs.map(pack => createData(pack))
    const deletePackHandler = (id: string) => () => dispatch(deletePackTC({id}))
    const updatePackHandler = (data: UpdatePackRequestType) => () => dispatch(updatePackTC(data))

    return (
        <div>
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
                        {rows.map((row) => (
                            <TableRow
                                key={row.key}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="left">{row.cards}</TableCell>
                                <TableCell align="left">{row.updated.slice(0, 10)}</TableCell>
                                <TableCell align="left">{row.creator}</TableCell>
                                <TableCell align="left">
                                    <Icon>
                                        <SchoolIcon/>
                                    </Icon>
                                    {userId === row.userId && <Icon>
                                        <ModeEditIcon onClick={updatePackHandler({
                                            cardsPack: {
                                                _id: row.key,
                                                name: 'newNamePack',
                                                grade: 2,
                                                private: false
                                            }
                                        })}/>
                                    </Icon>}
                                    {userId === row.userId && <Icon>
                                        <DeleteSweepIcon onClick={deletePackHandler(row.key)}/>
                                    </Icon>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default PacksTable;