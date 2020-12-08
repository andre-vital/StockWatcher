import React from "react";
import ModalDisclosure from "./ModalDisclosure";
import StatelessModal from "./StatelessModal";
import useModalState from "./useModalState";

const StatefulModal = ({ children, disclosure }) => {
  const modalState = useModalState();

  return (
    <>
      <ModalDisclosure state={modalState}>{disclosure}</ModalDisclosure>
      <StatelessModal state={modalState}>
        <>{children}</>
      </StatelessModal>
    </>
  );
};
export default StatefulModal;
