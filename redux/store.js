import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/slices/authSlice'
import toastReducer from '../redux/slices/toastSlice'
import profileSlice from "./slices/profileSlice";
import userReducer from './slices/userSlice'


export default store = configureStore({
    reducer: {
        toast: toastReducer,
        profile: profileSlice,
        auth: authReducer,
        user: userReducer
    }
})