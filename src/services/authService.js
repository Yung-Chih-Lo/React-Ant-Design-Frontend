// src/services/authService.js
import { message } from "antd";
import axiosInstance from "./axiosInstance";

const authService = {
  // 設置 token 到 axios header
  setAuthHeader: function (token) {
    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
  },

  // 登入 API
  login: async (loginData) => {
    try {
      const response = await axiosInstance.post("auth/login/", loginData);
      // 修正 token 的取得方式，因為後端回傳的結構是 { token: { access, refresh } }
      if (response.data.token) {
        // 使用 access token
        authService.setAuthHeader(response.data.token.access);
      }
      return response.data;
    } catch (err) {
      throw (
        err|| {
          message: "請檢查帳號密碼",
          code: "LOGIN_FAILED", // TODO 需要修正
        }
      );
    }
  },
  // 登出 API
  logout: async () => {
    try {
      const response = await axiosInstance.post(
        "auth/logout/",
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      throw (
        err|| {
          message: "請稍後再試",
          code: "LOGOUT_FAILED", // TODO 需要修正
        }
      );
    }
  },
  // 註冊 API
  register: async (registerData) => {
    try {
      const response = await axiosInstance.post(
        "/auth/register/",
        registerData
      );
      return response.data;
    } catch (err) {
      throw err || {
        message: "註冊失敗",
        code: "REGISTER_FAILED", // TODO 需要修正
      };
    }
  },
  // 驗證信箱 API
  verifyEmail: async (token) => {
    try {
      const response = await axiosInstance.get(
        `/auth/verify-email/?token=${token}`
      );
      return response.data;
    } catch (err) {
      throw err || {
        message: "驗證信箱失敗",
        code: "VERIFY_EMAIL_FAILED", // TODO 需要修正
      };
    }
  },
  // 確認 user or email 是否可用 API
  checkAvailability: async (field, value) => {
    try {
      const response = await axiosInstance.get(
        `/auth/check-availability?field=${field}&value=${value}`
      );
      return response.data;
    } catch (err) {
      throw err||{
        message: "系統錯誤",
        code: "SYSTEM_ERROR", // TODO 需要修正
      }
    }
  },
  // 驗證重設密碼 token
  verifyResetToken: async (token) => {
    try {
      const response = await axiosInstance.get(
        `/auth/verify-reset-token/?token=${token}`
      );
      return response.data;
    } catch (err) {
      throw (
        err || {
          message: "驗證重設密碼 token 失敗",
          code: "VERIFY_RESET TOKEN_FAILED", // TODO 需要修正
        }
      );
    }
  },
  // 重設密碼
  resetPassword: async (token, password) => {
    try {
      const response = await axiosInstance.post("/auth/reset-password/", {
        token,
        new_password: password,
      });
      return response.data;
    } catch (err) {
      throw (
        err || {
          message: "重設密碼失敗，請稍後再試",
          code: "RESET_PASSWORD_FAILED", // TODO 需要修正
        }
      );
    }
  },
  // 發送忘記密碼郵件
  forgotPassword: async (email) => {
    try {
      const response = await axiosInstance.post("/auth/forgot-password/", {
        email,
      });
      return response.data;
    } catch (err) {
      throw err || {
        message: "系統錯誤",
        code: "SYSTEM_ERROR",
      };
    }
  },
};

export { authService };
