// src/store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";

// 登入 thunk
export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (loginData, { rejectWithValue }) => {
    try {
      return await authService.login(loginData);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// 註冊 thunk
export const registerAsync = createAsyncThunk(
  "auth/registerAsync",
  async (registerData, { rejectWithValue }) => {
    try {
      return await authService.register(registerData);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// 驗證信箱 thunk
export const verifyEmailAsync = createAsyncThunk(
  "auth/verifyEmailAsync",
  async (token, { rejectWithValue }) => {
    try {
      return await authService.verifyEmail(token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// 驗證重設密碼 token thunk
export const verifyResetTokenAsync = createAsyncThunk(
  "auth/verifyResetToken",
  async (token, { rejectWithValue }) => {
    try {
      const response = await authService.verifyResetToken(token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// 重設密碼的 thunk
export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await authService.resetPassword(token, password);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// 發送忘記密碼郵件的 thunk
export const forgotPasswordAsync = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await authService.forgotPassword(email);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// 設定初始狀態
const initialState = {
  isAuthenticated: false,
  user: null,  // {username, email, id}
  token: null, // 這裡存放 JWT token
  loading: false,
  error: null, // 只存放重大錯誤，例如 token 過期等
};

// 建立 slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 登出 action: 清除狀態
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      // loginAsync 發送中
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // loginAsync 成功
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        // 後端回傳的格式是 { message, token, user }
        state.token = action.payload.token.access; // 存儲 access token
        state.user = action.payload.user;
    })
      // loginAsync 失敗
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      // verifyEmailAsync 發送中
      .addCase(verifyEmailAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // verifyEmailAsync 成功
      .addCase(verifyEmailAsync.fulfilled, (state) => {
        state.loading = false;
      })
      // verifyEmailAsync 失敗
      .addCase(verifyEmailAsync.rejected, (state, action) => {
        state.loading = false;
      })
      // registerAsync 發送中
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // registerAsync 成功
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      // registerAsync 失敗
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
      })
      // 驗證 reset token pending
      .addCase(verifyResetTokenAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // 驗證 reset token 成功
      .addCase(verifyResetTokenAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      // 驗證 reset token 失敗
      .addCase(verifyResetTokenAsync.rejected, (state, action) => {
        state.loading = false;
      })

      // 重設密碼 pending
      .addCase(resetPasswordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // 重設密碼成功
      .addCase(resetPasswordAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      // 重設密碼失敗
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.loading = false;
      })
      // 發送忘記密碼郵件 pending
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // 發送忘記密碼郵件成功
      .addCase(forgotPasswordAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      // 發送忘記密碼郵件失敗
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

// 4) 輸出 actions
export const { logout } = authSlice.actions;

// 5) 輸出 reducer
export default authSlice.reducer;
