import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../../api/authAPI";
import {profileInitialState, userDataGot} from "../Profile/profileSlice";


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
                console.log('action:', action.payload)
            })
            // .addCase(registrationTC.fulfilled,(state)=>{
            //     navigate('/login')
            // })
    }
})

export default authSlice.reducer
export const {loggedIn,loggedOut} = authSlice.actions

//thunks
export const getAuthUserDataTC = createAsyncThunk('auth/getAuthUserData',
    async (_, thunkAPI) => {
        try {
            const response = await authAPI.me()
            thunkAPI.dispatch(loggedIn())
            thunkAPI.dispatch(userDataGot(response))
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.error)
        }
    })
export const loginTC = createAsyncThunk('auth/login',
    async (data: { email: string, password: string, rememberMe: boolean }, thunkAPI) => {
        try {
            const response = await authAPI.login(data)
            thunkAPI.dispatch(loggedIn())
            thunkAPI.dispatch(userDataGot(response))
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.error)
        }
    })
export const logoutTC = createAsyncThunk('auth/logout',
    async (_, thunkAPI) => {
        try {
            const response = await authAPI.logout()
            thunkAPI.dispatch(loggedOut())
            thunkAPI.dispatch(userDataGot(profileInitialState.data))
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.error)
        }
    })
export const registrationTC = createAsyncThunk('auth/registration',
    async (data: { email: string, password: string }, thunkAPI) => {
        try {
            const response = await authAPI.registration(data)
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.error)
        }
    })
export const forgotTC = createAsyncThunk('auth/forgot',
    async (email:string, thunkAPI) => {
        try {
            const response = await authAPI.forgot(email)
            return response
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.error)
        }
    })
export const setNewPasswordTC = createAsyncThunk('auth/setNewPasswordTC',
    async (data: {password: string, resetPasswordToken: string }, thunkAPI) => {
        try {
            const response = await authAPI.setNewPassword(data)
            return response
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.error)
        }
    })

