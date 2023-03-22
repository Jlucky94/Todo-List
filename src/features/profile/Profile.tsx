import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../.././app/store";
import defaultUserAvatar from "../../assets/images/defaultUserAvatar.png"
import styles from "./Profile.module.css"
import {logoutTC} from "../auth/authSlice";
import {Navigate} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import {updateProfileDataTC} from "./profileSlice";
import {Button, Container, FormGroup, Paper, TextField} from "@mui/material";
import classes from "../auth/login/Login.module.css";

type ChangeProfileData = {
    name: string
};

const Profile = () => {
        const {control, handleSubmit, formState: {errors}} = useForm<ChangeProfileData>();
        const dispatch = useAppDispatch()
        const [editMode, setEditMode] = useState<boolean>(false)
        const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
        const userData = useAppSelector(state => state.profile.data)
        const onSubmit = handleSubmit(data => {
            const promise = dispatch(updateProfileDataTC({name: data.name, avatar: ''}))
            promise.then((response) => {
                response.meta.requestStatus === "fulfilled" && setEditMode(false)
            })
        });


        return (
            <div>
                <Container className={classes.formContainer} style={{display: 'flex', flexDirection: 'column'}}>
                    <Paper className={classes.paperContainer} sx={{padding: '40px 33px'}}>
                        <form onSubmit={onSubmit}>
                            <h2>Personal Information</h2>
                            <img className={styles.mainPhoto} src={defaultUserAvatar} alt=""/>
                            <FormGroup sx={{display: 'flex', rowGap: '24px', marginBottom: '20px'}}>
                                {editMode ? <>
                                        <Controller
                                            control={control}
                                            name={'name'}
                                            render={({field}) => (
                                                <TextField
                                                    error={!!errors.name}
                                                    helperText={errors.name?.message}
                                                    variant={'outlined'}
                                                    label={'Your name'}
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(e)}
                                                />)
                                            }/>
                                        <p>{errors.name?.message}</p>
                                        <Button type={"submit"} variant={"contained"}>Save</Button>
                                    </>
                                    : <div>
                                        <h3>{userData.name}</h3>
                                    </div>}
                                <div>
                                    {userData.email}
                                </div>
                                {!editMode &&
                                    <Button variant={"contained"} onClick={() => setEditMode(true)}>Edit name</Button>}
                                <Button variant={"contained"} onClick={() => {
                                    dispatch(logoutTC())
                                }}>
                                    Log Out
                                </Button>
                            </FormGroup>
                        </form>
                    </Paper>
                </Container>
            </div>
        );
    }
;

export default Profile;