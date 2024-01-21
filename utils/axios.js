import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
import axios from "axios";
import store from '../redux/store';
import { setInternetConnection } from "../redux/slices/authSlice";

// base url 
const BASEURL = 'http://10.0.2.2:3001'; //192.168.1.28
// axios intance 
const API = axios.create({
    baseURL: BASEURL,
})

// getting accesstoken from async storage 
const accessToken = async () => {
    const token = await AsyncStorage.getItem("quizToken");
    return token;
};


// config headers with token 
const getAuthorizationHeader = async () => {
    const quizToken = await accessToken();
    const accessHeader = {
        headers: {
            'Authorization': `Bearer ${quizToken}`,
        },
    };

    return accessHeader;
};


// checking internet connection on every api request 
export const checkInternetConnectivity = async () => {
    const state = await NetInfo.fetch();
    return state.isConnected;
};

// directly take dispatch from store 
const { dispatch } = store

// intercept each and every request for checking internet connectivity 
API.interceptors.request.use(
    async (config) => {
        const state = await checkInternetConnectivity()
        dispatch(setInternetConnection(state))
        return config
    },
    error => Promise.reject(error)
)


// auth api's
export const CHECKLOGIN = async () => {
    const accessHeader = await getAuthorizationHeader();
    return API.post('/checkLogin', {}, accessHeader);
};

export const LOGIN = (formData) => API.post('/loginUser', formData)

export const REGISTER = (formData) => API.post('/registerUser', formData)

export const LOGOUT = async () => {
    const accessHeader = await getAuthorizationHeader();
    return API.post('/logoutUser', {}, accessHeader)
}



// user api's
export const GETUSERPROFILE = async () => {
    const accessHeader = await getAuthorizationHeader();
    return API.get('/getUserProfile', accessHeader)
}

export const UPDATEPASSWORD = async (formData) => {
    const accessHeader = await getAuthorizationHeader();
    return API.put('/updatePassword', formData, accessHeader)
}

export const EDITUSER = async (editdata) => {
    const accessHeader = await getAuthorizationHeader();
    return API.put('/editUser', editdata, accessHeader)
}

export const DELETEUSER = async () => {
    const accessHeader = await getAuthorizationHeader();
    return API.put('/deleteUser', {}, accessHeader)
}


// quiz api's

export const GETCATEGORY = async () => {
    return API.get('/getCategoriesForAdmin')
}

export const GETQUIZ = async (difficulty, quizId) => {
    return API.get(`/getQuestions/${difficulty}/${quizId}`)
}
