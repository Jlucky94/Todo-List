import React, {useState} from 'react';
import {BasicModal} from "common/components/modal/basicModal";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {Button} from "@mui/material";
import {useAppDispatch} from "app/store";
import {updateProfileDataTC} from "features/profile/profileSlice";
import FileInput from "common/fileInput/FileInput";

const ChangeAvaModal = () => {

    const dispatch = useAppDispatch()

    const [avatarImg, setAvatarImg] = useState('')

    const saveAvaHandler = () => dispatch(updateProfileDataTC({avatar: avatarImg}))

    return (
        <BasicModal label={<CloudUploadIcon/>} title={"Edit avatar"} type={'icon'}>
            Click to download your avatar photo
            <FileInput img={avatarImg} setImg={setAvatarImg}/>
            <Button disabled={!avatarImg} variant={"contained"} onClick={saveAvaHandler}>Save</Button>
        </BasicModal>
    );
};

export default ChangeAvaModal;