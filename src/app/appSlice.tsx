import {createSlice, isFulfilled, isPending, isRejected, PayloadAction} from "@reduxjs/toolkit";
import {AppRootStateType, ThunkAppDispatchType} from "./store";
import {forgotTC, infoFulfilled, registrationTC, setNewPasswordTC} from "features/auth/authSlice";

export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const appInitialState = {
    isInit: false,
    error: null as string | null,
    status: 'idle' as AppStatusType,
    infoMessage: null as string | null,
    newPassIsSend: false,
    registrationIsDone: false


}
export type InitialStateType = typeof appInitialState

const appSlice = createSlice({
    name: 'app',
    initialState: appInitialState,
    reducers: {
        initIsDone: (state, action: PayloadAction<{ isInit: boolean }>) => {
            state.isInit = action.payload.isInit
        },
        infoMsgCleared: (state) => {
            state.infoMessage = null
            state.error = null
        },
        setError: (state, action: PayloadAction<{ error: string }>) => {
            state.error = action.payload.error
        },
        newPassIsSendReset: (state) => {
            state.newPassIsSend = false
        }
    },
    extraReducers: builder => {
        builder
            .addCase(forgotTC.fulfilled, (state) => {
                state.infoMessage = 'Further instructions have been successfully sent to your email.'
            })
            .addCase(registrationTC.fulfilled, (state) => {
                state.registrationIsDone = true
            })
            .addCase(setNewPasswordTC.fulfilled, (state) => {
                state.newPassIsSend = true
                state.infoMessage = 'New password has been set, you will be redirected to login page in few seconds'
            })
            .addMatcher(isPending, state => {
                state.status = 'loading'
                state.infoMessage = null
                state.error = null
            })
            .addMatcher(isFulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addMatcher(infoFulfilled, (state, action) => {
                state.infoMessage = action.payload.info.toLowerCase()
            })
            .addMatcher(isRejected, (state, action) => {
                state.error = action.payload as string
                state.status = 'failed'
            })

    }
})

export const {reducer: appReducer, actions: appActions} = appSlice

//thunks


export type AsyncConfigType = {
    dispatch: ThunkAppDispatchType,
    rejectWithValue: string,
    state: AppRootStateType
}


