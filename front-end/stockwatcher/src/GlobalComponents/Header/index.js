import { Paper } from "@material-ui/core";
import React from "react";
import "./styles.css";

const Header = ({ children }) => {
  return (
    <Paper elevation={5}>
      <div className="header-wrapper">
        <div className="header-left-container" />
        <div className="header-middle-container" />
        <div className="header-right-container">{children}</div>
      </div>
    </Paper>
  );
};

export default Header;
