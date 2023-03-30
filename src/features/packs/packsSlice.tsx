import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AsyncConfigType} from "../../app/appSlice";
import {errorUtils} from "../../common/utils/error-utils";
import {
    CreatePackRequestType,
    CreatePackResponseType,
    DeletePackResponseType,
    GetPacksResponseType,
    packsAPI,
    PackType,
    PacksQueryParams,
    UpdatePackRequestType,
    UpdatePackResponseType
} from "../../api/packsAPI";


export const packsInitialState = {
    cardPacks: [] as PackType[],
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 100,
    token: '',
    tokenDeathTime: 0,
    params: {
        packName: '',
        min: 0,
        max: 100,
        sortPacks: '',
        page: 0,
        pageCount: 4,
        user_id: '',
        block: false,
    },
}


const packsSlice = createSlice({
    name: 'packs',
    initialState: packsInitialState,
    reducers: {
        setPacks: (state, action: PayloadAction<GetPacksResponseType>) => {
            state.cardPacks = action.payload.cardPacks;
            state.cardPacksTotalCount = action.payload.cardPacksTotalCount
            state.minCardsCount = action.payload.minCardsCount
            state.maxCardsCount = action.payload.maxCardsCount
            state.token = action.payload.token
            state.tokenDeathTime = action.payload.tokenDeathTime
        },
        setParams: (state, action: PayloadAction<Partial<PacksQueryParams>>) => {
            state.params = {...state.params, ...action.payload}
        }
    }
})


export const {reducer: packsReducer, actions: packsActions} = packsSlice


export const getPacksTC = createAsyncThunk<
    GetPacksResponseType,
    void,
    AsyncConfigType
>('/cards/packs/getPacks',
    async (_, thunkAPI) => {
        const queryParams = thunkAPI.getState().packs.params
        try {
            const response = await packsAPI.getPacks(queryParams)
            thunkAPI.dispatch(packsActions.setPacks(response))
            return response
        } catch (e) {
            const error = errorUtils(e)
            return thunkAPI.rejectWithValue(error)
        }
    })
export const createPackTC = createAsyncThunk<
    CreatePackResponseType,
    CreatePackRequestType,
    AsyncConfigType
>('/cards/packs/createPack',
    async (data, thunkAPI) => {
        try {
            const response = await packsAPI.createPack(data)
            thunkAPI.dispatch(getPacksTC())
            return response
        } catch (e) {
            const error = errorUtils(e)
            return thunkAPI.rejectWithValue(error)
        }
    })
export const deletePackTC = createAsyncThunk<
    DeletePackResponseType,
    { id: string },
    AsyncConfigType
>('/cards/packs/deletePack',
    async (data, thunkAPI) => {
        try {
            const response = await packsAPI.deletePack(data.id)
            thunkAPI.dispatch(getPacksTC())
            return response
        } catch (e) {
            const error = errorUtils(e)
            return thunkAPI.rejectWithValue(error)
        }
    })
export const updatePackTC = createAsyncThunk<
    UpdatePackResponseType,
    UpdatePackRequestType,
    AsyncConfigType
>('/cards/packs/updatePack',
    async (data, thunkAPI) => {
        try {
            const response = await packsAPI.updatePack(data)
            thunkAPI.dispatch(getPacksTC())
            return response
        } catch (e) {
            const error = errorUtils(e)
            return thunkAPI.rejectWithValue(error)
        }
    })

