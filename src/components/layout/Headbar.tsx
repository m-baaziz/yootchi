import React from "react";
import Link from "next/link";
import cn from "classnames";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, IconButton, Button } from "@material-ui/core";
import { Widgets as WidgetsIcon, List as ListIcon } from "@material-ui/icons";

import GameContext from "../../contexts/game-context";

import { useUser } from "../../hooks/user";

const styles = () =>
  createStyles({
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    common: {
      margin: "auto",
    },
    menuIconContainer: { marginLeft: 0 },
    actionsContainer: {
      display: "flex",
      flexDirection: "row",
      marginRight: 0,
    },
    icon: { color: "inherit" },
    title: { cursor: "pointer" },
  });

type HeadbarProps = WithStyles<typeof styles> & {
  className?: string;
};

function Headbar(props: HeadbarProps): React.ReactElement {
  const { classes, className } = props;
  const { game } = React.useContext(GameContext);
  const { user, signOut } = useUser();

  console.log(user);

  const handleLogOut = async () => {
    try {
      await signOut();
      console.log("logged out");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={cn(classes.root, className)}>
      <div className={cn(classes.common, classes.menuIconContainer)}>
        <IconButton className={classes.icon}>
          {game ? <WidgetsIcon /> : <ListIcon />}
        </IconButton>
      </div>
      <Link href="/">
        <h2 className={cn(classes.common, classes.title)}>Yootchi</h2>
      </Link>
      <div className={cn(classes.common, classes.actionsContainer)}>
        {!user ? (
          <Link href="/signin">
            <Button
              className={classes.common}
              variant="outlined"
              size="small"
              color="primary"
            >
              Login
            </Button>
          </Link>
        ) : (
          <Button
            className={classes.common}
            variant="outlined"
            size="small"
            color="primary"
            onClick={handleLogOut}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
}

export default withStyles(styles)(Headbar);
