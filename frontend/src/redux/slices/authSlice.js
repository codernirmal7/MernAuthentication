import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const signup = createAsyncThunk("/api/auth/signup", async (userData) => {
  try {
    const response = await axios.post("/api/auth/signup", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.message;
  } catch (error) {
    throw error.response.data.error;
  }
});

const verifyEmail = createAsyncThunk("/api/auth/verify-email", async (data) => {
  try {
    const response = await axios.post(`/api/auth/verify?email=${data[0].email}`,data[1], {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.message;
  } catch (error) {
    throw error.response.data.error;
  }
});

const signin = createAsyncThunk("/api/auth/signin", async (userData) => {
  try {
    const response = await axios.post("/api/auth/signin", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.message;
  } catch (error) {
    throw error.response.data.error;
  }
});



const initialState = {
  data: [],
  status: "idel", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers : {
    updateStatus(state, action) {
      state.status = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = "loading";
        state.error = null
      })
      .addCase(signup.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.status = "loading";
        state.error = null
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
     .addCase(signin.pending, (state) => {
        state.status = "loading";
        state.error = null
      })
      .addCase(signin.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
     
  },
});

export const { updateStatus } = authSlice.actions;
export default authSlice.reducer;
export {signup,verifyEmail,signin}