import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { // initialState 是一個物件，裡面包含了所有狀態的初始值
    mode: localStorage.getItem('theme') || 'light', // 預設讀取 localStorage
  },
  reducers: { // reducers 是一個物件，裡面包含了一個個的 reducer 函式
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.mode); // 更新 localStorage
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;