// src/components/Settings.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BulbOutlined, GlobalOutlined } from "@ant-design/icons";
import { toggleTheme } from "../../features/theme/themeSlice";
import styled from "styled-components";
import CustomModal from "../../components/ui/Modal";
import StyledSelect from "../../components/ui/Select";

const SettingsItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SettingsLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Settings = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode); // 使用 useSelector 來取得 theme 的狀態

  const languageOptions = [
    { value: "zh_TW", label: "繁體中文" },
    { value: "en", label: "English" },
  ];

  const themeOptions = [
    { value: "light", label: "淺色模式" },
    { value: "dark", label: "深色模式" },
  ];

  return (
    <CustomModal
      title="系統設定"
      open={open}
      onClose={onClose}
    >
      <SettingsItem>
        <SettingsLabel>
          <GlobalOutlined />
          <span>語言設定</span>
        </SettingsLabel>
        <StyledSelect defaultValue="zh_TW" options={languageOptions} />
      </SettingsItem>

      <SettingsItem>
        <SettingsLabel>
          <BulbOutlined />
          <span>主題設定</span>
        </SettingsLabel>
        <StyledSelect
          value={theme}
          onChange={(value) => dispatch(toggleTheme())}
          options={themeOptions}
        />
      </SettingsItem>
    </CustomModal>
  );
};

export default Settings;
