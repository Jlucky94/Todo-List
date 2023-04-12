import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "app/store";
import styles from "./Profile.module.css"
import {logoutTC} from "features/auth/authSlice";
import {Controller, useForm} from "react-hook-form";
import {updateProfileDataTC} from "./profileSlice";
import {Button, Container, FormGroup, Paper, TextField} from "@mui/material";
import classes from "features/auth/login/Login.module.css";
import {Link} from "react-router-dom";
import Avatar from "features/profile/avatar/Avatar";

type ChangeProfileData = {
    name: string
};

const Profile = () => {
        const dispatch = useAppDispatch()

        const isLoading = useAppSelector(state => state.app.status)
        const userData = useAppSelector(state => state.profile.data)

        const [editMode, setEditMode] = useState<boolean>(false)

        const {control, handleSubmit, formState: {errors}} = useForm<ChangeProfileData>();

        const onSubmit = handleSubmit(data => {
            const promise = dispatch(updateProfileDataTC({name: data.name}))
            promise.then((response) => {
                response.meta.requestStatus === "fulfilled" && setEditMode(false)
            })
        });
        const logoutHandler = () => dispatch(logoutTC())
        const editModeHandler = () => setEditMode(true)

        return (
            <div>
                <Container className={classes.formContainer} style={{display: 'flex', flexDirection: 'column'}}>
                    <Link style={{textAlign: "start"}} to={'/cards/packs'}>~~ARROW ICON~~Go to packs list</Link>
                    <Paper className={classes.paperContainer} sx={{padding: '40px 33px'}}>
                        <form onSubmit={onSubmit}>
                            <h2>Personal Information</h2>
                            <Avatar/>
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
                                        <Button
                                            type={"submit"}
                                            variant={"contained"}
                                            disabled={isLoading === 'loading'}>
                                            Save
                                        </Button>
                                    </>
                                    :
                                    <div>
                                        <h3>{userData.name}</h3>
                                    </div>}
                                <div>
                                    {userData.email}
                                </div>
                                {!editMode &&
                                    <Button variant={"contained"}
                                            onClick={editModeHandler}
                                    >
                                        Edit name
                                    </Button>}
                                <Button
                                    variant={"contained"}
                                    onClick={logoutHandler}
                                    disabled={isLoading === 'loading'}>
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