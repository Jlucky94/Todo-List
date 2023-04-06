import React from 'react';
import {Controller, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "app/store";
import {Navigate, useNavigate} from "react-router-dom";
import {Button, Container, FormGroup, Paper, TextField} from "@mui/material";
import {yupResolver} from "@hookform/resolvers/yup";
import {registrationSchema} from "common/utils/yupResolvers/yupResolvers";
import PasswordInput from "features/auth/login/passwordInput/PasswordInput";
import {registrationTC} from "features/auth/authSlice";
import classes from "features/auth/login/Login.module.css";

export type RegistrationFormData = {
    email: string
    password: string
    passwordConfirmation: string

};

const Registration = () => {
        const isAuth = useAppSelector(state => state.auth.isAuth)
        const isLoading = useAppSelector(state => state.app.status)
        const navigate = useNavigate()
        const dispatch = useAppDispatch()
        const {
            control,
            handleSubmit,
            formState: {errors},
        } = useForm<RegistrationFormData>({resolver: yupResolver(registrationSchema)});
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
                <Container className={classes.formContainer} style={{display: 'flex', flexDirection: 'column'}}>
                    <Paper className={classes.paperContainer} sx={{padding: '40px 33px'}}>
                        <h2>Sign Up</h2>
                        <form onSubmit={onSubmit}>
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
                                    name={'passwordConfirmation'}
                                    render={({field}) => (
                                        <PasswordInput
                                            field={field}
                                            label={'Confirm password'}
                                            errorMessage={errors.passwordConfirmation?.message}
                                        />)
                                    }/>
                                <Button type="submit" variant={'contained'} disabled={isLoading==='loading'}>
                                    Sign Up
                                </Button>
                                <div>
                                    Already have an account?
                                </div>
                                <Button type="button" variant={'contained'} onClick={onClickHandler}>
                                    Sign In
                                </Button>
                            </FormGroup>
                        </form>
                    </Paper>
                </Container>
            </div>
        );
    }
;

export default Registration;