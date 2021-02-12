import React from "react";
import Link from "next/link";
import cn from "classnames";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, IconButton } from "@material-ui/core";
import {
  Widgets as WidgetsIcon,
  List as ListIcon,
  MoreHoriz as MoreIcon,
} from "@material-ui/icons";

import GameContext from "../../contexts/game-context";

const styles = () =>
  createStyles({
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    menuIconContainer: { margin: "auto", marginLeft: 0 },
    moreIconContainer: { margin: "auto", marginRight: 0 },
    icon: { color: "inherit" },
    title: { cursor: "pointer", margin: "auto" },
  });

type HeadbarProps = WithStyles<typeof styles> & {
  className?: string;
};

function Headbar(props: HeadbarProps): React.ReactElement {
  const { classes, className } = props;
  const { game } = React.useContext(GameContext);

  return (
    <div className={cn(classes.root, className)}>
      <div className={classes.menuIconContainer}>
        <IconButton className={classes.icon}>
          {game ? <WidgetsIcon /> : <ListIcon />}
        </IconButton>
      </div>
      <Link href="/">
        <h2 className={classes.title}>Yootchi</h2>
      </Link>
      <div className={classes.moreIconContainer}>
        <IconButton className={classes.icon}>
          <MoreIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default withStyles(styles)(Headbar);
