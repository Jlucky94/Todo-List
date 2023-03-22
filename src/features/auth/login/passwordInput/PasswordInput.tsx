import React, {useState} from 'react';
import {TextField} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {FieldValues, Path} from "react-hook-form";
import {ControllerRenderProps} from "react-hook-form/dist/types/controller";


type PasswordInputType<T extends FieldValues,TName extends Path<T>> = {
    field:ControllerRenderProps<T,TName>
    label:string
    errorMessage?:string
}

const PasswordInput = <T extends object,TName extends Path<T> >(props:PasswordInputType<T,TName>) => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const passwordHandler = () => setPasswordVisible(!passwordVisible)


    return (
        <>
            <TextField
                error={!!props.errorMessage}
                helperText={props.errorMessage}
                variant={'outlined'}
                label={props.label}
                type={passwordVisible ? 'text' : 'password'}
                value={props.field.value}
                onChange={(e) => props.field.onChange(e)}
            />
            <RemoveRedEyeIcon color={passwordVisible ? 'primary' : 'inherit'} onClick={passwordHandler}/>
        </>
    );
};

export default PasswordInput;
