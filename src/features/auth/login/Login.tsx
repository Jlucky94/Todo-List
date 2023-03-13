import React from 'react';
import {useForm} from "react-hook-form";


type LoginFormData = {
    email: string
    password: string
    rememberMe: boolean
};

const Login = () => {
        const {register, handleSubmit, formState: {errors}} = useForm<LoginFormData>();
        const onSubmit = handleSubmit(data => console.log(data));

        return (
            <div>
                <h2>Sign in</h2>
                <form onSubmit={onSubmit}>
                    <label>Email</label>
                    <input {...register("email", {required: "Email is required"})} />
                    <p>{errors.email?.message}</p>
                    <label>Password</label>
                    <input {...register("password", {required: "Password is required"})} />
                    <p>{errors.password?.message}</p>
                    <input type={"checkbox"} {...register("rememberMe")} />
                    <div>
                        <a href="">Forgot Password?</a>
                    </div>
                    <button type="submit">
                        Sign In
                    </button>
                    <div>
                        Already have an account?
                    </div>
                    <button type="button">
                        Sign Up
                    </button>
                </form>
            </div>
        );
    }
;

export default Login;