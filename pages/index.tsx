import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Button } from "@material-ui/core";

const styles = () =>
  createStyles({
    root: { height: "100%", display: "flex" },
    content: { margin: "auto" },
  });

type HomeProps = WithStyles<typeof styles> & {
  stage: string;
};

function Home(props: HomeProps): React.ReactElement {
  const { classes, stage } = props;

  return (
    <>
      <Head>
        <title>Yootchi ({stage})</title>
      </Head>
      <div className={classes.root}>
        <div className={classes.content}>
          <Link href="/play">
            <Button variant="outlined" color="primary">
              Play Now
            </Button>
          </Link>
        </div>
      </div>
    </>
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
