// 模態視窗
import React from "react";
import { Modal as AntModal } from "antd";
import styled from "styled-components";

const ModalContainer = styled.div`
  padding: 16px;
`;

const ModalSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CustomModal = ({ title, open, onClose, children }) => {
  return (
    <AntModal
      title={title}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <ModalContainer>
        <ModalSection>
          {children}
        </ModalSection>
      </ModalContainer>
    </AntModal>
  );
};

export default CustomModal;