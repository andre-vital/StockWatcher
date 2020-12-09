import React from "react";
import "./styles.css";
import loginBackground from "../../assets/images/loginBackground.jpeg";
import LoginBox from "./Components/LoginBox/index";

const LoginPage = () => (
  <div className="login-page-wrapper">
    <div className="login-page-title-container">
      <div className="login-page-title">StockWatcher</div>
    </div>
    <LoginBox />
    <img className="login-main-image" src={loginBackground} alt="pic" />
  </div>
);

export default LoginPage;
