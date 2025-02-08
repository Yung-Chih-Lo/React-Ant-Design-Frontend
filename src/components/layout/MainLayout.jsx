// src/components/layout/MainLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`;

const MainContainer = styled.div`
  flex: 1;
  padding: 24px;
  transition: margin-left 0.2s;
  overflow-y: auto;
  margin-top: 64px;
  background-color: ${props => props.theme.colorBgBase};
  color: ${props => props.theme.colorText};
  ${props => props.$isMobile  
    ? `margin-left: 0;` 
    : `margin-left: ${props.$collapsed ? '80px' : '200px'};`
  }
`;

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AppContainer>
      <ContentContainer>
        <Navbar />
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isMobile={isMobile}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
        <MainContainer $collapsed={collapsed} $isMobile={isMobile}>
          {/* 渲染子路由 */}
          <Outlet />
        </MainContainer>
      </ContentContainer>
    </AppContainer>
  );
};

export default MainLayout;
