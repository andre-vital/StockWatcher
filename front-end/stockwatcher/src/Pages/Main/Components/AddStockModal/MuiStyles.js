import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(3),
  },
  overrides: {
    MuiTextField: {
      root: {
        margin: 5,
      },
    },
  },
}));
