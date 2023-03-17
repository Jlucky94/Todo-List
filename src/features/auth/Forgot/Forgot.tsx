import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useAppDispatch} from "../../../App/store";
import {forgotTC, registrationTC} from "../authSlice";
import {NavLink, useNavigate} from "react-router-dom";

export type ForgotFormData = {
    email: string
    password: string
    passwordConfirmation: string
};

const Forgot = () => {
        const navigate = useNavigate()
        const dispatch = useAppDispatch()
        const [emailIsSent, setEmailIsSent] = useState<boolean>(false)
        const {register, handleSubmit, formState: {errors}, watch} = useForm<ForgotFormData>();
        const onSubmit = handleSubmit(data => {
            const response = dispatch(forgotTC(data.email))
            response.then(response => {
                response.meta.requestStatus === "fulfilled" &&setEmailIsSent(true)
            })
        });


        return (
            <div>
                <h2>Forgot your password?</h2>
                <form onSubmit={onSubmit}>
                    <label>Email</label>
                    <input {...register("email", {required: "Enter your email"})} />
                    <div>
                        Enter your email address and we will send you further instructions
                    </div>
                    <button type="submit">
                        Send Instructions
                    </button>
                    <div>
                        Did you remember your password?
                    </div>
                    <NavLink to={'/login'}>
                        Try To Sign In
                    </NavLink>
                </form>
                {emailIsSent&&
                    <div>
                        Further instructions have been successfully sent to your email.
                </div>}
            </div>
        );
    }
;

export default Forgot;