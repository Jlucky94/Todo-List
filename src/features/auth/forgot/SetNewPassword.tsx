import React, {useEffect} from 'react';
import {Controller, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "app/store";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Container, FormGroup, Paper, Typography} from "@mui/material";
import {yupResolver} from "@hookform/resolvers/yup";
import {recoveryPassSchema} from "common/utils/yupResolvers/yupResolvers";
import {appActions} from "app/appSlice";
import {setNewPasswordTC} from "features/auth/authSlice";
import PasswordInput from "features/auth/login/passwordInput/PasswordInput";
import classes from "features/auth/login/Login.module.css";

export type SetNewPassForm = {
    password: string
    passwordConfirmation: string
};

const SetNewPassword = () => {

        const dispatch = useAppDispatch();

        const newPassIsSend = useAppSelector(state => state.app.newPassIsSend)

        const params = useParams()
        const navigate = useNavigate()

        const token = params.token as string

        const {
            control,
            handleSubmit,
            formState: {errors},
        } = useForm<SetNewPassForm>({resolver: yupResolver(recoveryPassSchema)})

        const onSubmit = handleSubmit(data => {
            dispatch(setNewPasswordTC({password: data.password, resetPasswordToken: token}))
        });

        useEffect(() => {
            newPassIsSend && setTimeout(() => {
                navigate('/login')
                dispatch(appActions.newPassIsSendReset())
            }, 5000)
        }, [newPassIsSend])

        return (
            <div>
                <Container className={classes.formContainer} style={{display: 'flex', flexDirection: 'column'}}>
                    <Paper className={classes.paperContainer} sx={{padding: '40px 33px'}}>
                        <h2>Create new password</h2>
                        <form onSubmit={onSubmit}>
                            <FormGroup sx={{display: 'flex', rowGap: '24px', marginBottom: '20px'}}>
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
                                <Typography component={'span'} sx={{opacity: 0.5}}>
                                    Enter your new password
                                </Typography>
                                <Button type="submit" variant={'contained'}>
                                    Set New Password
                                </Button>
                                <div>
                                    Did you remember your password?
                                </div>
                                <Link to={'/login'}>
                                    Try To Sign In
                                </Link>
                            </FormGroup>
                        </form>
                    </Paper>
                </Container>
            </div>
        );
    }
;

export default SetNewPassword;