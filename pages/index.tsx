import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    root: {},
  });

type HomeProps = WithStyles<typeof styles> & {
  stage: string;
};

function Home(props: HomeProps): React.ReactElement {
  const { classes, stage } = props;

  return (
    <div className={classes.root}>
      <Head>
        <title>Yootchi ({stage})</title>
      </Head>
      Hello World
    </div>
  );
}

export default withStyles(styles)(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      stage: process.env["STAGE"] || "prod",
      classes: null,
    },
  };
};
