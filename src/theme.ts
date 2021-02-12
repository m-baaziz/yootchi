import { createMuiTheme, Theme } from "@material-ui/core/styles";
import { grey, cyan, deepPurple } from "@material-ui/core/colors";
import { ThemePreference } from "./types/theme-preference";

const theme = (themePreference: ThemePreference): Theme =>
  createMuiTheme({
    palette: {
      background: {
        default: themePreference === "light" ? "white" : grey[900],
      },
      text: {
        primary: themePreference === "light" ? grey[900] : grey[50],
      },
      primary: {
        main: deepPurple[600],
      },
      secondary: {
        main: cyan[500],
      },
    },
  });

export default theme;
