import React from "react";
import Head from "next/head";
import {
  withStyles,
  WithStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles } from "@material-ui/core";

import GameController from "../game/GameController";
import Headbar from "./Headbar";

import myTheme from "../../theme";
import AppContext from "../../contexts/app-context";

const styles = () =>
  createStyles({
    container: {
      minHeight: "100vh",
      padding: "0 0.5rem",
      display: "grid",
      gridTemplate:
        "  \
        ' header '  auto   \
        ' main   '   1fr  \
        / 1fr \
      ",
    },
    header: {
      gridArea: "header",
    },
    main: {
      gridArea: "main",
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
        <GameController>
          <div className={classes.container}>
            <Headbar className={classes.header} />
            <main className={classes.main}>{children}</main>
          </div>
        </GameController>
      </ThemeProvider>
    </>
  );
}

export default withStyles(styles)(Layout);
