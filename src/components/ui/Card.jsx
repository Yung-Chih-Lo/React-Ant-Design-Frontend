// src/components/ui/Card.jsx
import styled from 'styled-components';

export const Card = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  background-color: ${props => props.theme.colorBgBase};
`;

export default Card;