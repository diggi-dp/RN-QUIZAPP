import { LOGIN, REGISTER, CHECKLOGIN, LOGOUT } from "../axios";


export const loginUser = async (credintials) => {
    try {
        const res = await LOGIN(credintials)
        console.log(res)
        if (res && res.status === 200) {
            if (res.data.user) {
                return res.data.user
            }
        }
        throw new Error('Invalid response')
    } catch (error) {
        throw new Error(error.response.message)
    }
}


export const registerUser = async (userData) => {
    try {
        const res = await REGISTER(userData)
        if (res.status === 200 && res.data) {
            return res.data
        }
        throw new Error('Invalid response')
    } catch (error) {
        throw new Error(error.response.message)
    }
}


export const logoutUser = async () => {
    try {
        const res = await LOGOUT()
        return res
    } catch (error) {
        console.log(error)
        throw new Error(error.response.message)
    }
}


export const checkLoginUser = async () => {
    try {
        const res = await CHECKLOGIN()
        return res.data.status
    } catch (error) {
        console.log(error)
        throw new Error(error.response.message)
    }
}


