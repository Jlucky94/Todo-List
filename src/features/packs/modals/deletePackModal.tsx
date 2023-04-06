import React, {FC} from 'react';
import {BasicModal} from "common/components/modal/basicModal";
import {Button, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "app/store";
import {deletePackTC} from "features/packs/packsSlice";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";


type Props = {
    packId: string
    packName: string
}

export const DeletePackModal: FC<Props> = ({packId, packName}) => {
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(state => state.app.status)

    const deletePackHandler = () => {
        dispatch(deletePackTC({id: packId}))
    }

    return (
        <BasicModal
            title={'Delete Pack'}
            type={'icon'}
            label={<DeleteSweepIcon/>}
            children={
                <>
                    <div>
                        Do you really want to remove pack : <Typography fontWeight={"bolder"}>{packName}</Typography>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Button
                            style={{width: 100, alignSelf: "end"}}
                            variant={'contained'}
                            disabled={isLoading === 'loading'}>
                            Cancel
                        </Button>
                        <Button
                            style={{width: 100, alignSelf: "end", backgroundColor: "red"}}
                            variant={'contained'}
                            onClick={deletePackHandler}
                            disabled={isLoading === 'loading'}>
                            Delete
                        </Button></div>
                </>
            }
        />
    );
};

