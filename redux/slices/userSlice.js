import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    categoryData: [],
    selectedSubCategory: null,
    selectedDifficultyLevel: '',
    result: [],
    userLocation: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCategoryData: (state, action) => {
            state.categoryData = action.payload
        },
        setSelectedSubCategory: (state, action) => {
            state.selectedSubCategory = action.payload
        },
        setSelectedDifficultyLevel: (state, action) => {
            state.selectedDifficultyLevel = action.payload
        },
        setResult: (state, action) => {
            state.result.push(action.payload)
        },
        setUserLocation: (state, action) => {
            state.userLocation = action.payload
        }
    }
})


export const {
    setSelectedDifficultyLevel,
    setSelectedSubCategory,
    setCategoryData,
    setResult,
    setUserLocation
} = userSlice.actions

export default userSlice.reducer