import { Select } from "antd";
import styled from "styled-components";

const StyledSelect = styled(Select)`
  width: 120px;

  .ant-select-selector {
    border-color: ${props => props.theme.colorBgBoarder} !important; // 新增：邊框顏色跟隨文字顏色
    }

  .ant-select-selection-item {
    color: ${props => props.theme.colorText} !important;
  }

  .ant-select-arrow {
    color: ${props => props.theme.colorText};
  }
  
  .ant-select-item {
    &:hover {
      background-color: ${props => props.theme.colorBgTextHover};
    }
  }
`;

export default StyledSelect;