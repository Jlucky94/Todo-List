import React, {useEffect, useState} from 'react';
import classes from "../../../features/packs/Packs.module.css";
import {Input, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import RangeSlider from "../rangeSlider/RangeSlider";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {packsActions} from "../../../features/packs/packsSlice";
import {useDebounce} from "use-debounce";

const SearchAndFilterBlock = () => {
    const dispatch = useAppDispatch()
    const [isShowAll, setIsShowAll] = useState(true);
    const [inputValue, setInputValue] = useState('')
    const debouncedInputValue = useDebounce(inputValue, 500)

    const handleChange = () => setIsShowAll(!isShowAll)
    const userId = useAppSelector(state => state.profile.data._id)
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const switchFilterHandler = (value: string) => () => dispatch(packsActions.setParams({user_id: value, page: 0}))

    useEffect(() => {
        dispatch(packsActions.setParams({packName: inputValue}))
    }, [debouncedInputValue[0]])

    return (
        <div className={classes.searchBlockContainer}>
            <div className={classes.search}>
                <Typography style={{textAlign: 'start'}}>Search</Typography>
                <Input type="text" value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)}/>
            </div>
            <div className={classes.filterMyAll}>
                <ToggleButtonGroup
                    color="primary"
                    value={isShowAll}
                    exclusive
                    onChange={handleChange}
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
        </div>
    );
};

export default SearchAndFilterBlock;