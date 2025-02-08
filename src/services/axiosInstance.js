// Axios 全局設定
// services/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true,  // 允許跨域請求攜帶 cookies
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// 添加響應攔截器處理錯誤
axiosInstance.interceptors.response.use(
  response => response,  // 成功的請求直接返回
  error => {
    // 根據環境處理錯誤日誌
    const errorInfo = {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      code: error.response?.data?.code,
      url: error.config?.url,
      method: error.config?.method,
    };

    // 開發環境：顯示完整錯誤信息
    if (import.meta.env.MODE === 'development') {
      console.error('開發環境錯誤:', {
        ...errorInfo,
        data: error.response?.data,
        fullError: error
      });
    }
    // 生產環境：只顯示最基本信息
    else {
      console.error('生產環境錯誤:', {
        status: errorInfo.status,
        url: errorInfo.url
      });
    }

    // 不要在這裡處理錯誤訊息，而是將錯誤傳遞給調用方
    return Promise.reject(error.response?.data || {
      code: 'UNKNOWN_ERROR',
      message: '發生未知錯誤',
      status: error.response?.status
    });
  }
);

export default axiosInstance;
