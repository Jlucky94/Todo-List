import React, {useEffect, useState} from 'react';
import {Controller, useForm} from "react-hook-form";
import {useAppDispatch} from "../../../app/store";
import {setNewPasswordTC} from "../authSlice";
import {Link, useNavigate, useParams} from "react-router-dom";
import PasswordInput from "../login/passwordInput/PasswordInput";
import classes from "../login/Login.module.css";
import {Button, Container, FormGroup, Paper, Typography} from "@mui/material";
import {yupResolver} from "@hookform/resolvers/yup";
import {recoveryPassSchema} from "../../../common/utils/yupResolvers/yupResolvers";

export type SetNewPassForm = {
    password: string
    passwordConfirmation: string
};

const SetNewPassword = () => {
        const [newPasswordIsSet, setNewPasswordIsSet] = useState<boolean>(false)
        const params = useParams()
        const navigate = useNavigate()
        const token = params.token as string
        const dispatch = useAppDispatch()
        const {
            control,
            handleSubmit,
            formState: {errors},
        } = useForm<SetNewPassForm>({resolver: yupResolver(recoveryPassSchema)});
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
                        {newPasswordIsSet &&
                            <div>New password has been set, you will be redirected to login page in few seconds</div>}
                    </Paper>
                </Container>
            </div>
        );
    }
;

export default SetNewPassword;