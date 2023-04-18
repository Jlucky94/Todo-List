import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, UpdateProfileRequestType, UpdateProfileResponseType, UserDataResponseType} from "api/authAPI";
import {AsyncConfigType} from "app/appSlice";
import {errorUtils} from "common/utils/error-utils";


export const profileInitialState = {
    data: {
        _id: '',
        email: '',
        rememberMe: false,
        isAdmin: false,
        name: '',
        verified: false,
        publicCardPacksCount: 0,
        created: '',
        updated: '',
        __v: 0,
        token: '',
        tokenDeathTime: 0,
        avatar: '',

    },
}
export type InitialStateType = typeof profileInitialState


export const profileSlice = createSlice({
    name: 'profile',
    initialState: profileInitialState,
    reducers: {
        userDataSet: (state: InitialStateType, action: PayloadAction<UserDataResponseType>) => {
            state.data = action.payload
        },
        profileUpdated: (state: InitialStateType, action: PayloadAction<{ name: string, avatar: string }>) => {
            state.data.name = action.payload.name
            state.data.avatar = action.payload.avatar
        }
    },
})

export const {reducer: profileReducer, actions: profileActions} = profileSlice

export const updateProfileDataTC = createAsyncThunk<
    UpdateProfileResponseType,
    Partial<UpdateProfileRequestType>,
    AsyncConfigType>
('/profile/updateProfileData',
    async (data: Partial<UpdateProfileRequestType>, thunkAPI) => {
        const ava = thunkAPI.getState().profile.data.avatar
        const name = thunkAPI.getState().profile.data.name
        try {
            const response = await authAPI.updateProfile({name: data.name || name, avatar: data.avatar || ava})
            console.log(response)
            thunkAPI.dispatch(profileActions.profileUpdated({
                name: response.updatedUser.name,
                avatar: response.updatedUser.avatar
            }))
            return response
        } catch (e: any) {
            const error = errorUtils(e)
            return thunkAPI.rejectWithValue(e.response.statusText)
        }
    })

