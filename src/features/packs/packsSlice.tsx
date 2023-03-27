import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AsyncConfigType} from "../../app/appSlice";
import {errorUtils} from "../../common/utils/error-utils";
import {GetPacksResponseType, packsAPI, PackType} from "../../api/packsAPI";


export const packsInitialState = {
    cardPacks: [] as PackType[]
}
export type InitialStateType = typeof packsInitialState


const packsSlice = createSlice({
    name: 'packs',
    initialState: packsInitialState,
    reducers: {
        getPacks: (state, action: PayloadAction<GetPacksResponseType>) => {
            state.cardPacks = action.payload.cardPacks;
        },
    }
})


export const {reducer: packsReducer, actions: packsActions} = packsSlice


export const getPacksTC = createAsyncThunk<
    GetPacksResponseType,
    void,
    AsyncConfigType
>('/packs/getPacks',
    async (_, thunkAPI) => {
        try {
            const response = await packsAPI.getPacks()
            thunkAPI.dispatch(packsActions.getPacks(response))
            return response
        } catch (e) {
            const error = errorUtils(e)
            return thunkAPI.rejectWithValue(error)
        }
    })

