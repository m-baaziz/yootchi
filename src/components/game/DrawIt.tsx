import React from "react";
import cn from "classnames";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core";

const styles = () =>
  createStyles({
    root: {},
  });

type DrawItProps = WithStyles<typeof styles> & {
  className?: string;
};

function DrawIt(props: DrawItProps): React.ReactElement {
  const { classes, className } = props;

  return <div className={cn(classes.root, className)}>DrawIt Game</div>;
}

export default withStyles(styles)(DrawIt);
