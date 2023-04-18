import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AsyncConfigType} from "app/appSlice";
import {errorUtils} from "common/utils/error-utils";
import {
    cardsAPI,
    CardsQueryParams,
    CardType,
    CreateCardRequestType,
    CreateCardResponseType,
    DeleteCardResponseType,
    GetCardsResponseType,
    RateCardRequestType,
    RateCardResponseType,
    UpdateCardRequestType,
    UpdateCardResponseType
} from "api/cardsAPI";


export const cardsInitialState = {
    cards: [] as CardType[],
    packUserId: '',
    packName: '',
    packPrivate: false,
    packDeckCover: '',
    packCreated: '',
    packUpdated: '',
    cardsTotalCount: 0,
    token: '',
    tokenDeathTime: 0,
    params: {
        cardsPack_id: '',
        min: 0,
        max: 5,
        sortCards: '',
        page: 0,
        pageCount: 4,
        cardAnswer: '',
        cardQuestion: ''
    },
}


const cardsSlice = createSlice({
    name: 'cards',
    initialState: cardsInitialState,
    reducers: {
        setCards: (state, action: PayloadAction<GetCardsResponseType>) => {
            state.cards = action.payload.cards;
            state.packUserId = action.payload.packUserId
            state.cardsTotalCount = action.payload.cardsTotalCount
            state.packName = action.payload.packName
            state.packPrivate = action.payload.packPrivate
            state.packCreated = action.payload.packCreated
            state.packUpdated = action.payload.packUpdated
            state.packUpdated = action.payload.packUpdated
            state.token = action.payload.token
            state.tokenDeathTime = action.payload.tokenDeathTime

        },
        setParams: (state, action: PayloadAction<Partial<CardsQueryParams>>) => {
            state.params = {...state.params, ...action.payload}
        }
    }
})

export const {reducer: cardsReducer, actions: cardsActions} = cardsSlice

export const getCardsTC = createAsyncThunk<
    GetCardsResponseType,
    void,
    AsyncConfigType
>('/cards/card/getCards',
    async (_, thunkAPI) => {
        const queryParams = thunkAPI.getState().cards.params
        try {
            const response = await cardsAPI.getCards(queryParams)
            thunkAPI.dispatch(cardsActions.setCards(response))
            return response
        } catch (e) {
            const error = errorUtils(e)
            return thunkAPI.rejectWithValue(error)
        }
    })
export const createCardTC = createAsyncThunk<
    CreateCardResponseType,
    CreateCardRequestType,
    AsyncConfigType
>('/cards/card/createCard',
    async (data, thunkAPI) => {
        try {
            const response = await cardsAPI.createCard(data)
            thunkAPI.dispatch(getCardsTC())
            return response
        } catch (e) {
            const error = errorUtils(e)
            return thunkAPI.rejectWithValue(error)
        }
    })
export const deleteCardTC = createAsyncThunk<
    DeleteCardResponseType,
    { id: string },
    AsyncConfigType
>('/cards/card/deleteCard',
    async (data, thunkAPI) => {
        try {
            const response = await cardsAPI.deleteCard(data.id)
            thunkAPI.dispatch(getCardsTC())
            return response
        } catch (e) {
            const error = errorUtils(e)
            return thunkAPI.rejectWithValue(error)
        }
    })
export const updateCardTC = createAsyncThunk<
    UpdateCardResponseType,
    UpdateCardRequestType,
    AsyncConfigType
>('/cards/card/updateCard',
    async (data, thunkAPI) => {
        try {
            const response = await cardsAPI.updateCard(data)
            thunkAPI.dispatch(getCardsTC())
            return response
        } catch (e) {
            const error = errorUtils(e)
            return thunkAPI.rejectWithValue(error)
        }
    })
export const rateCardTC = createAsyncThunk<
    RateCardResponseType,
    RateCardRequestType,
    AsyncConfigType
>('/cards/grade/rateCard',
    async (data, thunkAPI) => {
        try {
            const response = await cardsAPI.rateCard(data)
            thunkAPI.dispatch(getCardsTC())
            return response
        } catch (e) {
            const error = errorUtils(e)
            return thunkAPI.rejectWithValue(error)
        }
    })


