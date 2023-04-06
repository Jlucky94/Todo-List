import React, {FC} from 'react';
import {BasicModal} from "common/components/modal/basicModal";
import {Button, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "app/store";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import {deleteCardTC} from "features/cards/cardsSlice";


type Props = {
    cardId: string
    cardName: string
}

export const DeleteCardModal: FC<Props> = ({cardName, cardId}) => {
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(state => state.app.status)

    const deleteCardHandler = () => {
        dispatch(deleteCardTC({id: cardId}))
    }

    return (
        <BasicModal
            title={'Delete Card'}
            label={<DeleteSweepIcon sx={{cursor: 'pointer'}}/>}
            children={
                <>
                    <div>
                        Do you really want to remove card : <Typography fontWeight={"bolder"}>{cardName}</Typography>
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
                            onClick={deleteCardHandler}
                            disabled={isLoading === 'loading'}>
                            Delete
                        </Button></div>
                </>
            }
        />
    );
};

