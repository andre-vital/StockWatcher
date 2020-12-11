import { IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";

const Logout = () => {
  const history = useHistory();
  const handleClick = () => {
    localStorage.setItem("token", "");
    history.push("/");
  };

  return (
    <IconButton onClick={handleClick}>
      <ExitToAppIcon style={{ fill: "white" }} />
    </IconButton>
  );
};

export default Logout;
