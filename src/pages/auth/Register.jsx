// 註冊頁
// src/pages/Register.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerAsync } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { authService } from '../../services/authService';
import { Card } from '../../components/ui/Card';
import { StyledForm } from '../../components/ui/Form';

const { Title } = Typography;

// 註冊頁面的背景與卡片使用 themeTokens 的顏色設定
const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: ${props => props.theme.colorBgContainer};
`;

const RegisterCard = styled(Card)`
  max-width: 450px;
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

const StyledTitle = styled(Title)`
  && {
    color: ${props => props.theme.colorText};
    margin-bottom: 32px;
  }
`;

const StyledButton = styled(Button)`
  height: 48px;
  font-size: 16px;
  border-radius: 8px;
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colorError};
  text-align: center;
  margin-bottom: 16px;
`;

const LoginLink = styled.div`
  text-align: center;
  color: ${props => props.theme.colorText};
  margin-top: 16px;
`;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    // 此處假設你會發送註冊請求
    const resultAction = await dispatch(registerAsync(values));
    if (registerAsync.fulfilled.match(resultAction)) {
      // 註冊成功後，導向註冊成功頁面，請使用者前往信箱驗證
      navigate('/register-success');
    } else {
      messageApi.error(resultAction.payload.message);
    }
  };

  return (
    <RegisterContainer>
      {contextHolder}
      <RegisterCard>
        <LogoContainer>
          <Logo>🚀</Logo>
          <StyledTitle level={2}>註冊新帳號</StyledTitle>
        </LogoContainer>

        <StyledForm
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="使用者名稱"
            name="username"
            rules={[
              { required: true, message: '請輸入名稱' },
              {
                validator: async (_, value) => {
                  if (value) {
                    const result = await authService.checkAvailability('username', value);
                    if (!result.available) {
                      return Promise.reject(result.message);
                    }
                    else {
                      return Promise.resolve();
                    }
                  }
                  return Promise.resolve();
                },
              },
            ]}
            validateTrigger={['onBlur', 'onChange']} // 失去焦點和變更時都觸發驗證
          >
            <Input
              size="large"
              placeholder="請輸入名稱"
              prefix={<UserOutlined />}
              style={{ height: '48px', borderRadius: '8px' }}
            />
          </Form.Item>

          <Form.Item
            label="電子郵件"
            name="email"
            rules={[
              { required: true, message: '請輸入電子郵件' },
              { type: 'email', message: '請輸入有效的電子郵件格式' },
              {
                validator: async (_, value) => {
                  if (value) {
                    const result = await authService.checkAvailability('email', value);
                    if (!result.available) {
                      return Promise.reject(result.message);
                    }
                  }
                  return Promise.resolve();
                },
              },
            ]}
            validateTrigger={['onBlur', 'onChange']}
          >
            <Input
              size="large"
              placeholder="請輸入電子郵件"
              prefix={<MailOutlined />}
              style={{ height: '48px', borderRadius: '8px' }}
            />
          </Form.Item>

          <Form.Item
            label="密碼"
            name="password"
            rules={[
              { required: true, message: '請輸入密碼' },
              { min: 8, message: '密碼長度至少8個字元' },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                message: '密碼必須包含大小寫字母、數字和特殊符號'
              },
              {
                validator: (_, value) => {
                  if (value && value.length >= 8) {
                    // 檢查是否包含連續的數字或字母
                    const hasSequential = /123|234|345|456|567|678|789|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i.test(value);
                    if (hasSequential) {
                      return Promise.reject('密碼不能包含連續的數字或字母');
                    }
                    // 檢查重複字符
                    const hasRepeating = /(.)\1{2,}/.test(value);
                    if (hasRepeating) {
                      return Promise.reject('密碼不能包含連續重複的字符');
                    }
                  }
                  return Promise.resolve();
                }
              }
            ]}
            hasFeedback
          >
            <Input.Password
              size="large"
              placeholder="請輸入至少8位字元的強密碼"
              prefix={<LockOutlined />}
              style={{ height: '48px', borderRadius: '8px' }}
            />
          </Form.Item>

          <Form.Item
            label="確認密碼"
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: '請再次輸入密碼' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('兩次輸入的密碼不一致'));
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              placeholder="請再次輸入密碼"
              prefix={<LockOutlined />}
              style={{ height: '48px', borderRadius: '8px' }}
            />
          </Form.Item>

          <Form.Item>
            <StyledButton
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              註冊
            </StyledButton>
          </Form.Item>
          <LoginLink>
            已有帳號？{' '}
            <Button
              type="link"
              onClick={() => navigate('/login')}
              style={{ padding: 0 }}
            >
              立即登入
            </Button>
          </LoginLink>
        </StyledForm>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;
