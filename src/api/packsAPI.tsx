import axios, {AxiosResponse} from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:7542/2.0/cards/pack/'
})

export const packsAPI = {
    getPacks: (params?: Partial<PacksQueryParams>) => {
        return instance.get<GetPacksResponseType>(``, {
            params: {
                ...params
            }
        }).then(response => {
            return response.data
        })
    },
    createPack: (data: CreatePackRequestType) => {
        return instance.post<CreatePackRequestType, AxiosResponse<CreatePackResponseType>>(``, data).then(response => {
            return response.data
        })
    },
    deletePack: (id: string) => {
        return instance.delete<DeletePackResponseType>(`?id=${id}`).then(response => {
            return response.data
        })
    },
    updatePack: (data: UpdatePackRequestType) => {
        return instance.put<UpdatePackRequestType, AxiosResponse<UpdatePackResponseType>>(``, data).then(response => {
            return response.data
        })
    },
}

export type PacksQueryParams = {
    packName: string
    min: number
    max: number
    sortPacks: string
    page: number
    pageCount: number
    user_id: string
    block: boolean
}
export type CreatePackRequestType = {
    cardsPack: {
        name: string;
        deckCover: string;
        private: boolean;
    };
}
export type CreatePackResponseType = {
    newCardsPack: PackType;
    token: string;
    tokenDeathTime: number;
}
export type DeletePackResponseType = {
    deletedCardsPack: PackType;
    token: string;
    tokenDeathTime: number;
}
export type UpdatePackRequestType = {
    cardsPack: {
        _id: string;
        name: string;
        private: boolean;
        grade: number;
    };
}

export type UpdatePackResponseType = {
    updatedCardsPack: PackType;
    token: string;
    tokenDeathTime: number;
}

export type GetPacksResponseType = {
    cardPacks: PackType[];
    page: number;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    token: string;
    tokenDeathTime: number;
}
export type PackType = {
    _id: string;
    user_id: string;
    user_name: string;
    private: boolean;
    name: string;
    path: string;
    grade: number;
    shots: number;
    deckCover: string;
    cardsCount: number;
    type: string;
    rating: number;
    created: string;
    updated: string;
    more_id: string;
    __v: number;
}
