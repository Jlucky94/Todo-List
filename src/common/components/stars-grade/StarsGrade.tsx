import React, {FC} from 'react';
import {Rating} from "@mui/material";

type Props = {
    grade: number
}

const StarsGrade: FC<Props> = ({grade}) => {


    return (
        <>
            <Rating name="read-only" value={grade} readOnly/>
        </>
    )
};

export default StarsGrade;