import React from "react";
import cn from "classnames";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core";

const styles = () =>
  createStyles({
    root: {},
  });

type ChatProps = WithStyles<typeof styles> & {
  className?: string;
};

function Chat(props: ChatProps): React.ReactElement {
  const { classes, className } = props;

  return <div className={cn(classes.root, className)}>Chat</div>;
}

export default withStyles(styles)(Chat);
