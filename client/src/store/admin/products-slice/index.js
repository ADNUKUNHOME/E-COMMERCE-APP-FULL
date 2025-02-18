import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    productList: []
}

export const addNewProduct = createAsyncThunk('/product/addnewproduct', async (FormData) => {
    const result  = await axios.post('http://localhost:5000/api/admin/products/add', FormData, 
        { headers: {
            'content-type' : 'application/json'
        }}
    );
    return result?.data;
})

export const fetchAllProducts = createAsyncThunk('/product/fetchallproducts', async () => {
    const result  = await axios.get('http://localhost:5000/api/admin/products/get'
    );
    return result?.data;
})

export const editProduct = createAsyncThunk('/product/editProduct', async ({id, formData}) => {
    const result  = await axios.put(`http://localhost:5000/api/admin/products/edit/${id}`, FormData, 
        { headers: {
            'content-type' : 'application/json'
        }}
    );
    console.log('PUT RESPONSE:', result?.data);
    
    return result?.data;
})

export const deleteProduct = createAsyncThunk('/product/deleteProduct', async (id) => {
    const result  = await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`
    );
    return result?.data;
})

const AdminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchAllProducts.fulfilled, (state, action) => {
            
            state.isLoading = false,
            state.productList = action.payload.data;

        }).addCase(fetchAllProducts.rejected, (state) => {            
            
            state.isLoading = false,
            state.productList = []
        })
    }
})

export default AdminProductsSlice.reducer;