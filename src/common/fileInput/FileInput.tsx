import React, {ChangeEvent, useState} from 'react';
import {IconButton} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {ConvertFileToBase64} from "common/convertFileToBase64/ConvertFileToBase64";
import {useAppDispatch} from "app/store";
import {appActions} from "app/appSlice";
import {profileActions, updateProfileDataTC} from "features/profile/profileSlice";
import defaultUserAvatar from "assets/images/defaultUserAvatar.png"

type Props = {
    img:string
    setImg: (img: string) => void
}
const FileInput = ({setImg,img}: Props) => {
    const dispatch = useAppDispatch()


    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < 4000000) {
                ConvertFileToBase64(file, (file64: string) => {
                    setImg(file64)
                })
            } else {
                dispatch(appActions.setError({error: 'Файл слишком большого размера'}))
            }
        }
    };


    return (
        <>
            {img && <img src={img} alt="image" style={{width: 50}}/>}
            <IconButton component="label">
                <CloudUploadIcon/>
                <input type="file"
                       onChange={uploadHandler}
                       style={{display: 'none'}}
                       accept="image/*"
                />
            </IconButton>
        </>
    )
};

export default FileInput;