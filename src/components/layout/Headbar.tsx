import React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core";
import { Widgets as WidgetsIcon, List as ListIcon } from "@material-ui/icons";

import GameContext from "../../contexts/game-context";

const styles = () =>
  createStyles({
    root: {},
  });

type HeadbarProps = WithStyles<typeof styles>;

function Headbar(props: HeadbarProps): React.ReactElement {
  const { classes } = props;
  const { game } = React.useContext(GameContext);

  React.useEffect(() => {
    console.log("game: ", game);
  }, [game]);

  return (
    <div className={classes.root}>
      {game ? <WidgetsIcon /> : <ListIcon />}
      Headbar
    </div>
  );
}

export default withStyles(styles)(Headbar);
