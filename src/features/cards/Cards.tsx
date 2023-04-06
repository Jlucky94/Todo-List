import React, {ChangeEvent, MouseEvent, useEffect, useState} from 'react';
import {Button, ButtonGroup, Container, Input, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "app/store";
import {useNavigate, useParams} from "react-router-dom";
import CardsTable from "./table/CardsTable";
import {useDebounce} from "use-debounce";
import {cardsActions, getCardsTC} from "./cardsSlice";
import classes from "features/packs/Packs.module.css";
import {parseInt} from "lodash";
import Paginator from "common/components/paginator/Paginator";
import {AddNewCardModal} from "features/cards/modals/addNewCardModal";

const Cards = () => {
        const params = useParams()
        const packId = params.packId as string
        const navigate = useNavigate()

        const dispatch = useAppDispatch()
        const userId = useAppSelector(state => state.profile.data._id)
        const currentPackUserId = useAppSelector(state => state.cards.packUserId)
        const queryParams = useAppSelector(state => state.cards.params)
        const totalCardsCount = useAppSelector(state => state.cards.cardsTotalCount)
        const cardsPageSize = useAppSelector(state => state.cards.params.pageCount)
        const packName = useAppSelector(state => state.cards.packName)

        const [inputValue, setInputValue] = useState('')
        const debouncedQueryParams = useDebounce(queryParams, 650)
        const debouncedInputValue = useDebounce(inputValue, 500)
        const learnToPackHandler = () => navigate('/learn/' + packId)
        const backToPackListHandler = () => navigate("/cards/packs")

        const handleChangePage = (
            event: MouseEvent<HTMLButtonElement> | null,
            newPage: number,
        ) => dispatch(cardsActions.setParams({page: newPage}))
        const handleChangeRowsPerPage = (
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => dispatch(cardsActions.setParams({pageCount: parseInt(event.target.value), page: 0}));


        useEffect(() => {
            dispatch(cardsActions.setParams({cardsPack_id: packId, cardQuestion: inputValue}))
        }, [debouncedInputValue[0]])
        useEffect(() => {
            dispatch(getCardsTC())
        }, [debouncedQueryParams[0]])


        return (
            <Container style={{display: 'flex', flexDirection: 'column'}}>

                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Typography component={'span'} fontWeight={"bold"} fontStyle={"oblique"}>
                        {packName}
                    </Typography>

                    <ButtonGroup>
                        <Button onClick={backToPackListHandler}>Back to pack list</Button>

                        {currentPackUserId === userId ?
                            <AddNewCardModal cardPack_id={packId}/>
                            :
                            <Button onClick={learnToPackHandler} variant={'contained'} disabled={totalCardsCount === 0}>
                                Learn to pack
                            </Button>}
                    </ButtonGroup>
                </div>

                <div style={{display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>
                    <div className={classes.search}>
                        <Typography style={{textAlign: 'start'}}>
                            Search
                        </Typography>
                        <Input type="text" value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)}/>
                    </div>

                    <Paginator dispatch={dispatch} totalItemsCount={totalCardsCount} pageSize={cardsPageSize}
                               page={queryParams.page} handleChangePage={handleChangePage}
                               handleChangeRowsPerPage={handleChangeRowsPerPage}/>
                </div>

                <CardsTable/>

                {totalCardsCount === 0 &&
                    <Typography>
                        No cards found, try to change filter parameters
                    </Typography>}

            </Container>
        );
    }
;

export default Cards;