import React from "react";
import cn from "classnames";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";

import { Team } from "../../../types/player";

const TEAM_COLORS: Record<Team, string> = {
  [Team.BLUE]: blue[500],
  [Team.RED]: red[500],
};

type ScoresProps = WithStyles<typeof styles> & {
  className?: string;
  scores: Record<Team, number>;
};

type ProgressProps = {
  color: string;
  value: number;
  min: number;
  max: number;
  format: (value: number) => string;
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
    },
  });

const progressStyles = (theme: Theme) =>
  createStyles({
    root: { width: "100%" },
    text: {
      width: "100%",
      display: "grid",
      justifyContent: "end",
      marginBottom: theme.spacing(1),
    },
    progress: {
      width: "100%",
      height: "0.3em",
      position: "relative",
      marginBottom: theme.spacing(2),
      borderRadius: 2,
    },
    front: (props: ProgressProps) => ({
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: `${(100 * (props.value - props.min)) / (props.max - props.min)}%`,
      backgroundColor: props.color,
      borderRadius: "inherit",
    }),
    back: (props: ProgressProps) => ({
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      backgroundColor: props.color,
      opacity: "10%",
      borderRadius: "inherit",
    }),
  });

function Progress(props: ProgressProps): React.ReactElement {
  const classes = makeStyles(progressStyles)(props);
  const { value, format } = props;

  return (
    <div className={classes.root}>
      <div className={classes.text}>
        <span>{format(value)}</span>
      </div>
      <div className={classes.progress}>
        <div className={classes.back} />
        <div className={classes.front} />
      </div>
    </div>
  );
}

function Scores(props: ScoresProps): React.ReactElement {
  const { classes, className, scores } = props;

  console.log("scores = ", scores);

  const formatValue = (value: number): string => `${value * 100}%`;

  return (
    <div className={cn(classes.root, className)}>
      {Object.keys(scores)
        .sort((team) => (team === Team.BLUE ? 1 : -1))
        .map((team: Team) => (
          <Progress
            key={team}
            color={TEAM_COLORS[team]}
            value={scores[team]}
            min={0}
            max={1}
            format={formatValue}
          />
        ))}
    </div>
  );
}

export default withStyles(styles)(Scores);
