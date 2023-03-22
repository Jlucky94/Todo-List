import React from 'react';
import {Controller, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../.././app/store";
import {loginTC} from "../authSlice";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {LinkWrapper} from "../../../common/components/link/CustomLink";
import {Button, Checkbox, Container, FormControlLabel, FormGroup, Paper, TextField} from "@mui/material";
import classes from './Login.module.css'
import PasswordInput from "./passwordInput/PasswordInput";
import {loginSchema} from "../../../common/utils/yupResolvers/yupResolvers";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoginRequestDataType} from "../../../api/authAPI";



const Login = () => {
        const dispatch = useAppDispatch()
        const navigate = useNavigate()

        const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)


        const {control, handleSubmit, formState: {errors}} = useForm<LoginRequestDataType>({resolver:yupResolver(loginSchema)});
        const onSubmit = handleSubmit((data) => {
            console.log(data)
            dispatch(loginTC(data))
        });
        const onClickHandler = () => navigate('/registration')

        if (isAuth) {
            return <Navigate to={'/profile'}/>
        }

        return (
            <div>
                <Container className={classes.formContainer} style={{display: 'flex', flexDirection: 'column'}}>
                    <Paper className={classes.paperContainer} sx={{padding: '40px 33px'}}>
                        <form onSubmit={onSubmit}>
                            <h2>Sign In</h2>
                            {/*<FormControl sx={{width: '100%'}}>*/}
                            <FormGroup sx={{display: 'flex', rowGap: '24px', marginBottom: '20px'}}>
                                <Controller
                                    control={control}
                                    name={'email'}
                                    render={({field}) => (
                                        <TextField
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                            variant={'outlined'}
                                            label={'Email'}
                                            value={field.value}
                                            onChange={(e) => field.onChange(e)}
                                        />)
                                    }/>
                                <Controller
                                    control={control}
                                    name={'password'}
                                    render={({field}) => (
                                        <PasswordInput
                                            field={field}
                                            label={'Password'}
                                            errorMessage={errors.password?.message}
                                        />)
                                    }/>
                                <Controller
                                    control={control}
                                    name={'rememberMe'}
                                    render={({field}) => (
                                        <FormControlLabel label={'Remember me'}
                                                          control={<Checkbox
                                                              onChange={(e) => field.onChange(e)}/>}/>)
                                    }/>
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
                            {/*</FormControl>*/}
                        </form>
                    </Paper>
                </Container>
            </div>
        );
    }
;

export default Login;