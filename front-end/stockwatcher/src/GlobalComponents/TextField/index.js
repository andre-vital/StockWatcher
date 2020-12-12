import TextFieldBase from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

export const CssTextField = withStyles({
  root: {
    color: "white",
    "& label.Mui-focused": {
      color: "white",
    },
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
})(TextFieldBase);

const TEXT_FIELD_PROPS = {
  variant: "outlined",
  color: "primary",
  className: "login-page-login-box-input",
  InputLabelProps: {
    style: { color: "white" },
    shrink: true,
    disableAnimation: true,
  },
};

const TextField = (props) => {
  return <CssTextField id={props.name} {...TEXT_FIELD_PROPS} {...props} />;
};

export default TextField;
