import React, { useState } from 'react';
import { Input, Typography, Button, message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { LockOutlined } from '@ant-design/icons';
import Card from '../../components/ui/Card';
import StyledForm from '../../components/ui/Form';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetPasswordAsync, verifyResetTokenAsync } from '../../features/auth/authSlice';

const { Title } = Typography;

const ResetPasswordContainer = styled.div`
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

const StyledTitle = styled(Title)`
  && {
    color: ${props => props.theme.colorText};
    margin-bottom: 32px;
  }
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

const ErrorMessage = styled.div`
  color: ${props => props.theme.colorError};
  text-align: center;
  margin-bottom: 16px;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 16px;
`;

const ResetPassword = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isValidToken, setIsValidToken] = useState(false);
    const [isCheckingToken, setIsCheckingToken] = useState(true);  // 新增載入狀態
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [messageApi, contextHolder] = message.useMessage();

    // 在組件載入時驗證 token
    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setIsCheckingToken(false);
                return;
            }

            try {
                const resultAction = await dispatch(verifyResetTokenAsync(token));

                if (verifyResetTokenAsync.fulfilled.match(resultAction)) {
                    setIsValidToken(true);
                } else {
                    setError('重設密碼連結已過期或無效');
                    setIsValidToken(false);
                }
            } catch (error) {
                setError('重設密碼連結已過期或無效');
                setIsValidToken(false);
            } finally {
                setIsCheckingToken(false);
            }
        };

        verifyToken();
    }, [token]);

    const onFinish = async (values) => {
        if (!token || !isValidToken) {
            setError('重設密碼連結無效');
            return;
        }

        setLoading(true);
        try {
            const resultAction = await dispatch(resetPasswordAsync({
                token,
                password: values.password
            }));

            if (resetPasswordAsync.fulfilled.match(resultAction)) {
                messageApi.success('密碼重設成功，請使用新密碼登入');
                navigate('/login', {
                    state: {
                        successMessage: '密碼重設成功，請使用新密碼登入'
                    }
                });
            } else {
                // 如果是 rejected action，顯示錯誤訊息
                setError(resultAction.payload.message);
            }
        } catch (error) {
            setError('重設密碼時發生錯誤，請稍後再試');
        } finally {
            setLoading(false);
        }
    };

    // 如果正在檢查 token，顯示載入中
    if (isCheckingToken) {
        return (
            <ResetPasswordContainer>
                <Card>
                    <LogoContainer>
                        <Logo>🔄</Logo>
                        <StyledTitle level={2}>
                            驗證中...
                        </StyledTitle>
                    </LogoContainer>
                </Card>
            </ResetPasswordContainer>
        );
    }

    // 如果 token 無效或不存在，顯示錯誤訊息
    if (!token || !isValidToken) {
        return (
            <ResetPasswordContainer>
                <Card>
                    <LogoContainer>
                        <Logo>🔒</Logo>
                        <StyledTitle level={2}>
                            無效的連結
                        </StyledTitle>
                    </LogoContainer>
                    <ErrorMessage>
                        {error || '此重設密碼連結無效或已過期，請重新申請'}
                    </ErrorMessage>
                    <LinksContainer>
                        <Button
                            type="link"
                            onClick={() => navigate('/forgot-password')}
                        >
                            重新申請重設密碼
                        </Button>
                    </LinksContainer>
                </Card>
            </ResetPasswordContainer>
        );
    }

    return (
        <ResetPasswordContainer>
            {contextHolder}
            <Card>
                <LogoContainer>
                    <Logo>🔑</Logo>
                    <StyledTitle level={2}>
                        重設密碼
                    </StyledTitle>
                </LogoContainer>

                <StyledForm onFinish={onFinish}>
                    <StyledForm.Item
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
                    </StyledForm.Item>

                    <StyledForm.Item
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
                    </StyledForm.Item>

                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    <StyledForm.Item>
                        <SubmitButton
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            {loading ? '處理中...' : '確認重設密碼'}
                        </SubmitButton>
                    </StyledForm.Item>
                </StyledForm>
            </Card>
        </ResetPasswordContainer>
    );
};

export default ResetPassword;