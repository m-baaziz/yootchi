import React from "react";
import cn from "classnames";
import format from "date-fns/format";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core";

import { Message } from "../../types/chat";

const styles = () =>
  createStyles({
    root: {
      width: "100%",
    },
    grid: {
      display: "grid",
      gridTemplate:
        "  \
        ' username  .  message  .  date  ' auto  \
        /   auto   1em   1fr   1em auto          \
      ",
      justifyContent: "start",
      alignItems: "start",
    },
    username: { gridArea: "username" },
    message: { gridArea: "message", wordBreak: "break-word" },
    date: { gridArea: "date" },
  });

type MessageProps = WithStyles<typeof styles> & {
  className?: string;
  message: Message;
  withTimestamp?: boolean;
};

function MessageComponent(props: MessageProps): React.ReactElement {
  const {
    classes,
    className,
    message: { player, text, date },
    withTimestamp = true,
  } = props;

  return (
    <div className={cn(classes.root, className)}>
      <div className={classes.grid}>
        <div className={classes.username}>{player.username}:</div>
        <div className={classes.message}>{text}</div>
        {withTimestamp ? (
          <div className={classes.date}>{format(date, "HH:mm:ss")}</div>
        ) : null}
      </div>
    </div>
  );
}

export default withStyles(styles)(MessageComponent);
