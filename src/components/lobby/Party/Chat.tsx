import React from "react";
import cn from "classnames";
import format from "date-fns/format";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Theme, TextField, makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

import GameContext from "../../../contexts/game-context";
import { isLightTheme } from "../../../theme";
import { Message } from "../../../types/chat";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up("lg")]: {
        height: 250,
      },
      [theme.breakpoints.down("lg")]: {
        height: 180,
      },
      display: "grid",
      gridTemplate:
        "  \
        '  messages  ' 6fr  \
        '   input    ' 1fr  \
        /   1fr            \
      ",
    },
    messagesContainer: {
      gridArea: "messages",
      backgroundColor: isLightTheme(theme) ? grey[100] : grey[800],
      borderTopRightRadius: 10,
      overflow: "auto",
      padding: "1em",
    },
    inputContainer: {
      gridArea: "input",
      backgroundColor: isLightTheme(theme) ? grey[100] : grey[800],
      opacity: "40%",
    },
    input: {
      paddingTop: "0.5em",
      paddingBottom: "0.5em",
    },
  });

const messageStyles = () =>
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

type ChatProps = WithStyles<typeof styles> & {
  className?: string;
};

type MessageProps = {
  className?: string;
  message: Message;
};

function MessageComponent(props: MessageProps): React.ReactElement {
  const classes = makeStyles(messageStyles)();
  const {
    className,
    message: { player, text, date },
  } = props;

  return (
    <div className={cn(classes.root, className)}>
      <div className={classes.grid}>
        <div className={classes.username}>{player.username}:</div>
        <div className={classes.message}>{text}</div>
        <div className={classes.date}>{format(date, "HH:mm:ss")}</div>
      </div>
    </div>
  );
}

function Chat(props: ChatProps): React.ReactElement {
  const { classes, className } = props;
  const { messages, sendMessage } = React.useContext(GameContext);

  const inputRef = React.useRef<HTMLInputElement>();
  const endChatRef = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [inputRef]);

  React.useEffect(() => {
    endChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [endChatRef, messages]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      const value = inputRef.current?.value;
      if (value) {
        sendMessage(value);
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div className={cn(classes.root, className)}>
      <div className={classes.messagesContainer}>
        {messages.map((message) => (
          <MessageComponent key={message.date.getTime()} message={message} />
        ))}
        <div ref={endChatRef} />
      </div>
      <TextField
        id="chat-input"
        inputRef={inputRef}
        variant="outlined"
        className={classes.inputContainer}
        inputProps={{
          className: classes.input,
          autoComplete: "off",
        }}
        color="secondary"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default withStyles(styles)(Chat);
