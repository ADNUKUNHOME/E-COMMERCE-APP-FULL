    import axios from "axios";

    import { createAsyncThunk } from "@reduxjs/toolkit";
    import { createSlice } from "@reduxjs/toolkit";

    const initialState = {
        isLoading : false,
        productList: [],
        productDetails: null
    }

    export const fetchAllFilteredProducts = createAsyncThunk(
        '/product/fetchallproducts', 
        async ({ filterParams, sortParams }) => {
            
            const query = new URLSearchParams();
    
            for (const key in filterParams) {
                if (Array.isArray(filterParams[key]) && filterParams[key].length > 0) {
                    query.set(key, filterParams[key].join(',')); // Convert array to a comma-separated string
                }
            }
    
            if (sortParams) {
                query.set("sortBy", sortParams);
            }
    
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/shope/products/get?${query.toString()}`;
            
            console.log("🛠️ API Call URL:", apiUrl);
    
            const result = await axios.get(apiUrl);
    
            return result?.data;
        }
    );
    
        

    export const fetchProductDetails = createAsyncThunk(
        '/product/fetchProductDetails', 
        async (id) => {
    
    
            const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/shope/products/get/${id}`);
    
            return result?.data;
        }
    );
        
        
        const shoppingProductSlice  = createSlice({
            name: 'shoppingProducts',
            initialState,
            reducers : {
                setProductDetails : (state) => {
                    state.productDetails = null
                }
            },
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
                builder.addCase(fetchProductDetails.pending, (state, action) => {
                    state.isLoading = true;
                })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                    state.isLoading = false,
                    state.productDetails = action.payload.data;
                })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                
                    state.isLoading = false,
                    state.productDetails = null;
                })
            }
        })

        export const {setProductDetails} = shoppingProductSlice.actions;
        export default shoppingProductSlice.reducer;