import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    authToken: '',
    internetConnection: true,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        Login: (state, action) => {
            state.authToken = action.payload
        },
        setInternetConnection: (state, action) => {
            state.internetConnection = action.payload
        }
    }
})

export const { Login,setInternetConnection } = authSlice.actions
export default authSlice.reducer



// export const login = createAsyncThunk('auth/login',
//     async (payload, thunkAPI) => {
//         try {
//             const token = await AuthService.login(payload)
//             if (res.status < 200 || res.status >= 300) {
//                 return rejectWithValue(data);
//             }
//             return token;

//         } catch (error) {
//             // const message =
//             //     (error.response &&
//             //         error.response.data &&
//             //         error.response.data.message) ||
//             //     error.message ||
//             //     error.toString();
//             return thunkAPI.rejectWithValue();
//         }
//     }
// )