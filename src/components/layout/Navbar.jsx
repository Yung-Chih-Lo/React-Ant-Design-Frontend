// src/components/layout/Navbar.jsx

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginOutlined, LogoutOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { logout } from '../../features/auth/authSlice';
import React, { useState } from 'react';
import { Layout, Dropdown } from 'antd';
import SettingsModal from '../../pages/user/Settings';
import styled from 'styled-components';
import { BaseButton, DangerButton } from '../ui/Button';

const { Header } = Layout;

const UserButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 0 8px;
  border-radius: 8px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${props => props.theme.colorSecondary || 'rgba(0,0,0,0.06)'};
  }
`;

const UserName = styled.span`
  font-size: 14px;
  margin-right: 4px;
`;
// Navbar 容器，背景色、文字色、底線邊框
const NavbarContainer = styled(Header)`
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
`;

// 右側容器
const NavbarRight = styled.div`
  display: flex;
  align-items: center;
`;


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.mode);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const user = useSelector((state) => state.auth.user); // 使用 useSelector 來取得 user 的狀態

  // 處理登出
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const items = [
    {
      key: 'profile',
      label: (
        <BaseButton onClick={() => navigate('/profile')}>
          <UserOutlined />
          <span>個人資料</span>
        </BaseButton>
      ),
    },
    {
      key: 'settings',
      label: (
        <BaseButton onClick={() => setIsSettingModalOpen(true)}>
          <SettingOutlined />
          <span>系統設定</span>
        </BaseButton>
      ),
    },
    {
      type: 'divider',
      style: {
        backgroundColor: theme === 'dark' ? '#404040' : '#e0e0e0'
      }
    },
    isAuthenticated
      ? {
          key: 'logout',
          label: (
            <DangerButton onClick={handleLogout}>
              <LogoutOutlined />
              <span>登出</span>
            </DangerButton>
          ),
        }
      : {
          key: 'login',
          label: (
            <BaseButton onClick={() => navigate('/login')}>
              <LoginOutlined />
              <span>登入</span>
            </BaseButton>
          ),
        },
  ];

  return (
    <NavbarContainer className={theme === 'dark' ? 'dark-theme' : ''}>
      <NavbarRight>
        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          trigger={['click']}
          overlayClassName={theme === 'dark' ? 'dark-theme' : ''}
        >
           <UserButton>
            {isAuthenticated ? (
              <>
                <UserName>您好，{user?.username || '使用者'}</UserName>
                <UserOutlined />
              </>
            ) : (
              <>
                <UserName>訪客</UserName>
                <UserOutlined />
              </>
            )}
          </UserButton>
        </Dropdown>
      </NavbarRight>
      {isSettingModalOpen && (
        <SettingsModal
          open={isSettingModalOpen}
          onClose={() => setIsSettingModalOpen(false)}
        />
      )}
    </NavbarContainer>
  );
};

export default Navbar;