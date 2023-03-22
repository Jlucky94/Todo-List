import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ThunkAppDispatchType} from "./store";
import {fulfilled, infoFulfilled, pending, rejected} from "../features/auth/authSlice";

export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const appInitialState = {
    isInit: false,
    error: null as string | null,
    status: 'idle' as AppStatusType,
    infoMessage: null as string | null

}
export type InitialStateType = typeof appInitialState

export const appSlice = createSlice({
    name: 'app',
    initialState: appInitialState,
    reducers: {
        initialization: (state, action: PayloadAction<{ isInit: boolean }>) => {
            state.isInit = action.payload.isInit
        },
        clearInfoMessages: (state) => {
            state.infoMessage = null
            state.error = null
        }
    },
    extraReducers: builder => {
        builder
            .addMatcher(pending, state => {
                state.status = 'loading'
                state.infoMessage = null
                state.error = null
            })
            .addMatcher(fulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addMatcher(infoFulfilled, (state, action) => {
                state.infoMessage = action.payload.info.toLowerCase()
            })
            .addMatcher(rejected, (state, action) => {
                state.error = action.payload as string
                state.status = 'failed'
            })
    }
})

export const {reducer: appReducer, actions: appActions} = appSlice

//thunks


export type AsyncConfigType = {
    dispatch: ThunkAppDispatchType,
    rejectWithValue: string
}


