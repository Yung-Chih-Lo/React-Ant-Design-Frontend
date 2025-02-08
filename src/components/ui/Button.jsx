// 按鈕
import styled from 'styled-components';

// 基礎按鈕樣式
export const BaseButton = styled.div`
  padding: 12px 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
  border-radius: 6px;
  
  &:hover {
    background-color: ${props => props.theme.colorSecondary || '#b7773c40'};
  }
  
  & > span {
    margin-left: 10px;
  }
`;

// 危險按鈕樣式（例如登出按鈕）
export const DangerButton = styled(BaseButton)`
  &:hover {
    background-color: #ff4d4f !important;
    color: ${props => props.theme.colorText || '#1f1f1f'};
  }
`;

// Dropdown 項目樣式
export const DropdownButton = styled(BaseButton)`
  padding: 12px 24px;
  width: 100%;
`;

export default {
  BaseButton,
  DangerButton,
  DropdownButton
};