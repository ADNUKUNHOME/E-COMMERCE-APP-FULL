import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    orderList: [],
    orderDetails: null
}


export const getAllOrdersforAdmin = createAsyncThunk('/order/getAllOrdersforAdmin', async () => {
    const response = await axios.get(`http://localhost:5000/api/admin/orders/get`
    );
    return response.data;
})

export const getOrderDetailsForAdmin = createAsyncThunk('/order/getOrderDetailsForAdmin', async (id) => {
    const response = await axios.get(`http://localhost:5000/api/admin/orders/details/${id}`
    );
    return response.data;
})


export const updateOrderStatus = createAsyncThunk('/order/updateOrderStatus', async ({ id, orderStatus }) => {
    const response = await axios.put(`http://localhost:5000/api/admin/orders/update/${id}`, {
        orderStatus
    }
    );
    return response.data;
})


const adminOrdersSlice = createSlice({
    name: 'adminOrdersSlice',
    initialState,
    reducers: {
        resetOrderDetails: (state) => {
            state.orderDetails = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrdersforAdmin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllOrdersforAdmin.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.orderList = action.payload.data
            })
            .addCase(getAllOrdersforAdmin.rejected, (state) => {
                state.isLoading = false,
                    state.orderList = []
            })
            .addCase(getOrderDetailsForAdmin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.orderDetails = action.payload.data
            })
            .addCase(getOrderDetailsForAdmin.rejected, (state) => {
                state.isLoading = false,
                    state.orderDetails = null
            })
    }
})

export const { resetOrderDetails } = adminOrdersSlice.actions;
export default adminOrdersSlice.reducer;