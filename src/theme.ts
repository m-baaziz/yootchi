import { createMuiTheme, Theme } from "@material-ui/core/styles";
import { grey, deepPurple } from "@material-ui/core/colors";
import { ThemePreference } from "./types/theme-preference";

const theme = (themePreference: ThemePreference): Theme =>
  createMuiTheme({
    palette: {
      background: {
        default: themePreference === "light" ? grey[50] : grey[900],
      },
      text: {
        primary: themePreference === "light" ? grey[900] : grey[50],
      },
      primary: {
        light: grey[50],
        main: grey[900],
        dark: grey[900],
      },
      secondary: {
        light: deepPurple[100],
        main: deepPurple[400],
        dark: deepPurple[400],
      },
    },
  });

export default theme;
