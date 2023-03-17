import React from 'react';
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../../App/store";
import {registrationTC} from "../authSlice";
import {Navigate, useNavigate} from "react-router-dom";

export type RegistrationFormData = {
    email: string
    password: string
    passwordConfirmation: string
};

const Registration = () => {
        const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
        const navigate = useNavigate()
        const dispatch = useAppDispatch()
        const {register, handleSubmit, formState: {errors}, watch} = useForm<RegistrationFormData>();
        const onSubmit = handleSubmit(data => {
            const response = dispatch(registrationTC({email: data.email, password: data.password}))
            response.then(response => {
                response.meta.requestStatus === "fulfilled" && navigate('/login')
            })

        });
        const onClickHandler = () => navigate('/login')

        if (isAuth) {
            return <Navigate to={'/profile'}/>
        }
        return (
            <div>
                <h2>Sign Up</h2>
                <form onSubmit={onSubmit}>
                    <label>Email</label>
                    <input {...register("email", {required: "Email is required"})} />
                    <p>{errors.email?.message}</p>
                    <label>Password</label>
                    <input {...register("password", {required: "Password is required"})} />
                    <p>{errors.password?.message}</p>
                    <label>Confirm password</label>
                    <input {...register("passwordConfirmation", {
                        required: "Confirm your password",
                        validate: (value: string) => {
                            if (watch('password') != value) {
                                return "Your passwords do no match";
                            }
                        }
                    })} />
                    <p>{errors.passwordConfirmation?.message}</p>
                    <button type="submit">
                        Sign Up
                    </button>
                    <div>
                        Already have an account?
                    </div>
                    <button type="button" onClick={onClickHandler}>
                        Sign In
                    </button>
                </form>

            </div>
        );
    }
;

export default Registration;