import React, { useState } from "react";
import "./styles.css";
import loginBackground from "../../assets/images/loginBackground.jpeg";
import LoginBox from "./Components/LoginBox/index";
import SignupBox from "./Components/Signup";
import logo from "../../assets/images/logo.png";

const LoginPage = () => {
  const [switchTo, setSwitchTo] = useState(false);

  return (
    <div className="login-page-wrapper">
      <div className="login-page-title-container">
        <div className="login-page-title">
          <img className="login-main-logo" src={logo} alt="logo" />
        </div>
      </div>
      {switchTo ? (
        <SignupBox setSwitch={setSwitchTo} />
      ) : (
        <LoginBox setSwitch={setSwitchTo} />
      )}
      <img className="login-main-image" src={loginBackground} alt="pic" />
    </div>
  );
};

export default LoginPage;
