import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../../constants/enum";


const initialState = {
    userData: {},
    status: STATUSES.IDLE
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userData = action.payload
        },
        setStatus: (state, action) => {
            state.status = action.payload
        }
    },
    extraReducers: (builder) => {
        // builder.addCase()
    }
})


export const { setUser, setStatus } = profileSlice.actions
export default profileSlice.reducer




// export const fetchUserProfile = () => {
//     return async (dispatch, getState) => {
//         dispatch(setStatus(STATUSES.LOADING))
//         try {
//             const res = await fetchUserProfileService()
//             dispatch(setUser(res.data))
//             dispatch(setStatus(STATUSES.IDLE))

//         } catch (error) {
//             console.log(error)
//             dispatch(setStatus(STATUSES.ERROR))
//         }
//     }
// }