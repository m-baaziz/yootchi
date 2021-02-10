import React from "react";
import Head from "next/head";
import {
  Theme,
  withStyles,
  WithStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, Box } from "@material-ui/core";

import myTheme from "../theme";
import AppContext from "../context";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      minHeight: "100vh",
      padding: "0 0.5rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    main: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
  });

type LayoutProps = WithStyles<typeof styles>;

function Layout(
  props: React.PropsWithChildren<LayoutProps>
): React.ReactElement {
  const { children, classes } = props;
  const { theme } = React.useContext(AppContext);

  return (
    <>
      <Head>
        <title>Yootchi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={myTheme(theme)}>
        <CssBaseline />
        <div className={classes.container}>
          <main className={classes.main}>{children}</main>
        </div>
      </ThemeProvider>
    </>
  );
}

export default withStyles(styles)(Layout);
