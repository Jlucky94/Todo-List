import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useAppDispatch} from "../../.././app/store";
import {forgotTC, registrationTC} from "../authSlice";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {Button, Container, FormControl, FormGroup, Paper, TextField, Typography} from "@mui/material";
import classes from "../login/Login.module.css";

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
            const response = dispatch(forgotTC({email: data.email}))
            response.then(response => {
                response.meta.requestStatus === "fulfilled" && setEmailIsSent(true)
            })
        });


        return (
            <div>
                <Container className={classes.formContainer} style={{display: 'flex', flexDirection: 'column'}}>
                    <Paper className={classes.paperContainer} sx={{padding: '40px 33px'}}>
                        <form onSubmit={onSubmit}>
                            <h2>Forgot your password?</h2>
                            {/*<label>Email</label>*/}
                            {/*<input {...register("email", {required: "Enter your email"})} />*/}
                            <FormControl sx={{width: '100%'}}>
                                <FormGroup sx={{display: 'flex', rowGap: '24px', marginBottom: '20px'}}>
                                    <TextField variant={'standard'} {...register("email")} required={true} label={'Email'}
                                               type={'email'}/>
                                    <Typography component={'span'} sx={{opacity: 0.5}}>
                                        Enter your email address and we will send you further instructions
                                    </Typography>
                                    <Button type="submit" variant={'contained'}>
                                        Send Instructions
                                    </Button>
                                    <div>
                                        Did you remember your password?
                                    </div>
                                    <Link to={'/login'}>
                                        Try To Sign In
                                    </Link>
                                </FormGroup>
                            </FormControl>
                        </form>
                        {emailIsSent &&
                            <div>
                                Further instructions have been successfully sent to your email.
                            </div>}
                    </Paper>
                </Container>
            </div>
        );
    }
;

export default Forgot;