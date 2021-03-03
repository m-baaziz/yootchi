import React from "react";
import cn from "classnames";
import Image from "next/image";
import { Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, IconButton } from "@material-ui/core";
import { Height as Maximize, Minimize } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import { Skeleton } from "@material-ui/lab";

import { isLightTheme } from "../../theme";
import { Message } from "../../types/chat";
import { Player } from "../../types/player";

import Chat from "./Chat";

const AVATAR_SIZE = 65;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "grid",
      minHeight: 0,
      placeItems: "center",
      backgroundColor: isLightTheme(theme) ? grey[50] : grey[800],
      justifySelf: "end",
      alignSelf: "start",
      transition: `all 500ms ${theme.transitions.easing.easeInOut}`,
    },
    small: {
      gridTemplate: `  \
        '    .         avatar                       actions ' auto           \
        '    .         avatar                        chat   ' minmax(0, 1fr) \
        '    .         avatar                          .    ' 0.5em          \
        /    1em   minmax(${AVATAR_SIZE}px, auto)    1fr                     \
      `,
      ["@media (min-height:800px)"]: {
        width: "33%",
        height: "40%",
      },
      ["@media (max-height:799px)"]: {
        width: "35%",
        height: "52%",
      },
      borderTopLeftRadius: 50,
      borderBottomLeftRadius: 50,
    },
    big: {
      gridTemplate: ` \
        '   .      avatar                     actions   actions  ' auto           \
        '   .      avatar                      chat      chat    ' minmax(0, 1fr) \
        '   .      avatar                        .         .     ' 1em            \
        /  1em  minmax(${AVATAR_SIZE}px, auto)  1fr        1em                    \
      `,
      columnGap: "2em",
      width: "100%",
      height: "100%",
      borderRadius: 5,
    },
    topActions: {
      gridArea: "actions",
      justifySelf: "end",
    },
    avatar: {
      gridArea: "avatar",
    },
    chat: {
      gridArea: "chat",
      width: "100%",
      height: "100%",
    },
    maximizeIcon: { transform: "rotate(45deg)" },
    messagesContainer: { backgroundColor: "inherit" },
    inputContainer: {
      marginLeft: theme.spacing(1),
      marginRight: "0.5em",
      backgroundColor: "inherit",
    },
  });

type ResizableChatProps = WithStyles<typeof styles> & { className?: string };

function ResizableChat(props: ResizableChatProps): React.ReactElement {
  const { className, classes } = props;
  const [small, setSmall] = React.useState<boolean>(true);
  const [lastPlayer, setLastPlayer] = React.useState<Player | undefined>(
    undefined
  );

  const handleResize = () => {
    setSmall(!small);
  };

  const handleNewMessage = (message: Message): void => {
    setLastPlayer(message.player);
  };

  return (
    <div
      className={cn(
        classes.root,
        className,
        small ? classes.small : classes.big
      )}
    >
      <div className={classes.topActions}>
        <IconButton
          aria-label="resize"
          onClick={handleResize}
          size="small"
          color="inherit"
        >
          {small ? (
            <Maximize className={classes.maximizeIcon} fontSize="small" />
          ) : (
            <Minimize viewBox="0 5 25 25" fontSize="small" />
          )}
        </IconButton>
      </div>
      <div className={classes.avatar}>
        {lastPlayer ? (
          <Image
            src={lastPlayer.avatar_url}
            alt={`${lastPlayer.user_id}-avatar`}
            width={AVATAR_SIZE}
            height={AVATAR_SIZE}
          />
        ) : (
          <Skeleton
            variant="circle"
            animation={false}
            width={AVATAR_SIZE}
            height={AVATAR_SIZE}
          />
        )}
      </div>
      <Chat
        className={classes.chat}
        onNewMessage={handleNewMessage}
        withTimestamp={!small}
        classes={{
          inputContainer: classes.inputContainer,
          messagesContainer: classes.messagesContainer,
        }}
        inputProps={{
          variant: "standard",
        }}
      />
    </div>
  );
}

export default withStyles(styles)(ResizableChat);
