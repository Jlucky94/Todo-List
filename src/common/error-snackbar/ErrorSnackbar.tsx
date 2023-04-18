import React, {forwardRef} from 'react'
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from "app/store";
import Snackbar from '@mui/material/Snackbar'
import {appActions} from "app/appSlice";

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function ErrorSnackbar() {
    const error = useAppSelector(state => state.app.error)
    const infoMessage = useAppSelector(state => state.app.infoMessage)
    const dispatch = useAppDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(appActions.infoMsgCleared())
    }

    return (
        <Snackbar open={!!error || !!infoMessage} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={infoMessage ? 'success' : 'error'}
            >
                {infoMessage || error}
            </Alert>
        </Snackbar>
    )
}
