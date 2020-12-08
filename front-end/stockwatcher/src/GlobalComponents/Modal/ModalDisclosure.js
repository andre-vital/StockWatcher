import React from "react";
import { IconButton } from "@material-ui/core/";

const ModalDisclosure = ({ children, state }) => {
  return <IconButton onClick={state.show}>{children}</IconButton>;
};

export default ModalDisclosure;
