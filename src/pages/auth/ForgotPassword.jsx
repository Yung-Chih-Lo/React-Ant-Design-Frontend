import React from 'react';
import { Input, Typography, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MailOutlined } from '@ant-design/icons';
import { Card } from '../../components/ui/Card';
import { StyledForm } from '../../components/ui/Form';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAsync } from '../../features/auth/authSlice';

const { Title, Text } = Typography;

const ForgotPasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 24px;
  background-color: ${props => props.theme.colorBgBase};
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const Logo = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const StyledTitle = styled(Title)`
  margin: 0 !important;
  color: ${props => props.theme.colorText} !important;
`;

const StyledText = styled(Text)`
  display: block;
  text-align: center;
  margin-bottom: 24px;
  color: ${props => props.theme.colorText};
`;

const SubmitButton = styled(Button)`
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
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 16px;
`;


const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values) => {
        try {
            const resultAction = await dispatch(forgotPasswordAsync(values.email));
            if (forgotPasswordAsync.fulfilled.match(resultAction)) {
                navigate('/forgot-password-success');
            } else {
                messageApi.error(resultAction.payload.message); 
            }
        } catch (error) {
            messageApi.error('發送重設密碼郵件失敗，請稍後再試'); 
        }
    };

    return (
        <ForgotPasswordContainer>
            {contextHolder}
            <Card>
                <LogoContainer>
                    <Logo>🔑</Logo>
                    <StyledTitle level={2}>
                        重設密碼
                    </StyledTitle>
                </LogoContainer>

                <StyledText>
                    請輸入您的註冊信箱，我們將發送重設密碼連結給您
                </StyledText>

                <StyledForm
                    name="forgot-password"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <StyledForm.Item
                        name="email"
                        rules={[
                            { required: true, message: '請輸入電子郵件' },
                            { type: 'email', message: '請輸入有效的電子郵件' }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="電子郵件"
                            size="large"
                        />
                    </StyledForm.Item>

                    <StyledForm.Item>
                        <SubmitButton
                            as="button"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? '處理中...' : '發送重設連結'}
                        </SubmitButton>
                    </StyledForm.Item>
                </StyledForm>

                <LinksContainer>
                    <Button
                        type="link"
                        onClick={() => navigate('/login')}
                    >
                        返回登入
                    </Button>
                </LinksContainer>
            </Card>
        </ForgotPasswordContainer>
    );
};

export default ForgotPassword;