import React from "react";
import logo from "../../assets/images/logo.png";
import "./styles.css";

const Header = ({ children }) => {
  return (
    // <Paper elevation={5}>
    <div className="header-wrapper">
      <div className="header-left-container">
        <img className="main-header-logo" src={logo} alt="logo" />
        <div className="main-page-title">StockWatcher</div>
      </div>
      <div className="header-middle-container" />
      <div className="header-right-container">{children}</div>
    </div>
    // </Paper>
  );
};

export default Header;
