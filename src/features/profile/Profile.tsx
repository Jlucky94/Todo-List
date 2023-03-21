import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../.././app/store";
import defaultUserAvatar from "../../assets/images/defaultUserAvatar.png"
import styles from "./Profile.module.css"
import {logoutTC} from "../auth/authSlice";
import {Navigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {updateProfileDataTC} from "./profileSlice";

type ChangeProfileData = {
    name: string
};

const Profile = () => {
        const {register, handleSubmit, formState: {errors}} = useForm<ChangeProfileData>();
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
                <h2>Personal Information</h2>
                <img className={styles.mainPhoto} src={defaultUserAvatar} alt=""/>
                {editMode ? <div>
                        <form onSubmit={onSubmit}>
                            <label>Nickname</label>
                            <input {...register("name", {required: "Please type your name"})} />
                            <p>{errors.name?.message}</p>
                            <button>Save</button>
                        </form>
                    </div>
                    : <div>
                        <h3>{userData.name}</h3>
                        <button onClick={() => setEditMode(true)}>Edit name</button>
                    </div>}
                <div>
                    {userData.email}
                </div>
                <button onClick={() => {
                    dispatch(logoutTC())
                }}>
                    Log Out
                </button>
            </div>
        );
    }
;

export default Profile;