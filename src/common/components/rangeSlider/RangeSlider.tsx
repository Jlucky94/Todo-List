import React, {useEffect, useState} from 'react';
import {Box, Slider} from "@mui/material";
import {useAppDispatch} from "../../../app/store";
import {packsActions} from "../../../features/packs/packsSlice";
import {useDebounce} from "use-debounce";

type SliderPropsType = {
    min: number
    max: number
}
const RangeSlider = (props: SliderPropsType) => {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState([props.min, props.max])
    const debouncedValue = useDebounce(value, 500)
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    }
    useEffect(() => {
        console.log(debouncedValue[0])
        dispatch(packsActions.setParams({min: value[0], max: value[1]}))
    }, [...debouncedValue[0]])

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