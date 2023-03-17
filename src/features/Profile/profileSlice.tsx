import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI, UserDataResponseType} from "../../api/authAPI";
import {AxiosError} from "axios";


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
            state.data.avatar=action.payload.avatar
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getUserDataTC.pending, (state) => {
            // state.isLoading = true
            // state.error = null
        })
            .addCase(getUserDataTC.fulfilled, (state) => {
                // state.isLoading = false
                // state.error = null
            })
            .addCase(getUserDataTC.rejected, (state, action) => {
                // state.isLoading = false
                // state.error = action.payload as string
                console.log('action:', action.payload)
            })
    }
})

export default profileSlice.reducer
export const {userDataGot,profileUpdated} = profileSlice.actions

//thunks

export const getUserDataTC = createAsyncThunk('profile/setUserData',
    async (data: { email: string, password: string, rememberMe: boolean }, thunkAPI) => {
        try {
            const response = await authAPI.login(data)
            thunkAPI.dispatch(userDataGot(response))
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.error)
        }
    })
export const updateProfileDataTC = createAsyncThunk('/profile/updateProfileData',
    async (data: { name: string, avatar: string }, thunkAPI) => {
        try {
            const response = await authAPI.updateProfile(data)
            thunkAPI.dispatch(profileUpdated(data))
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.error)
        }
    })

