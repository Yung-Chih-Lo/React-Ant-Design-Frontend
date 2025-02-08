// App.jsx
import React, { useMemo } from 'react'; 
import { ConfigProvider } from 'antd'; 
import { ThemeProvider } from 'styled-components'; 
import { lightThemeTokens, darkThemeTokens } from './themeTokens'; 
import { BrowserRouter as Router } from 'react-router-dom'; 
import AppRouter from './router/AppRouter';
import { useSelector } from 'react-redux';

 
const App = () => { 
  // 1) 取得目前主題
  const theme = useSelector((state) => state.theme.mode); 
  const antdTheme = useMemo(() => theme === 'dark' ? darkThemeTokens : lightThemeTokens, [theme]); 
  const tokens = antdTheme.token; 
 
  return ( 
    <Router>
      <ConfigProvider theme={antdTheme}> 
        <ThemeProvider theme={tokens}> 
          {/* 統一由 AppRouter 處理所有路由 */}
          <AppRouter />
        </ThemeProvider> 
      </ConfigProvider> 
    </Router> 
  ); 
}; 
 
export default App;
