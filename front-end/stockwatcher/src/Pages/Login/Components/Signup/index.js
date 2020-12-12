import { ThemeProvider } from "@material-ui/styles";
import React, { useState } from "react";
import "./styles.css";
import TextField, { theme } from "../../../../GlobalComponents/TextField";
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

  return (
    <div className="login-page-signup-box">
      <ThemeProvider theme={theme}>
        <TextField onChange={handleChange} label="Name" name="name" />
      </ThemeProvider>
      <TextField onChange={handleChange} label="Username" name="username" />
      <TextField
        onChange={handleChange}
        type="password"
        label="Password"
        name="password"
      />
      <TextField onChange={handleChange} label="E-mail" name="email" />
      <div
        style={{
          marginBottom: 10,
          justifyContent: "space-between",
          width: "80%",
          display: "flex",
        }}
      >
        <Button color="secondary" onClick={() => setSwitch(false)}>
          Voltar
        </Button>
        <Button variant="contained" color="secondary" onClick={handleSignup}>
          Cadastrar
        </Button>
      </div>
    </div>
  );
};

export default SignupBox;
