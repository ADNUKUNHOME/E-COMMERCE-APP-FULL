import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



const initialState = {
    isLoading: false,
    reviews: []
}


export const addNewProductReviews = createAsyncThunk('/review/addNewProductReviews', async (formData) => {
    

    const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/shope/review/add`, formData);
    return result?.data;
}
);


export const getProductReviews = createAsyncThunk('/review/getProductReviews', async (productId) => {

    console.log(productId, 'data post');

    const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shope/review/${productId}`);
    return result?.data;
}
);


const reviewSlice = createSlice({
    name: 'reviewSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getProductReviews.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getProductReviews.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reviews = action.payload.data;
        })
        .addCase(getProductReviews.rejected, (state) => {
            state.isLoading = false;
            state.reviews = [];
        })
    }
})


export default reviewSlice.reducer;