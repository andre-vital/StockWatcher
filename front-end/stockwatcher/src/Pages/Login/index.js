import React from "react";
import "./styles.css";
import loginBackground from "../../assets/images/loginBackground.jpeg";
import LoginBox from "./Components/LoginBox/index";

const LoginPage = () => (
  <div className="login-page-wrapper">
    <img className="login-main-image" src={loginBackground} alt="pic" />
    <LoginBox />
  </div>
);

export default LoginPage;
