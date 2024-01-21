import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: '',
    type: '',
    showToast: false
}

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setToast: (state, action) => {
            state.message = action.payload.message
            state.type = action.payload.type
            state.showToast = action.payload.showToast
        }
    }
})


export const { setToast } = toastSlice.actions
export default toastSlice.reducer