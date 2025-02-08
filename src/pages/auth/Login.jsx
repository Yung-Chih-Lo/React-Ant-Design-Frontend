// src/pages/Login.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Input, Typography, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Card from '../../components/ui/Card';
import StyledForm from '../../components/ui/Form';


const { Title } = Typography;

// Styled Components 調整版
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: ${props => props.theme.colorBgBase};
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const Logo = styled.div`
  font-size: 48px;
  color: ${props => props.theme.colorPrimary};
  margin-bottom: 16px;
`;

// 建立一個 StyledTitle，讓文字顏色使用 theme 的 colorText
const StyledTitle = styled(Title)`
  && {
    color: ${props => props.theme.colorText};
    margin-bottom: 32px;
  }
`;

const LoginButton = styled(Button)`
  && {
    height: 48px;
    font-size: 16px;
    border-radius: 8px;
    width: 100%;
    cursor: pointer;
    background-color: ${props => props.theme.colorPrimary};
    border-color: ${props => props.theme.colorPrimary};
    
    &:hover, &:focus {
      background-color: ${props => props.theme.colorPrimary}dd;
      border-color: ${props => props.theme.colorPrimary}dd;
      color: #fff;
    }

    &:disabled {
      background-color: ${props => props.theme.colorPrimary};
      border-color: ${props => props.theme.colorPrimary};
      opacity: 0.5;
    }
  }
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 16px;
`;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [messageApi, contextHolder] = message.useMessage();
  
  const onFinish = async (values) => {
    try {
      const resultAction = await dispatch(loginAsync(values));
      if (loginAsync.fulfilled.match(resultAction)) {
        message.success('登入成功，歡迎回來！');
        navigate('/');
      } else {
        messageApi.error(resultAction.payload.message);
      }
    } catch (error) {
      messageApi.error('登入過程發生錯誤，請稍後再試');
      console.error('登入過程發生錯誤:', error);
    }
  };
  return (
    <LoginContainer>
      {contextHolder}
      <Card>
        <LogoContainer>
          <Logo>🚀</Logo>
          <StyledTitle level={2}>
            歡迎回來
          </StyledTitle>
        </LogoContainer>

        <StyledForm onFinish={onFinish}>
          <StyledForm.Item
            name="email"
            rules={[
              { required: true, message: '請輸入電子郵件' },
              { type: 'email', message: '請輸入有效的電子郵件格式' }
            ]}
          >
            <Input
              size="large"
              placeholder="電子郵件"
              prefix={<UserOutlined />}
              style={{ height: '48px', borderRadius: '8px' }}
            />
          </StyledForm.Item>

          <StyledForm.Item
            name="password"
            rules={[
              { required: true, message: '請輸入密碼' },
              { min: 6, message: '密碼長度至少6個字元' }
            ]}
          >
            <Input.Password
              size="large"
              placeholder="密碼"
              prefix={<LockOutlined />}
              style={{ height: '48px', borderRadius: '8px' }}
            />
          </StyledForm.Item>

          <StyledForm.Item>
            <LoginButton
              type="primary"
              htmlType="submit"
              loading={loading ? true : undefined}
            >
              登入
            </LoginButton>
          </StyledForm.Item>

          <LinksContainer>
            <Button
              type="link"
              onClick={() => navigate('/forgot-password')}
            >
              忘記密碼
            </Button>
            <Button
              type="link"
              onClick={() => navigate('/register')}
            >
              立即註冊
            </Button>
          </LinksContainer>

        </StyledForm>
      </Card>
    </LoginContainer>
  );
};

export default Login;
