// src/components/ui/Form.jsx

import styled from 'styled-components';
import { Form } from 'antd';

export const StyledForm = styled(Form)`
  .ant-form-item-explain-error {
    color: ${props => props.theme.colorError};
  }
  .ant-input::placeholder,
  .ant-input-password input::placeholder {
    color: ${props => props.theme.colorText} !important;
    opacity: 0.6;
  }
  .ant-input,
  .ant-input-password input,
  .ant-input-outlined {
    border-color: ${props => props.theme.borderColor} !important;
  }
`;

export default StyledForm;