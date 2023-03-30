import React, {useEffect, useState} from 'react';
import {Button, Container, Input, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {useParams} from "react-router-dom";
import CardsTable from "./table/CardsTable";
import Paginator from "../../common/components/paginator/Paginator";
import {useDebounce} from "use-debounce";
import {cardsActions, createCardTC, getCardsTC} from "./cardsSlice";
import classes from "../packs/Packs.module.css";
import {parseInt} from "lodash";

const Cards = () => {
        const params = useParams()
        const packId = params.packId
        const dispatch = useAppDispatch()
        const userId = useAppSelector(state => state.profile.data._id)
        const currentPackUserId = useAppSelector(state => state.cards.packUserId)
        const queryParams = useAppSelector(state => state.cards.params)
        const debouncedQueryParams = useDebounce(queryParams, 650)
        const totalCardsCount = useAppSelector(state => state.cards.cardsTotalCount)
        const cardsPageSize = useAppSelector(state => state.cards.params.pageCount)
        const [inputValue, setInputValue] = useState('')
        const debouncedInputValue = useDebounce(inputValue, 500)
        // const learnToPack = () => navigate to this cards

        const handleChangePage = (
            event: React.MouseEvent<HTMLButtonElement> | null,
            newPage: number,
        ) => dispatch(cardsActions.setParams({page: newPage}))
        const handleChangeRowsPerPage = (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
            dispatch(cardsActions.setParams({pageCount: parseInt(event.target.value), page: 0}));
        };
        const createCardHandler = () => dispatch(createCardTC({
            card: {
                cardsPack_id: queryParams.cardsPack_id,
                question: 'Why coding is popular nowadays?',
                answer: 'Because its very interesting',
            }
        }))

        useEffect(() => {
            dispatch(cardsActions.setParams({cardsPack_id: packId,cardQuestion:inputValue}))
        }, [debouncedInputValue[0]])
        useEffect(() => {
            dispatch(getCardsTC())
        }, [debouncedQueryParams[0]])


        return (
            <Container style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Typography component={'span'}>
                        Pack name
                    </Typography>
                    {currentPackUserId === userId ?
                        <Button variant={'contained'} onClick={createCardHandler}>
                            Add new card
                        </Button>
                        : <Button variant={'contained'}>
                            Learn to pack
                        </Button>}
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>
                    <div className={classes.search}>
                        <Typography style={{textAlign: 'start'}}>Search</Typography>
                        <Input type="text" value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)}/>
                    </div>
                    <div>
                        <Paginator dispatch={dispatch} totalItemsCount={totalCardsCount} pageSize={cardsPageSize}
                                   page={queryParams.page} handleChangePage={handleChangePage}
                                   handleChangeRowsPerPage={handleChangeRowsPerPage}/>
                    </div>
                </div>
                <CardsTable/>
            </Container>
        );
    }
;

export default Cards;