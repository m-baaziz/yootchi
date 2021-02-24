import React from "react";
import cn from "classnames";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core";

import { Team } from "../../../types/player";

const styles = () => createStyles({ root: {} });

type ScoresProps = WithStyles<typeof styles> & {
  className?: string;
  scores: Record<Team, number>;
};

function Scores(props: ScoresProps): React.ReactElement {
  const { classes, className, scores } = props;

  console.log("scores = ", scores);

  return <div className={cn(classes.root, className)}>Scores</div>;
}

export default withStyles(styles)(Scores);
