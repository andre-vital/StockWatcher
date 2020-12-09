import { Form } from "antd";
import { ThemeProvider } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import "./styles.css";
import { CssTextField } from "./CssTextField";
import { theme } from "./MuiTheme";
import { Button } from "@material-ui/core";
import attemptLogin from "../../Requests/attemptLogin";

const LoginBox = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const inputProps = {
    style: { color: "white" },
    shrink: true,
    disableAnimation: true,
  };
  async function handleLogin() {
    const result = await attemptLogin(userData);
    console.log({ result });
    if (result) {
      history.push("/main");
    }
  }

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="login-page-login-box">
      <ThemeProvider theme={theme}>
        <CssTextField
          id="standard-basic"
          label="Username"
          name="username"
          InputLabelProps={inputProps}
          variant="outlined"
          color="primary"
          onChange={handleChange}
          className={"login-page-login-box-input"}
        />
      </ThemeProvider>
      <CssTextField
        id="standard-basic"
        label="Password"
        name="password"
        InputLabelProps={inputProps}
        variant="outlined"
        color="primary"
        onChange={handleChange}
        className={"login-page-login-box-input"}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          handleLogin();
        }}
      >
        Login
      </Button>
    </div>
  );
};

export default LoginBox;
