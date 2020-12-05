import { Form, Input, Button, Checkbox } from "antd";
import TextField from "@material-ui/core/TextField";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import React from "react";
import "./styles.css";

const CssTextField = withStyles({
  root: {
    color: "white",
    "& label.Mui-focused": {
      color: "white",
    },
    // "& .MuiInput-underline:after": {
    //   borderBottomColor: "white",
    // },
    "& .MuiOutlinedInput-root": {
      color: "white",
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
})(TextField);

const theme = createMuiTheme({
  overrides: {
    MuiTextField: {
      root: {
        margin: 15,
      },
    },
  },
});

const LoginBox = () => {
  const history = useHistory();
  // const classes = useStyles();
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page-login-box">
      <Form
        // {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          //   label="Username"
          //   name="username"
          //   rules={[{ required: true, message: "Please input your username!" }]}
          className={"login-page-login-box-item"}
        >
          <ThemeProvider theme={theme}>
            <CssTextField
              id="standard-basic"
              label="Username"
              InputLabelProps={{
                style: { color: "white" },
                shrink: true,
                disableAnimation: true,
              }}
              variant="outlined"
              color="primary"
              className={"login-page-login-box-input"}
              //   shrink="true"
              // className={classes.textField}
            />
          </ThemeProvider>
        </Form.Item>

        <Form.Item>
          <CssTextField
            id="standard-basic"
            label="Password"
            InputLabelProps={{
              style: { color: "white" },
              shrink: true,
              disableAnimation: true,
            }}
            variant="outlined"
            color="primary"
            className={"login-page-login-box-input"}
          />
        </Form.Item>
        {/* <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        {/* <Form.Item> */}
        {/* <div className="login-page-login-box-button"> */}
        <Button
          type="primary"
          block={true}
          className="login-page-login-box-button"
          onClick={() => {
            history.push("/main");
            console.log("coe");
          }}
        >
          Login
        </Button>
        {/* </div> */}
        {/* </Form.Item> */}
      </Form>
    </div>
  );
};

export default LoginBox;
