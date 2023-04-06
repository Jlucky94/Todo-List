import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {
    authAPI,
    ForgotResponseType,
    InfoResponseType,
    LoginRequestDataType,
    RegisterResponseType,
    RegistrationRequestDataType,
    SetNewPasswordRequestType,
    UserDataResponseType
} from "api/authAPI";
import {profileActions, profileInitialState, updateProfileDataTC} from "../profile/profileSlice";
import {appActions, AsyncConfigType} from "app/appSlice";
import {errorUtils} from "common/utils/error-utils";

export const initialState = {
    isAuth: false,
    isLoading: false,
    error: null as null | string
}
export type InitialStateType = typeof initialState
// const navigate = useNavigate()
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loggedIn: (state: InitialStateType) => {
            state.isAuth = true
        },
        loggedOut: (state: InitialStateType) => {
            state.isAuth = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
            .addCase(loginTC.fulfilled, (state) => {
                state.isLoading = false
                state.error = null
            })
            .addCase(loginTC.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })

    }
})

export const {reducer: authReducer, actions: authActions} = authSlice

//thunks
export const getAuthUserDataTC = createAsyncThunk<UserDataResponseType, void, AsyncConfigType>
('auth/getAuthUserData',
    async (_, thunkAPI) => {
        try {

            const response = await authAPI.me()
            thunkAPI.dispatch(authActions.loggedIn())
            thunkAPI.dispatch(profileActions.userDataGot(response))
            return response
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.error)
        } finally {
            thunkAPI.dispatch(appActions.initialization({isInit: true}))
        }
    })
export const loginTC = createAsyncThunk<UserDataResponseType & { info: string }, LoginRequestDataType, AsyncConfigType>
('auth/login',
    async (data: LoginRequestDataType, thunkAPI) => {
        try {
            const response = await authAPI.login(data)
            thunkAPI.dispatch(authActions.loggedIn())
            thunkAPI.dispatch(profileActions.userDataGot(response))
            return {...response, info: 'Authorization was successful!'}
        } catch (e) {
            const error = errorUtils(e)
            return thunkAPI.rejectWithValue(error)
        }
    })
export const logoutTC = createAsyncThunk<InfoResponseType, void, AsyncConfigType>
('auth/logout',
    async (_, thunkAPI) => {
        try {
            const response = await authAPI.logout()
            thunkAPI.dispatch(authActions.loggedOut())
            thunkAPI.dispatch(profileActions.userDataGot(profileInitialState.data))
            return ({info: 'Logout done'})
        } catch (e) {
            const error = errorUtils(e)
            return thunkAPI.rejectWithValue(error)
        }
    })
export const registrationTC = createAsyncThunk<RegisterResponseType & { info: string }, RegistrationRequestDataType, AsyncConfigType>
('auth/registration',
    async (data: RegistrationRequestDataType, thunkAPI) => {
        try {
            const response = await authAPI.registration(data)
            return {...response, info: 'You have successfully registered'}
        } catch (e: any) {

            return thunkAPI.rejectWithValue(e.response.data.error)
        }
    })
export const forgotTC = createAsyncThunk<ForgotResponseType, { email: string }, AsyncConfigType>
('auth/forgot',
    async (data: { email: string }, thunkAPI) => {
        try {
            const response = await authAPI.forgot(data.email)
            return {...response, info: 'Further instructions have been successfully sent to your email.'}
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.error)
        }
    })
export const setNewPasswordTC = createAsyncThunk<InfoResponseType, SetNewPasswordRequestType, AsyncConfigType>
('auth/setNewPasswordTC', async (data: SetNewPasswordRequestType, thunkAPI) => {
    try {
        const response = await authAPI.setNewPassword(data)
        return {info: 'Your password has been successfully changed.'}
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e.response.data.error)
    }
})

export const infoFulfilled = isFulfilled(loginTC, logoutTC, registrationTC, forgotTC, setNewPasswordTC)
export const fulfilled = isFulfilled(updateProfileDataTC, getAuthUserDataTC, loginTC, logoutTC, registrationTC, forgotTC, setNewPasswordTC, updateProfileDataTC)
export const rejected = isRejected(updateProfileDataTC, getAuthUserDataTC, loginTC, logoutTC, registrationTC, forgotTC, setNewPasswordTC, updateProfileDataTC)
export const pending = isPending(getAuthUserDataTC, loginTC, logoutTC, setNewPasswordTC, forgotTC, registrationTC, updateProfileDataTC)
