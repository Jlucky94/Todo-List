import React, {ChangeEvent, useEffect, useState} from 'react';
import classes from "features/packs/Packs.module.css";
import {IconButton, Input, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "app/store";
import {packsActions, packsInitialState} from "features/packs/packsSlice";
import {useDebounce} from "use-debounce";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import Grid from "@mui/material/Grid";
import RangeSlider from "common/components/rangeSlider/RangeSlider";

const SearchAndFilterBlock = () => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.profile.data._id)
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)

    const [isShowAll, setIsShowAll] = useState(true);
    const [inputValue, setInputValue] = useState('')
    const debouncedInputValue = useDebounce(inputValue, 500)

    const AllMyPacksToggleHandler = () => setIsShowAll(!isShowAll)
    const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)
    const switchFilterHandler = (value: string) => () => dispatch(packsActions.setParams({user_id: value, page: 0}))

    const clearFilterHandler = () => {
        setInputValue('')
        setIsShowAll(true)
        dispatch(packsActions.setParams({...packsInitialState.params}))
    }

    useEffect(() => {
        dispatch(packsActions.setParams({packName: inputValue, page: 0}))
    }, [debouncedInputValue[0]])


    return (
        <Grid container className={classes.searchBlockContainer}>
            <Grid item xs={3} className={classes.search}>
                <Typography style={{textAlign: 'start'}}>Search</Typography>
                <Input type="text" value={inputValue} onChange={searchInputHandler}/>
            </Grid>
            <Grid item xs={3} className={classes.filterMyAll}>
                <ToggleButtonGroup
                    color="primary"
                    value={isShowAll}
                    exclusive
                    onChange={AllMyPacksToggleHandler}
                    aria-label="Platform"
                >
                    <ToggleButton value={true} onClick={switchFilterHandler('')}>All packs</ToggleButton>
                    <ToggleButton value={false} onClick={switchFilterHandler(userId)}>My packs</ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Grid item xs={3} className={classes.filterQuantity}>
                <Typography style={{textAlign: 'end'}}>
                    Number of cards
                </Typography>
                <RangeSlider min={minCardsCount} max={maxCardsCount}/>
            </Grid>
            <Grid xs={0.5} item style={{alignSelf: 'center'}}>
                <IconButton>
                    <FilterAltOffIcon onClick={clearFilterHandler}/>
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default SearchAndFilterBlock;