import React from "react";
import cn from "classnames";
import last from "lodash/last";
import { Key } from "ts-key-enum";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import {
  createStyles,
  Theme,
  TextField,
  TextFieldProps,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

import GameContext from "../../contexts/game-context";
import { isLightTheme } from "../../theme";
import { Message } from "../../types/chat";

import MessageComponent from "./Message";

const styles = (theme: Theme) =>
  createStyles({
    root: {
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

type ChatClasses = {
  messagesContainer?: string;
  inputContainer?: string;
  input?: string;
};

type ChatProps = WithStyles<typeof styles> & {
  className?: string;
  onNewMessage?: (message: Message) => void;
  withTimestamp?: boolean;
  classes?: ChatClasses;
  inputProps?: TextFieldProps;
};

function Chat(props: ChatProps): React.ReactElement {
  const {
    classes,
    className,
    onNewMessage,
    withTimestamp = true,
    inputProps = {},
  } = props;
  const { messages, sendMessage } = React.useContext(GameContext);

  const inputRef = React.useRef<HTMLInputElement>();
  const endChatRef = React.useRef<HTMLDivElement>();

  React.useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === Key.Enter) {
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
    if (typeof onNewMessage === "function" && messages.length > 0)
      onNewMessage(last(messages));
  }, [endChatRef, messages, onNewMessage]);

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
      <div
        className={cn(
          classes.messagesContainer,
          props.classes?.messagesContainer
        )}
      >
        {messages.map((message) => (
          <MessageComponent
            key={message.date.getTime()}
            message={message}
            withTimestamp={withTimestamp}
          />
        ))}
        <div ref={endChatRef} />
      </div>
      <TextField
        id="chat-input"
        inputRef={inputRef}
        variant="outlined"
        className={cn(classes.inputContainer, props.classes?.inputContainer)}
        inputProps={{
          className: cn(classes.input, props.classes?.input),
          autoComplete: "off",
        }}
        color="secondary"
        onKeyDown={handleKeyDown}
        {...inputProps}
      />
    </div>
  );
}

export default withStyles(styles)(Chat);
