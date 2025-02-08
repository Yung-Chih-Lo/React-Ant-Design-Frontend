// themeTokens.js
// 主要品牌色：#b7773c 為 seleted 等顯示
// 次要品牌色：#b7773c40 為 hover 等顯示
// 其他基本根據 light/dark 調整

export const lightThemeTokens = {
  token: {
    
    colorPrimary: "#b7773c", // 品牌橘色，組件點選後的顏色
    colorSecondary: "#b7773c40", // 淺橘色，組件的 hover 顏色
    colorText: "#1f1f1f", // 深黑色
    borderColor: "#e0e0e0", // 淺灰色
    colorBgBase: "#ffffff", // 非常淺的灰色
    colorBgContainer: "#ffffff",
    colorBgBoarder: "#1f1f1f40", // 深灰色
    colorBgTextHover: '#f5f5f5',    // 文字 hover 色
    // 其他狀態色
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#f5222d",
    colorInfo: "#1890ff",

    colorLink: "#b7773c", // 連結色
  },
  components: {
    Menu: {
      colorBgContainer: "#f5f5f5",
      itemHoverBg: "#b7773c40",
      itemSelectedBg: "#b7773c",
      itemSelectedColor: "#ffffff",
    },
    Layout: {
      siderBg: "#f5f5f5",
      headerBg: "#ffffff",
    },
    Select: {
      optionSelectedBg: "#b7773c",
      optionSelectedColor: "#1f1f1f",
      optionActiveBg: "#b7773c40",
    },
  },
};

export const darkThemeTokens = {
  token: {
    colorPrimary: "#b7773c",
    colorSecondary: "#b7773c40", // 淺橘色
    colorText: "#eaeaea",
    borderColor: "#404040",
    colorBgBase: "#272727",
    colorBgContainer: "#272727",
    colorBgBoarder: "#f5f5f5",
    colorBgTextHover: '#303030',
    // 其他狀態色
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#f5222d",
    colorInfo: "#1890ff",
    colorLink: "#b7773c", // 連結色
  },
  components: {
    Menu: {
      darkItemBg: "#141414",
      darkItemHoverBg: "#b7773c40",
      darkItemSelectedBg: "#b7773c",
    },
    Layout: {
      siderBg: "#141414",
      headerBg: "#272727",
    },
    Select: {
      optionSelectedBg: "#b7773c",
      optionSelectedColor: "#eaeaea",
      optionActiveBg: "#b7773c40",
    },
  },
};