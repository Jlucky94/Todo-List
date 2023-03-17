import axios from "axios";


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:7542/2.0/'
})
export const authAPI = {
    me: () => {
        return instance.post<UserDataResponseType>(`auth/me`).then(response => {
            return response.data
        })
    },
    login: (data: { email: string, password: string, rememberMe: boolean }) => {
        return instance.post<UserDataResponseType>(`auth/login`, data).then(response => {
            return response.data
        })
    },
    logout: () => {
        return instance.delete(`auth/me`).then(response => {
            return response.data
        })
    },
    registration: (data: { email: string, password: string }) => {
        return instance.post<RegisterResponseType>(`auth/register`, data).then(response => {
            return response.data
        })
    },
    forgot: (email: string) => {
        const message = `<div> password recovery link : <a href = 'http://localhost:3000/set-newpassword/$token$'>LINK</a></div>`
        return instance.post(`https://neko-back.herokuapp.com/2.0/auth/forgot`, {email,message}).then(response => {
            return response.data
        })
    },
    setNewPassword: (data: {password: string, resetPasswordToken: string }) => {
        return instance.post(`https://neko-back.herokuapp.com/2.0/auth/set-new-password`, data).then(response => {
            return response.data
        })
    },
    updateProfile: (data: {name: string, avatar: string }) => {
        return instance.put(`auth/me`, data).then(response => {
            return response.data
        })
    },
}
//types

export type RegisterResponseType = {
    addedUser: UserDataResponseType;
}
export type UserDataResponseType = {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    __v: number;
    token: string;
    tokenDeathTime: number;
    avatar: string;
}
