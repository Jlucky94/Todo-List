import React, {useState} from 'react';
import classes from "../../../features/packs/Packs.module.css";
import {Input, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import RangeSlider from "../rangeSlider/RangeSlider";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {packsActions} from "../../../features/packs/packsSlice";
import {useNavigate} from "react-router-dom";

const SearchAndFilterBlock = () => {
    const dispatch = useAppDispatch()
    const [isShowAll, setIsShowAll] = useState(true);
    const handleChange = () => setIsShowAll(!isShowAll)
    const userId = useAppSelector(state => state.profile.data._id)
    const switchFilterHandler = (value:string)=>()=>dispatch(packsActions.setParams({user_id:value}))

    return (
        <div className={classes.searchBlockContainer}>
            <div className={classes.search}>
                <Typography style={{textAlign: 'start'}}>Search</Typography>
                <Input type="text" onChange={(e)=>dispatch(packsActions.setParams({packName:e.currentTarget.value}))}/>
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
                <RangeSlider/>
            </div>
        </div>
    );
};

export default SearchAndFilterBlock;