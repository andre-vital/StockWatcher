import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import "./styles.css";
import TextField from "../../../../GlobalComponents/TextField";
import { Button } from "@material-ui/core";
import attemptLogin from "../../Requests/attemptLogin";

const LoginBox = ({ setSwitch }) => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  async function handleLogin() {
    const result = await attemptLogin(userData);
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
      <div style={{ margin: 30 }}>
        <TextField onChange={handleChange} label="Username" name="username" />
      </div>
      <div style={{ marginBottom: 20 }}>
        <TextField
          onChange={handleChange}
          type="password"
          label="Password"
          name="password"
        />
      </div>
      <div style={{ marginBottom: 10 }}>
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
      <div style={{ color: "white", margin: 5 }}>Não possui conta?</div>
      <div style={{ padding: 5 }}>
        <Button color="secondary" onClick={() => setSwitch(true)}>
          Cadastre-se
        </Button>
      </div>
    </div>
  );
};

export default LoginBox;
