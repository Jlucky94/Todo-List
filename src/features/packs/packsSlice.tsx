import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AsyncConfigType} from "../../app/appSlice";
import {errorUtils} from "../../common/utils/error-utils";
import {
    CreatePackRequestType,
    CreatePackResponseType, DeletePackResponseType,
    GetPacksResponseType,
    packsAPI,
    PackType,
    QueryParams, UpdatePackRequestType, UpdatePackResponseType
} from "../../api/packsAPI";


export const packsInitialState = {
    data: {
        cardPacks: [] as PackType[],
        page: 0,
        pageCount: 4,
        cardPacksTotalCount: 0,
        minCardsCount: 0,
        maxCardsCount: 50,
        token: '',
        tokenDeathTime: 0,
    },
    params: {
        packName: '',
        min: 0,
        max: 0,
        sortPacks: '',
        page: 0,
        pageCount: 4,
        user_id: '',
        block: false,
    }
}


const packsSlice = createSlice({
    name: 'packs',
    initialState: packsInitialState,
    reducers: {
        getPacks: (state, action: PayloadAction<GetPacksResponseType>) => {
            state.data = action.payload;
        },
        createPack: (state, action: PayloadAction<CreatePackResponseType>) => {
            state.data.cardPacks.push(action.payload.newCardsPack);
        },
        setParams: (state, action: PayloadAction<Partial<QueryParams>>) => {
            state.params = {...state.params, ...action.payload}
        },
        deletePack: (state, action: PayloadAction<{ packId: string }>) => {
            state.data.cardPacks.filter(pack => pack._id !== action.payload.packId)
        },
        updatePack: (state, action: PayloadAction<PackType>) => {
            state.data.cardPacks.map(pack=>pack._id===action.payload._id?pack:action.payload);
        },
    }
})


export const {reducer: packsReducer, actions: packsActions} = packsSlice


export const getPacksTC = createAsyncThunk<
    GetPacksResponseType,
    Partial<QueryParams>,
    AsyncConfigType
>('/cards/packs/getPacks',
    async (params, thunkAPI) => {
        try {
            const response = await packsAPI.getPacks(params)
            thunkAPI.dispatch(packsActions.getPacks(response))
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
>('/cards/packs/getPacks',
    async (data, thunkAPI) => {
        try {
            const response = await packsAPI.createPack(data)
            thunkAPI.dispatch(packsActions.createPack(response))
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
>('/cards/packs/getPacks',
    async (data, thunkAPI) => {
        try {
            const response = await packsAPI.deletePack(data.id)
            thunkAPI.dispatch(packsActions.deletePack({packId: response.deletedCardsPack._id}))
            thunkAPI.dispatch(getPacksTC({}))
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
>('/cards/packs/getPacks',
    async (data, thunkAPI) => {
        try {
            const response = await packsAPI.updatePack(data)
            thunkAPI.dispatch(packsActions.updatePack(response.updatedCardsPack))
            thunkAPI.dispatch(getPacksTC({}))
            return response
        } catch (e) {
            const error = errorUtils(e)
            return thunkAPI.rejectWithValue(error)
        }
    })

