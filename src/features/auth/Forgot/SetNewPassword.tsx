import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useAppDispatch} from "../../../App/store";
import {registrationTC, setNewPasswordTC} from "../authSlice";
import {Navigate, NavLink, useNavigate, useParams} from "react-router-dom";
import {clearInterval} from "timers";
import {log} from "util";

export type SetNewPassForm = {
    password: string
};

const SetNewPassword = () => {
        const [newPasswordIsSet, setNewPasswordIsSet] = useState<boolean>(false)
        const params = useParams()
        const navigate = useNavigate()
        const token = params.token as string
        const dispatch = useAppDispatch()
        const {register, handleSubmit, formState: {errors}, watch} = useForm<SetNewPassForm>();
        const onSubmit = handleSubmit(data => {
            const response = dispatch(setNewPasswordTC({password: data.password, resetPasswordToken: token}))
            response.then(response => {
                response.meta.requestStatus === "fulfilled" && setNewPasswordIsSet(true)
            })
        });

        useEffect(() => {
            newPasswordIsSet && setTimeout(() => {
                navigate('/login')
            }, 5000)
        }, [newPasswordIsSet])
        return (
            <div>
                <h2>Create new password</h2>
                <form onSubmit={onSubmit}>
                    <label>Password</label>
                    <input {...register("password", {required: "Enter your email"})} />
                    <div>
                        Create new password and we will send you further instructions to email
                    </div>
                    <button type="submit">
                        Set New Password
                    </button>
                </form>
                {newPasswordIsSet &&
                    <div>New password has been set, you will be redirected to login page in few seconds</div>}
            </div>
        );
    }
;

export default SetNewPassword;