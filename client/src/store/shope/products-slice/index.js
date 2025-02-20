import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading : false,
    productList: []
}


export const fetchAllFilteredProducts = createAsyncThunk('/product/fetchallproducts', async () => {
    const result  = await axios.get('http://localhost:5000/api/shope/products/get'
    );
    return result?.data;
})


    
    const shoppingProductSlice  = createSlice({
        name: 'shoppingProducts',
        initialState,
        reducers : {},
        extraReducers : (builder) => {
            builder.addCase(fetchAllFilteredProducts.pending, (state, action) => {
                state.isLoading = true;
            })
           .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
            

                state.isLoading = false,
                state.productList = action.payload.data;
            })
           .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
            
                state.isLoading = false,
                state.productList = [];
            })
        }
    })

    export default shoppingProductSlice.reducer;