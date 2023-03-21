import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../.././app/store";
import {loginTC} from "../authSlice";
import {Link, Navigate, NavLink, useNavigate} from "react-router-dom";
import {LinkWrapper} from "../../../common/components/link/CustomLink";
import {Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, Paper, TextField} from "@mui/material";
import classes from './Login.module.css'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PasswordInput, {FormPropsType} from "./passwordInput/PasswordInput";

export type LoginFormData = {
    email: string
    password: string
    rememberMe: boolean
};

const Login = () => {
        const dispatch = useAppDispatch()
        const navigate = useNavigate()

        const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)


        const {register, handleSubmit, formState: {errors}} = useForm<LoginFormData>();
        const onSubmit = handleSubmit((data) => {
            dispatch(loginTC(data))
        });
        const onClickHandler = () => navigate('/registration')

        if (isAuth) {
            return <Navigate to={'/profile'}/>
        }

        return (
            <div>
                <Container className={classes.formContainer} style={{display: 'flex', flexDirection:'column'}}>
                    <Paper className={classes.paperContainer} sx={{padding: '40px 33px'}}>
                        <form  onSubmit={onSubmit}>
                            <h2>Sign In</h2>
                            <FormControl sx={{width: '100%'}}>
                                <FormGroup sx={{display: 'flex', rowGap: '24px', marginBottom: '20px'}}>
                                    <TextField variant={'standard'} {...register("email")} required={true} label={'Email'}
                                               type={'email'}/>
                                    {/*<input {...register("email", {required: "Email is required"})} />*/}
                                    <p>{errors.email?.message}</p>
                                    <PasswordInput register={register} errorMessage={errors.password?.message}/>
                                    {/*<input type={'password'}{...register("password", {required: "Password is required"})} />*/}

                                    {/*<label>Remember me</label>*/}
                                    <FormControlLabel label={'Remember me'}
                                                      control={<Checkbox  {...register('rememberMe')}/>}/>

                                    {/*<input type={"checkbox"} {...register("rememberMe")} />*/}
                                <Button type="submit" variant={'contained'}>
                                    Sign In
                                </Button>
                                <div>
                                    Don't have an account?
                                </div>
                                <Button type="button" variant={'contained'} onClick={onClickHandler}>
                                    Sign Up
                                </Button>
                                <div>
                                    <LinkWrapper justifySelf='flex-end' colorText='#000'>
                                        <Link to={'/forgot'}>Forgot Password?</Link>
                                    </LinkWrapper>
                                </div>
                                </FormGroup>
                            </FormControl>
                        </form>
                    </Paper>
                </Container>
            </div>
        );
    }
;

export default Login;