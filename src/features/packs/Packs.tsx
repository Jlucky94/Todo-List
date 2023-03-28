import React, {useEffect} from 'react';
import {Button, Container, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {createPackTC, getPacksTC} from "./packsSlice";
import {useNavigate, useParams} from "react-router-dom";
import SearchAndFilterBlock from "../../common/components/searchAndFilterBlock/SearchAndFilterBlock";
import PacksTable from "./table/PacksTable";


const Packs = () => {
        const params = useParams()
        const navigate = useNavigate()
        const dispatch = useAppDispatch()
        const queryParams = useAppSelector(state => state.packs.params)
        const addPackHandler = () => dispatch(createPackTC({
            cardsPack: {
                name: 'new FUcking pack',
                deckCover: '',
                private: false
            }
        }))

        useEffect(() => {

            dispatch(getPacksTC({}))

        }, [])


        return (
            <Container style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Typography component={'span'}>
                        Pack list
                    </Typography>
                    <Button onClick={addPackHandler}>
                        Add new pack
                    </Button>
                </div>
                <SearchAndFilterBlock/>
                <PacksTable/>
            </Container>
        );
    }
;

export default Packs;