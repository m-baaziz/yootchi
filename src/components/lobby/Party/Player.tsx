import React from "react";
import Image from "next/image";
import cn from "classnames";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Button } from "@material-ui/core";

import { Player } from "../../../types/player";

const styles = () =>
  createStyles({
    root: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    },
    avatar: {},
    labelContainer: {},
    label: {},
    flag: {},
  });

const AVATAR_SIZE = 65;

type PlayerComponentProps = WithStyles<typeof styles> & {
  className?: string;
  player: Player;
  color: string;
};

function PlayerComponent(props: PlayerComponentProps): React.ReactElement {
  const { classes, className, player, color } = props;

  const handleOnClick = (): void => {
    console.log("On player click: ", player);
  };

  return (
    <Button
      className={cn(classes.root, className)}
      classes={{
        startIcon: classes.avatar,
        label: classes.labelContainer,
      }}
      style={{
        backgroundColor: color,
      }}
      variant="contained"
      startIcon={
        player.avatar_url ? (
          <Image
            src={player.avatar_url}
            alt={`${player.user_id}-avatar`}
            width={AVATAR_SIZE}
            height={AVATAR_SIZE}
          />
        ) : null
      }
      onClick={handleOnClick}
    >
      <span className={classes.label}>{player.username}</span>
      {player.language_info.flag_url ? (
        <Image
          className={classes.flag}
          src={player.language_info.flag_url}
          alt={`${player.user_id}-flag`}
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
        />
      ) : (
        <div className={classes.flag} />
      )}
    </Button>
  );
}

export default withStyles(styles)(PlayerComponent);
