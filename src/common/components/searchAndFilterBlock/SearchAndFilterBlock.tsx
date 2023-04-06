import React, {ChangeEvent, useEffect, useState} from 'react';
import classes from "../../../features/packs/Packs.module.css";
import {Icon, Input, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import RangeSlider from "../rangeSlider/RangeSlider";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {packsActions, packsInitialState} from "../../../features/packs/packsSlice";
import {useDebounce} from "use-debounce";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

const SearchAndFilterBlock = () => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.profile.data._id)
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const queryParams = useAppSelector(state => state.packs.params)

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

    // useEffect(() => {
    //     setInputValue(queryParams.packName)
    // }, [queryParams.packName, queryParams.min, queryParams.max])
    return (
        <div className={classes.searchBlockContainer}>
            <div className={classes.search}>
                <Typography style={{textAlign: 'start'}}>Search</Typography>
                <Input type="text" value={inputValue} onChange={searchInputHandler}/>
            </div>
            <div className={classes.filterMyAll}>
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
            </div>
            <div className={classes.filterQuantity}>
                <Typography style={{textAlign: 'end'}}>
                    Number of cards
                </Typography>
                <RangeSlider min={minCardsCount} max={maxCardsCount}/>
            </div>
            <Icon>
                <FilterAltOffIcon onClick={clearFilterHandler}/>
            </Icon>
        </div>
    );
};

export default SearchAndFilterBlock;