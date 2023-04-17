import {createSlice, isFulfilled, isPending, isRejected, PayloadAction} from "@reduxjs/toolkit";
import {AppRootStateType, ThunkAppDispatchType} from "./store";
import {fulfilled, infoFulfilled, pending, rejected} from "features/auth/authSlice";
import {string} from "yup";

export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const appInitialState = {
    isInit: false,
    error: null as string | null,
    status: 'idle' as AppStatusType,
    infoMessage: null as string | null,

}
export type InitialStateType = typeof appInitialState

const appSlice = createSlice({
    name: 'app',
    initialState: appInitialState,
    reducers: {
        initialization: (state, action: PayloadAction<{ isInit: boolean }>) => {
            state.isInit = action.payload.isInit
        },
        clearInfoMessages: (state) => {
            state.infoMessage = null
            state.error = null
        },
        setInfoMessage: (state, action: PayloadAction<{ info: string }>) => {
            state.infoMessage = action.payload.info
        },
        setError: (state, action: PayloadAction<{ error: string }>) => {
            state.error = action.payload.error
        }
    },
    extraReducers: builder => {
        builder
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


