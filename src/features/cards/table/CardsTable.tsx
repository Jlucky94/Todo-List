import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel} from "@mui/material";
import {useAppDispatch, useAppSelector} from "app/store";
import {CardType} from "api/cardsAPI";
import {DeleteCardModal} from "features/cards/modals/deleteCardModal";
import {EditCardModal} from "features/cards/modals/editCardModal";
import {packsActions} from "features/packs/packsSlice";
import {HeadCellType} from "features/packs/table/PacksTable";

const CardsTable = () => {
    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.cards.cards)
    const userId = useAppSelector(state => state.profile.data._id)
    const currentPackUserId = useAppSelector(state => state.cards.packUserId)
    const sortCards = useAppSelector(state => state.cards.params.sortCards)
    const createData = (card: CardType) => ({
        key: card._id,
        question: card.question,
        answer: card.answer,
        updated: card.updated,
        grade: card.grade,
        userId: card.user_id
    });
    const rows = cards.map(card => createData(card))

    const arr = [
        {id: 'question', label: 'Question'},
        {id: 'answer', label: 'Answer'},
        {id: 'updated', label: 'Last update'},
        {id: 'grade', label: 'Grade'},
    ]

    const createHeaderCellWithSort = (header: HeadCellType) => (
        <TableCell key={header.id} style={{fontWeight: 750}}>
            {header.label}
            <TableSortLabel
                direction={sortCards === '0' + header.id ? "asc" : "desc"}
                active={sortCards.includes(header.id)}
                onClick={() => dispatch(packsActions.setParams({sortPacks: sortCards === '0' + header.id ? '1' + header.id : '0' + header.id}))}/>
        </TableCell>)


    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {arr.map(header => createHeaderCellWithSort(header))}

                            {userId === currentPackUserId &&
                                <TableCell align="left" style={{fontWeight: 750}}>
                                    Actions
                                </TableCell>}
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
                                </TableCell>
                                {userId === row.userId && <TableCell align="left">
                                    <EditCardModal cardId={row.key} question={row.question} answer={row.answer}/>
                                    <DeleteCardModal cardId={row.key} cardName={row.question}/>
                                </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default CardsTable;