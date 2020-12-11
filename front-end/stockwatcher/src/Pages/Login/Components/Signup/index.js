import { ThemeProvider } from "@material-ui/styles";
import React, { useState } from "react";
import "./styles.css";
import { CssTextField } from "./CssTextField";
import { theme } from "./MuiTheme";
import { Button } from "@material-ui/core";
import attemptSignup from "../../Requests/attemptSignup";

const SignupBox = ({ setSwitch }) => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
  });

  async function handleSignup() {
    const message = await attemptSignup(userData);
    if (message === "Created User") {
      setSwitch(false);
    }
  }

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const inputProps = {
    style: { color: "white" },
    shrink: true,
    disableAnimation: true,
  };

  const textFieldProps = {
    variant: "outlined",
    color: "primary",
    onChange: handleChange,
    className: "login-page-login-box-input",
    id: "standard-basic",
    InputLabelProps: inputProps,
  };

  return (
    <div className="login-page-signup-box">
      <ThemeProvider theme={theme}>
        <CssTextField {...textFieldProps} label="Name" name="name" />
      </ThemeProvider>
      <CssTextField {...textFieldProps} label="Username" name="username" />
      <CssTextField {...textFieldProps} label="Password" name="password" />
      <CssTextField {...textFieldProps} label="E-mail" name="email" />
      <div style={{ marginBottom: 10 }}>
        <Button variant="contained" color="secondary" onClick={handleSignup}>
          Cadastrar
        </Button>
      </div>
    </div>
  );
};

export default SignupBox;
