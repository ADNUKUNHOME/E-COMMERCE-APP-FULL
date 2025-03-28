import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import { buildErrorMessage } from 'vite';


const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  token: null
}

export const registerUser = createAsyncThunk(
  '/auth/register',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  '/auth/login',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logoutnUser = createAsyncThunk(
  '/auth/logout',
  async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`, {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


// export const checkAuth = createAsyncThunk(
//   "/auth/checkauth",
//   async (_, thunkAPI) => {
//       try {
//           const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/check-auth`, {
//               withCredentials: true, 
//               headers: {
//                   "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",

//               },
//           });
//           return response.data;
//       } catch (error) {
//           return thunkAPI.rejectWithValue(error.response?.data || "Auth check failed");
//       }
//   }
// );


export const checkAuth = createAsyncThunk(
  "/auth/checkauth",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/check-auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",

        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Auth check failed");
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
    resetTokenAndCredentials: (state) => {
      state.isAuthenticated = false,
        state.user = null,
        state.token = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user; // Set user from API response
          state.isAuthenticated = true;
        } else {
          state.user = null; // Ensure user remains null on failed registration
          state.isAuthenticated = false;
        }

      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Set error message
        state.isAuthenticated = false;
      })


      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {


        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success ? true : false;
        state.token = action.payload.token;
        sessionStorage.setItem('token', JSON.stringify(action.payload.token));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.token = null;
      })


      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;


        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Set error message
        state.isAuthenticated = false;
      }).addCase(logoutnUser.fulfilled, (state, action) => {


        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
  },
});

export const { setUser, resetTokenAndCredentials } = authSlice.actions;
export default authSlice.reducer;