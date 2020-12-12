import React, { useState } from "react";
import "./styles.css";
import TextField from "../../../../GlobalComponents/TextField";
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
      <div style={{ margin: 15 }}>
        <TextField onChange={handleChange} label="Name" name="name" />
      </div>
      <div style={{ margin: 15 }}>
        <TextField onChange={handleChange} label="Username" name="username" />
      </div>
      <div style={{ margin: 15 }}>
        <TextField
          onChange={handleChange}
          type="password"
          label="Password"
          name="password"
        />
      </div>
      <div style={{ margin: 15 }}>
        <TextField onChange={handleChange} label="E-mail" name="email" />
      </div>
      <div
        style={{
          marginTop: 15,
          marginBottom: 15,
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
