import axios from "axios"

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


const initialState = {
    isLoading: false,
    addressList: []
}

export const addNewAddress = createAsyncThunk('/addresses/addnewaddress', async (formData) => {
    const response = await axios.post('http://localhost:5000/api/shope/address/add', formData);
    return response.data;
})


export const fetchAddresses = createAsyncThunk('/addresses/fetchAddresses', async (userId) => {
    const response = await axios.get(`http://localhost:5000/api/shope/address/get/${userId}`);
    return response.data;
})


export const editAddresses = createAsyncThunk('/addresses/editAddresses', async ({ userId, addressId, formData }) => {
    const response = await axios.put(`http://localhost:5000/api/shope/address/edit/${userId}/${addressId}`, formData);
    return response.data;
})


export const deleteAddress = createAsyncThunk('/addresses/deleteAddress', async ({ userId, addressId }) => {
    const response = await axios.delete(`http://localhost:5000/api/shope/address/delete/${userId}/${addressId}`);
    return response.data;
})

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addNewAddress.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addNewAddress.fulfilled, (state, action) => {
            state.isLoading = false
        })
        .addCase(addNewAddress.rejected, (state) => {
            state.isLoading = false
        })
        .addCase(fetchAddresses.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchAddresses.fulfilled, (state, action) => {
            state.isLoading = false,
            state.addressList = action.payload.data
        })
        .addCase(fetchAddresses.rejected, (state) => {
            state.isLoading = false,
            state.addressList = []
        })
    }
})


export default addressSlice.reducer;