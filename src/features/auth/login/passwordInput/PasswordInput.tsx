import React, {useState} from 'react';
import {TextField} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {UseFormRegister,FieldValues} from "react-hook-form";
import {LoginFormData} from "../Login";
import {RegistrationFormData} from "../../registration/Registration";

export type FormPropsType = {
    email: string
    password: string
    rememberMe?: boolean
    passwordConfirmation?: string
};

type PasswordInputType<T extends FieldValues> = {
    register: UseFormRegister<T>
    errorMessage?:string

}

const PasswordInput = <T extends object>(props:PasswordInputType<T>) => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const passwordHandler = () => setPasswordVisible(!passwordVisible)


    return (
        <>
            <TextField variant={'standard'} {...props.register("password")} label={'Password'}
                       type={passwordVisible ? 'text' : 'password'}/>
            <RemoveRedEyeIcon color={passwordVisible ? 'primary' : 'inherit'} onClick={passwordHandler}/>
            <p>{props.errorMessage}</p>
        </>
    );
};

export default PasswordInput;