import React, {useEffect, useState} from 'react';
import {Box, Slider} from "@mui/material";
import {useAppDispatch, useAppSelector} from "app/store";
import {packsActions} from "features/packs/packsSlice";
import {useDebounce} from "use-debounce";

type SliderPropsType = {
    min: number
    max: number
}
const RangeSlider = (props: SliderPropsType) => {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState([props.min, props.max])
    const debouncedValue = useDebounce(value, 500)
    const min = useAppSelector(state => state.packs.params.min)
    const max = useAppSelector(state => state.packs.params.max)
    const handleChange = (event: React.SyntheticEvent | Event, newValue: number | Array<number>) => {
        setValue(newValue as number[]);
    }
    useEffect(() => {
        dispatch(packsActions.setParams({min: value[0], max: value[1], page: 0}))
    }, [debouncedValue[0][0],debouncedValue[0][1]])
    useEffect(() => {
        setValue([min, max])
    }, [min, max])
    return (
        <div>
            <Box sx={{width: 300}}>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                    min={props.min}
                    max={props.max}
                />
            </Box>
        </div>
    );
};

export default RangeSlider;