import React from 'react';
import {Icon, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {PackType, UpdatePackRequestType} from "../../../api/packsAPI";
import SchoolIcon from '@mui/icons-material/School';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import {CardType, UpdateCardRequestType} from "../../../api/cardsAPI";
import {deleteCardTC, updateCardTC} from "../cardsSlice";
import {DeleteCardModal} from "features/packs/modals/deleteCardModal";
import {EditCardModal} from "features/packs/modals/editCardModal";

const CardsTable = () => {
    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.cards.cards)
    const userId = useAppSelector(state => state.profile.data._id)
    const createData = (card: CardType) => ({
        key: card._id,
        question: card.question,
        answer: card.answer,
        updated: card.updated,
        grade: card.grade,
        userId: card.user_id
    });
    const rows = cards.map(card => createData(card))
    const deleteCardHandler = (id: string) => () => dispatch(deleteCardTC({id}))
    const updateCardHandler = (data: UpdateCardRequestType) => () => dispatch(updateCardTC(data))

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Question</TableCell>
                            <TableCell align="left">Answer</TableCell>
                            <TableCell align="left">Last update</TableCell>
                            <TableCell align="left">Grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.key}
                            >
                                <TableCell component="th" scope="row">
                                    {row.question}
                                </TableCell>
                                <TableCell align="left">{row.answer}</TableCell>
                                <TableCell align="left">{row.updated.slice(0, 10)}</TableCell>
                                <TableCell align="left">
                                    {row.grade}
                                    {userId === row.userId &&
                                        <EditCardModal cardId={row.key} question={row.question} answer={row.answer}/>}
                                    {userId === row.userId &&
                                        <DeleteCardModal cardId={row.key} cardName={row.question}/>}
                                </TableCell>
                            </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default CardsTable;