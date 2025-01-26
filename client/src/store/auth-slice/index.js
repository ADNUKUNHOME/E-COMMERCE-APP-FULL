import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import { buildErrorMessage } from 'vite';


const initialState = {
    isAuthenticated : false,
    isLoading : false,
    user : null
}

export const registerUser = createAsyncThunk(
    '/auth/register',
    async (formData, thunkAPI) => {
      try {
        const response = await axios.post(    
          'http://localhost:5000/api/auth/register',
          formData,
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  

  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setUser: (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload; // Set user from API response
          state.isAuthenticated = true;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload; // Set error message
          state.isAuthenticated = false;
        });
    },
  });
  
  export const { setUser } = authSlice.actions;
  export default authSlice.reducer;