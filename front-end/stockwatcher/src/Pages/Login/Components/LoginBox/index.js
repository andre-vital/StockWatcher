import { Form, Button } from "antd";
import { ThemeProvider } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import "./styles.css";
import { CssTextField } from "./CssTextField";
import { theme } from "./MuiTheme";
import attemptLogin from "../../Requests/attemptLogin";

const LoginBox = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const onFinish = (values) => {
    console.log("Success:", values);
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

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page-login-box">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item className={"login-page-login-box-item"}>
          <ThemeProvider theme={theme}>
            <CssTextField
              id="standard-basic"
              label="Username"
              name="username"
              InputLabelProps={{
                style: { color: "white" },
                shrink: true,
                disableAnimation: true,
              }}
              variant="outlined"
              color="primary"
              onChange={handleChange}
              className={"login-page-login-box-input"}
            />
          </ThemeProvider>
        </Form.Item>

        <Form.Item>
          <CssTextField
            id="standard-basic"
            label="Password"
            name="password"
            InputLabelProps={{
              style: { color: "white" },
              shrink: true,
              disableAnimation: true,
            }}
            variant="outlined"
            color="primary"
            onChange={handleChange}
            className={"login-page-login-box-input"}
          />
        </Form.Item>
        <Button
          type="primary"
          block={true}
          className="login-page-login-box-button"
          onClick={() => {
            handleLogin();
          }}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginBox;
