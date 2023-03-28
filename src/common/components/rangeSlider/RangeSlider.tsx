import React, {useState} from 'react';
import {Box, Slider} from "@mui/material";
import {useAppDispatch} from "../../../app/store";
import {packsActions} from "../../../features/packs/packsSlice";

const RangeSlider = () => {
    const dispatch = useAppDispatch()
    const [value,setValue] = useState([0,50])
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        dispatch(packsActions.setParams({min:value[0],max:value[1]}))
    };

    return (
        <div>
            <Box sx={{width: 300}}>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                    min={0}//props.min
                    max={100}//props.max
                />
            </Box>
        </div>
    );
};

export default RangeSlider;