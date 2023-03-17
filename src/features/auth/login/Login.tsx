import React from 'react';
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../../App/store";
import {loginTC} from "../authSlice";
import {Navigate, NavLink, useNavigate} from "react-router-dom";


type LoginFormData = {
    email: string
    password: string
    rememberMe: boolean
};

const Login = () => {
        const dispatch = useAppDispatch()
        const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
        const error = useAppSelector<null | string>(state => state.auth.error)
        const {register, handleSubmit, formState: {errors}} = useForm<LoginFormData>();
        const onSubmit = handleSubmit(data => {
            dispatch(loginTC(data))
        });
        const navigate = useNavigate()
        const onClickHandler = () => navigate('/registration')
        if (isAuth) {
            return <Navigate to={'/profile'}/>
        }
        return (
            <div>
                <h2>Sign In</h2>
                <form onSubmit={onSubmit}>
                    <label>Email</label>
                    <input {...register("email", {required: "Email is required"})} />
                    <p>{errors.email?.message}</p>
                    <label>Password</label>
                    <input type={'password'}{...register("password", {required: "Password is required"})} />
                    <p>{errors.password?.message}</p>
                    <label>Remember me</label>
                    <input type={"checkbox"} {...register("rememberMe")} />
                    {error && <div>{error}</div>}
                    <button type="submit">
                        Sign In
                    </button>
                    <div>
                        Don't have an account?
                    </div>
                    <button type="button" onClick={onClickHandler}>
                        Sign Up
                    </button>
                    <div>
                        <NavLink to={'/forgot'}>Forgot Password?</NavLink>
                    </div>
                </form>
            </div>
        );
    }
;

export default Login;