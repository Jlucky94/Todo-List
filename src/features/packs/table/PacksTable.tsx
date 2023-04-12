import React from 'react';
import {
    IconButton,
    Paper,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "app/store";
import {PackType} from "api/packsAPI";
import SchoolIcon from '@mui/icons-material/School';
import {packsActions} from "../packsSlice";
import {useNavigate} from "react-router-dom";
import classes from 'features/packs/Packs.module.css'
import {EditPackModal} from "features/packs/modals/editPackModal";
import {DeletePackModal} from "features/packs/modals/deletePackModal";

export type HeadCellType = {
    id: string
    label: string
    sort: boolean
}
const PacksTable = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const packs = useAppSelector(state => state.packs.cardPacks)
    const userId = useAppSelector(state => state.profile.data._id)
    const sortPacks = useAppSelector(state => state.packs.params.sortPacks)
    const createData = (pack: PackType) => ({
        packId: pack._id,
        name: pack.name,
        cardsCount: pack.cardsCount,
        updated: pack.updated,
        creator: pack.user_name,
        userId: pack.user_id,
        cover: pack.deckCover
    });
    const rows = packs.map(pack => createData(pack))
    const packOnClickHandler = (packId: string) => () => {
        navigate('/cards/pack/' + packId)
    }
    const learnIconHandler = (packId: string) => () => navigate('/learn/' + packId)

    const arr = [
        {id: 'cover', label: 'Cover', sort: false},
        {id: 'name', label: 'Name', sort: true},
        {id: 'cardsCount', label: 'Cards', sort: true},
        {id: 'updated', label: 'Last update', sort: true},
        {id: 'user_name', label: 'Created by', sort: true},
        {id: 'actions', label: 'Actions', sort: false}
    ]
    const createHeaderCellWithSort = (header: HeadCellType) => (
            <TableCell key={header.id} style={{fontWeight: 750}}>
                {header.label}
                {header.sort&&
                    <TableSortLabel
                        direction={sortPacks === '0' + header.id ? "asc" : "desc"}
                        active={sortPacks.includes(header.id)}
                        onClick={() => dispatch(packsActions.setParams({sortPacks: sortPacks === '0' + header.id ? '1' + header.id : '0' + header.id}))}/>
                }
            </TableCell>
        )

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead className={classes.headerRow}>
                        <TableRow>
                            {arr.map(header => createHeaderCellWithSort(header))}
                        </TableRow>
                    </TableHead>
                    {packs.length ? <TableBody>
                            {rows.map((row) => (
                                <TableRow hover
                                          key={row.packId}
                                >
                                    <TableCell align="left">{row.cover}</TableCell>
                                    <TableCell component="th" scope="row" sx={{cursor: 'pointer'}}
                                               onClick={packOnClickHandler(row.packId)}>
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="left">{row.cardsCount}</TableCell>
                                    <TableCell align="left">{row.updated.slice(0, 10)}</TableCell>
                                    <TableCell align="left">{row.creator}</TableCell>
                                    <TableCell align="left">
                                        <IconButton onClick={learnIconHandler(row.packId)}
                                                    disabled={row.cardsCount === 0}>
                                            <SchoolIcon/>
                                        </IconButton>
                                        {userId === row.userId &&
                                            <EditPackModal packId={row.packId} packName={row.name}/>}
                                        {userId === row.userId &&
                                            <DeletePackModal packId={row.packId} packName={row.name}/>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        :
                        <Stack spacing={1}>
                            <Skeleton variant="rectangular" width={650}/>
                            <Skeleton variant="rectangular" width={650}/>
                            <Skeleton variant="rectangular" width={650}/>
                            <Skeleton variant="rectangular" width={650}/>
                        </Stack>
                    }
                </Table>
            </TableContainer>
        </div>
    );
};

export default PacksTable;