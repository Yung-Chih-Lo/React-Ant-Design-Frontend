import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Menu, Button, Drawer } from 'antd';
import styled from 'styled-components';
import {
  MenuOutlined,
  HomeOutlined,
  FileTextOutlined,
} from '@ant-design/icons';

import logoNormal from '../../assets/logo_normal.png';
import logoSmall from '../../assets/logo_small.png';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

// 這些 styled-components 與之前大同小異，保留即可
const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  justify-content: space-between;
`;

const StyledSider = styled(Sider)`
  position: fixed;
  left: 0;
  height: 100vh;
  z-index: 1000;
`;

const SidebarLogo = styled.img`
  transition: width 0.3s ease;
`;

const SidebarLogoNormal = styled(SidebarLogo)`
  width: 120px;
`;
const SidebarLogoSmall = styled(SidebarLogo)`
  width: 40px;
`;

/** ================================
 *  Mobile 部分
 *  ================================ */
const MobileMenuButton = styled(Button)`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1999;
`;

const MobileDrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const MobileLogoContainer = styled.div`
  margin-bottom: 16px;
`;
const StyledDrawer = styled(Drawer)`
  .ant-drawer-wrapper-body {
    background-color: ${props => props.theme.colorBgContainer};
  }
  
  .ant-drawer-body {
    padding: 16px;
  }

  .ant-menu {
    background-color: ${props => props.theme.colorBgContainer};
    
    .ant-menu-item {
      &:hover {
        background-color: ${props => props.theme.colorBgTextHover};
      }
      
      &.ant-menu-item-selected {
        background-color: ${props => props.theme.colorPrimary}15;
      }
    }
  }

  && {
    z-index: 1001;
  }
`;

// 透過參數接收父層的狀態與 setState
const Sidebar = ({
  collapsed,
  setCollapsed,
  isMobile,
  drawerOpen,
  setDrawerOpen,
}) => {
  const theme = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();

  const menuItems = [
    { 
      key: 'home', 
      icon: <HomeOutlined />, 
      label: '首頁',
      onClick: () => navigate('/') 
    },
    { 
      key: 'questions', 
      icon: <FileTextOutlined />, 
      label: '考題列表',
      onClick: () => navigate('/questions') 
    },
  ];

  // Mobile (小螢幕) => 使用 Drawer
  if (isMobile) {
    return (
      <>
        <MobileMenuButton
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setDrawerOpen(!drawerOpen)}
        />
        <StyledDrawer
          title="選單"
          placement="left"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          closable={true}
          maskClosable={true}
          keyboard={true}
        >
          <MobileDrawerContent>
            <MobileLogoContainer>
              <SidebarLogoNormal src={logoNormal} alt="Logo" />
            </MobileLogoContainer>
            <Menu
              theme={theme}
              mode="inline"
              items={menuItems}
              style={{ border: 'none' }}
            />
          </MobileDrawerContent>
        </StyledDrawer>
      </>
    );
  }

  // Desktop => 使用 Sider
  return (
    <StyledSider width={collapsed ? 80 : 200} collapsed={collapsed} theme={theme}>
      <SidebarHeader>
        {collapsed ? (
          <SidebarLogoSmall src={logoSmall} alt="Logo" />
        ) : (
          <SidebarLogoNormal src={logoNormal} alt="Logo" />
        )}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
      </SidebarHeader>
      <Menu theme={theme} mode="inline" items={menuItems} />
    </StyledSider>
  );
};

export default Sidebar;
