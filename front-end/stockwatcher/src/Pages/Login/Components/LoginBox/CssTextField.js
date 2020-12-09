import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

export const CssTextField = withStyles({
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
