import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../features/auth/authSlice";
import {profileReducer} from "../features/profile/profileSlice";
import {appReducer} from "./appSlice";
import {packsReducer} from "../features/packs/packsSlice";


export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        profile: profileReducer,
        packs: packsReducer

    },
});


export type AppRootStateType = ReturnType<typeof store.getState>
export type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


// @ts-ignore
window.store = store;
