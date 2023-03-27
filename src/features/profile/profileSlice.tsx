import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, UpdateProfileRequestType, UpdateProfileResponseType, UserDataResponseType} from "../../api/authAPI";
import {AsyncConfigType} from "../../app/appSlice";
import {errorUtils} from "../../common/utils/error-utils";


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
        userDataGot: (state: InitialStateType, action: PayloadAction<UserDataResponseType>) => {
            state.data = action.payload
        },
        profileUpdated: (state: InitialStateType, action: PayloadAction<{ name: string, avatar: string }>) => {
            state.data.name = action.payload.name
            state.data.avatar = action.payload.avatar
        }
    },

})

export const {reducer: profileReducer, actions: profileActions} = profileSlice

//thunks
//
// export const getUserDataTC = createAsyncThunk('profile/setUserData',
//     async (data: { email: string, password: string, rememberMe: boolean }, thunkAPI) => {
//         try {
//             const response = await authAPI.login(data)
//             thunkAPI.dispatch(userDataGot(response))
//         } catch (e: any) {
//             return thunkAPI.rejectWithValue(e.response.data.error)
//         }
//     })
export const updateProfileDataTC = createAsyncThunk<
    UpdateProfileResponseType,
    UpdateProfileRequestType,
    AsyncConfigType
>('/profile/updateProfileData',
    async (data: UpdateProfileRequestType, thunkAPI) => {
        try {
            const response = await authAPI.updateProfile(data)
            thunkAPI.dispatch(profileActions.profileUpdated(data))
            return response
        } catch (e) {
            const error = errorUtils(e)
            return thunkAPI.rejectWithValue(error)
        }
    })

