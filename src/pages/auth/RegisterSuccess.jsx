import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: ${props => props.theme.colorBgContainer};
  color: ${props => props.theme.colorText};
`;

const SuccessCard = styled.div`
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

const CountdownText = styled(StyledParagraph)`
  && {
    color: ${props => props.theme.colorTextSecondary};
    font-size: 14px;
    margin-top: 16px;
    margin-bottom: 0;
  }
`;

const RegisterSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
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
  }, [navigate]);

  return (
    <SuccessContainer>
      <SuccessCard>
        <StyledTitle level={2}>註冊成功！</StyledTitle>
        <StyledParagraph>
          請前往您的 Email，點擊驗證連結以啟用帳戶
        </StyledParagraph>
        <StyledParagraph>
          若沒有收到郵件，請檢查垃圾郵件匣！！
        </StyledParagraph>
        <CountdownText>
          {countdown} 秒後將自動返回登入頁面
        </CountdownText>
      </SuccessCard>
    </SuccessContainer>
  );
};

export default RegisterSuccess;