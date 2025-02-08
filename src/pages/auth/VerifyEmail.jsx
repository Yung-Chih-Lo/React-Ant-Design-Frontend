// src/pages/VerifyEmail.jsx

import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyEmailAsync } from '../../features/auth/authSlice';
import styled from 'styled-components';
import { Typography, Spin } from 'antd';

const { Title, Paragraph } = Typography;

const VerifyEmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: ${props => props.theme.colorBgContainer};
  color: ${props => props.theme.colorText};
`;

const VerifyEmailCard = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  background-color: ${props => props.theme.colorBgBase};
  border: 1px solid ${props => props.theme.borderColor};
  text-align: center;
`;

const StyledTitle = styled(Title)`
  && {
    color: ${props => props.theme.colorPrimary};
    margin-bottom: 24px;
  }
`;

const StyledParagraph = styled(Paragraph)`
  && {
    color: ${props => props.theme.colorText};
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 32px;
  }
`;

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState('驗證中，請稍候...');
    const [loading, setLoading] = useState(true);
    const [countdown, setCountdown] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // 導入 useNavigate

    useEffect(() => {
        const token = searchParams.get("token");
        if (!token) {
            setMessage("無效的驗證請求");
            setLoading(false);
            return;
        }

        dispatch(verifyEmailAsync(token))
            .unwrap()
            .then(response => {
                setMessage(response.message);
                setLoading(false);
                setCountdown(5); // 驗證成功時才設置倒數計時
                // 開始倒數計時
                const timer = setInterval(() => {
                    setCountdown((prev) => {
                        if (prev <= 1) {
                            clearInterval(timer);
                            navigate('/login');
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);

                return () => clearInterval(timer);
            })
            .catch(error => {
                setMessage(error?.message || "驗證失敗，請重試");
                setLoading(false);
            });
    }, [searchParams, dispatch, navigate]);

    return (
        <VerifyEmailContainer>
            <VerifyEmailCard>
                <StyledTitle level={2}>
                    {loading ? <Spin size="large" /> : "驗證信箱"}
                </StyledTitle>
                <StyledParagraph>
                    {message}
                    {!loading && countdown !== null && countdown > 0 && (
                        <div>{countdown} 秒後將自動前往登入頁面</div>
                    )}
                </StyledParagraph>
            </VerifyEmailCard>
        </VerifyEmailContainer>
    );
};

export default VerifyEmail;