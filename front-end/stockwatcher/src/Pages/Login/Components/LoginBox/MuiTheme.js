import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  overrides: {
    MuiTextField: {
      root: {
        margin: 15,
      },
    },
  },
});
