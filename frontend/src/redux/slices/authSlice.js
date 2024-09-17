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

const foregtPassword = createAsyncThunk("/api/auth/forget-password", async (email) => {
  try {
    const response = await axios.post("/api/auth/forget-password", email, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.message;
  } catch (error) {
    throw error.response.data.error;
  }
});


const resetPassword = createAsyncThunk("/api/auth/reset-password", async (data) => {
  try {
    const response = await axios.post(`/api/auth/reset-password/:${data.resetPasswordToken}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.message;
  } catch (error) {
    throw error.response.data.error;
  }
});

const checkIsLoggedIn = createAsyncThunk("/api/auth/islogged", async () => {
  try {
    const response = await axios.get("/api/auth/islogged")
    return response.data.message;
  } catch (error) {
    throw error.response.data.error;
  }
});

const getUserData = createAsyncThunk("/api/auth/user-data", async () => {
  try {
    const response = await axios.get("/api/auth/user-data")
    return response.data.message;
  } catch (error) {
    throw error.response.data.error;
  }
});

const signOut = createAsyncThunk("/api/auth/sign-out", async () => {
  try {
    const response = await axios.get("/api/auth/sign-out")
    return response.data.message;
  } catch (error) {
    throw error.response.data.error;
  }
});




const initialState = {
  data: [],
  isLoggedIn : false,
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
      .addCase(foregtPassword.pending, (state) => {
        state.status = "loading";
        state.error = null
      })
      .addCase(foregtPassword.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null
      })
      .addCase(foregtPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
        state.error = null
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(checkIsLoggedIn.pending, (state) => {
        state.error = null
      })
      .addCase(checkIsLoggedIn.fulfilled, (state) => {
        state.isLoggedIn = true
        state.error = null
      })
      .addCase(checkIsLoggedIn.rejected, (state, action) => {
        state.isLoggedIn = false
        state.error = action.error.message;
      })
      .addCase(getUserData.pending, (state) => {
        state.error = null
      })
      .addCase(getUserData.fulfilled, (state,action) => {
        state.data = action.payload
        state.error = null
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.userData = []
        state.error = action.error.message;
      })
      .addCase(signOut.pending, (state) => {
        state.error = null
      })
      .addCase(signOut.fulfilled, (state) => {
        state.error = null
        state.isLoggedIn = false
      })
      .addCase(signOut.rejected, (state, action) => {
        state.error = action.error.message;
      })
     
  },
});

export const { updateStatus } = authSlice.actions;
export default authSlice.reducer;
export {signup,verifyEmail,signin, foregtPassword, resetPassword, checkIsLoggedIn,getUserData,signOut}