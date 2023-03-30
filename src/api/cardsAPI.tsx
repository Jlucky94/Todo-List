import axios, {AxiosResponse} from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:7542/2.0/cards/card/'
})

export const cardsAPI = {
    getCards: (params?: Partial<CardsQueryParams>) => {
        return instance.get<GetCardsResponseType>(``, {
            params: {
                ...params
            }
        }).then(response => {
            return response.data
        })
    },
    createCard: (data: CreateCardRequestType) => {
        return instance.post<CreateCardRequestType, AxiosResponse<CreateCardResponseType>>(``, data).then(response => {
            return response.data
        })
    },
    deleteCard: (id: string) => {
        return instance.delete<DeleteCardResponseType>(`?id=${id}`).then(response => {
            return response.data
        })
    },
    updateCard: (data:UpdateCardRequestType ) => {
        return instance.put<UpdateCardRequestType, AxiosResponse<UpdateCardResponseType>>(``, data).then(response => {
            return response.data
        })
    },
}

export type CardsQueryParams = {
    cardsPack_id: string
    min: number
    max: number
    sortCards: string
    page: number
    pageCount: number
    cardAnswer:string
    cardQuestion:string
}
export type GetCardsResponseType = {
	cards: CardType[];
	packUserId: string;
	packName: string;
	packPrivate: boolean;
	packDeckCover: string;
	packCreated: string;
	packUpdated: string;
	page: number;
	pageCount: number;
	cardsTotalCount: number;
	minGrade: number;
	maxGrade: number;
	token: string;
	tokenDeathTime: number;
}
export type CardType = {
	_id: string;
	cardsPack_id: string;
	user_id: string;
	answer: string;
	question: string;
	grade: number;
	shots: number;
	questionImg: string;
	answerImg: string;
	answerVideo: string;
	questionVideo: string;
	comments: string;
	type: string;
	rating: number;
	more_id: string;
	created: string;
	updated: string;
	__v: number;
}
export type CreateCardRequestType = {
	card: CreateCardRequestCardType;
}
export type CreateCardRequestCardType = {
	cardsPack_id: string;
	question: string;
	answer: string;
	grade: string;
	shots: string;
	answerImg: string;
	questionImg: string;
	questionVideo: string;
	answerVideo: string;
}
export type CreateCardResponseType = {
	newCard: CardType;
	token: string;
	tokenDeathTime: number;
}
export type DeleteCardResponseType = {
	deletedCard: CardType;
	token: string;
	tokenDeathTime: number;
}
export type UpdateCardRequestType = {
	card: UpdateCardRequestTypeCard;
}
export type UpdateCardRequestTypeCard = {
	_id: string;
	question: string;
	answer: string;
	grade: string;
	shots: string;
	answerImg: string;
	questionImg: string;
	questionVideo: string;
	answerVideo: string;
}
export type UpdateCardResponseType = {
	updatedCard: CardType;
	token: string;
	tokenDeathTime: number;
}


