import { Modal } from "@material-ui/core";

const StatelessModal = ({ children, state }) => {
  const { visible, hide } = state;
  return (
    <Modal
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={visible}
      onClose={hide}
    >
      <>{children}</>
    </Modal>
  );
};

export default StatelessModal;
