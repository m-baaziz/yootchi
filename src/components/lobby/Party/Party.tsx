import React from "react";
import cn from "classnames";
import { Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Grid, Button } from "@material-ui/core";
import { blue, red, green } from "@material-ui/core/colors";

import { Team, Player } from "../../../types/player";

import PlayerComponent from "./Player";
// import Chat from "./Chat";

const TEAM_COLORS: Record<Team, string> = {
  [Team.BLUE]: blue[500],
  [Team.RED]: red[500],
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "grid",
      gridTemplate:
        "  \
        '     .          .     .     .       .        ' 1em   \
        '  team-1        .     .     .   team-2       ' 1fr  \
        '     .          .     .     .       .        ' 1em   \
        '  add-player-1  .     .     .   add-player-2 ' auto  \
        '     .          .     .     .       .        ' 4em   \
        '     .          .   start   .       .        ' auto  \
        /    3fr        8em   2fr   8em     3fr               \
      ",
    },
    teamCommon: {
      [theme.breakpoints.up("lg")]: {
        height: 500,
      },
      [theme.breakpoints.down("lg")]: {
        height: 270,
      },
      overflow: "auto",
    },
    team1: { gridArea: "team-1" },
    team2: { gridArea: "team-2" },
    addPlayer1: { gridArea: "add-player-1" },
    addPlayer2: { gridArea: "add-player-2" },
    btnCommon: { height: "4em" },
    start: {
      gridArea: "start",
      backgroundColor: green.A400,
      color: theme.palette.text.primary,
      "&:hover": {
        backgroundColor: green.A200,
      },
    },
    playerGridItem: {},
  });

type PartyProps = WithStyles<typeof styles> & {
  className?: string;
  players: Player[];
  requestPlayer: (team: Team) => void;
};

function Party(props: PartyProps): React.ReactElement {
  const { classes, className, players, requestPlayer } = props;

  const handleAddAllyClick = (): void => {
    requestPlayer(Team.BLUE);
  };
  const handleAddOpponentClick = (): void => {
    requestPlayer(Team.RED);
  };
  const handleStartClick = (): void => {
    return;
  };

  return (
    <div className={cn(classes.root, className)}>
      <Grid
        container
        className={cn(classes.team1, classes.teamCommon)}
        spacing={3}
        justify="flex-start"
        alignContent="flex-start"
      >
        {players
          .filter((player) => player.team === Team.BLUE)
          .map((player) => (
            <Grid
              item
              key={player.user_id}
              classes={{ item: classes.playerGridItem }}
              xs={12}
            >
              <PlayerComponent
                player={player}
                color={TEAM_COLORS[player.team]}
              />
            </Grid>
          ))}
      </Grid>
      <Button
        className={cn(classes.addPlayer1, classes.btnCommon)}
        style={{
          color: TEAM_COLORS[Team.BLUE],
          borderColor: TEAM_COLORS[Team.BLUE],
        }}
        variant="outlined"
        onClick={handleAddAllyClick}
      >
        Add Teammate
      </Button>
      <Grid
        container
        className={cn(classes.team2, classes.teamCommon)}
        spacing={3}
        justify="flex-start"
        alignContent="flex-start"
      >
        {players
          .filter((player) => player.team === Team.RED)
          .map((player) => (
            <Grid
              item
              key={player.user_id}
              classes={{ item: classes.playerGridItem }}
              xs={12}
            >
              <PlayerComponent
                player={player}
                color={TEAM_COLORS[player.team]}
              />
            </Grid>
          ))}
      </Grid>
      <Button
        className={cn(classes.addPlayer2, classes.btnCommon)}
        style={{
          color: TEAM_COLORS[Team.RED],
          borderColor: TEAM_COLORS[Team.RED],
        }}
        variant="outlined"
        onClick={handleAddOpponentClick}
      >
        Add Opponent
      </Button>
      <Button
        className={cn(classes.start, classes.btnCommon)}
        variant="contained"
        onClick={handleStartClick}
      >
        Start
      </Button>
    </div>
  );
}

export default withStyles(styles)(Party);
