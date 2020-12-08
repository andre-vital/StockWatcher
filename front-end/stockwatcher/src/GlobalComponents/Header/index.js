import React from "react";
import "./styles.css";

const Header = ({ children }) => {
  return (
    <div className="header-wrapper">
      <div className="header-left-container" />
      <div className="header-middle-container" />
      <div className="header-right-container">{children}</div>
    </div>
  );
};

export default Header;
