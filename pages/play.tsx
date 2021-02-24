import React from "react";
import head from "lodash/head";
import { GetStaticProps } from "next";
import cn from "classnames";
import { Key } from "ts-key-enum";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Fab } from "@material-ui/core";
import { NavigateNext, NavigateBefore } from "@material-ui/icons";

import Stepper from "../src/components/lobby/Stepper";
import LangSelection from "../src/components/lobby/LangSelection";
import ModeSelection from "../src/components/lobby/ModeSelection";
import Party from "../src/components/lobby/Party/Party";
import Game from "../src/components/game";

import { Language } from "../src/types/language";
import { Mode } from "../src/types/mode";
import { Step, LobbyConfig } from "../src/types/lobby";
import { State } from "../src/types/game/game";
import {
  ALL_STEPS,
  STATE_STEP_MAP,
  STEP_STATE_MAP,
  getLobbyConfig,
} from "../src/lib/lobby";
import { getNext, getPrevious } from "../src/lib/utils";
import GameContext from "../src/contexts/game-context";

const styles = () =>
  createStyles({
    root: {
      height: "100%",
      width: "100%",
      display: "grid",
      gridTemplate:
        "  \
        '    .        .        .        .      .       .        .    '  3em   \
        '    .     previous stepper  stepper stepper  next      .    '  auto  \
        ' content  content  content  content content content content '  1fr   \
        '    .        .        .        .       .      .        .    '  1em   \
        /   10%      auto     1fr      auto    auto   auto     10%            \
      ",
    },
    stepper: { gridArea: "stepper", alignSelf: "center" },
    content: { gridArea: "content", overflow: "hidden" },
    actions: { gridArea: "actions" },
    previous: { gridArea: "previous" },
    next: { gridArea: "next" },
    navFab: {
      marginTop: "1em",
    },
    navBtn: { fontSize: "3em" },
  });

type PlayProps = WithStyles<typeof styles> & {
  config: LobbyConfig;
};

function Play(props: PlayProps): React.ReactElement {
  const { classes, config } = props;
  const { game, updateGame, requestPlayer } = React.useContext(GameContext);
  const [lobbyStep, setLobbyStep] = React.useState<Step>(
    STATE_STEP_MAP[game.state]
  );
  const [holdingCmd, setHoldingCmd] = React.useState<boolean>(false);

  React.useEffect(() => {
    const listener = (updown: "up" | "down") => (event: KeyboardEvent) => {
      const { key } = event;
      if ([Key.Meta, Key.Control].includes(key as Key)) {
        setHoldingCmd(updown === "down");
        return;
      }
      if (
        updown !== "down" ||
        !holdingCmd ||
        ![Key.Enter, Key.Backspace].includes(key as Key)
      )
        return;
      let nextStep: Step | undefined = undefined;
      if (key === Key.Enter) {
        nextStep = getNext(ALL_STEPS, lobbyStep);
      }
      if (key === Key.Backspace) {
        nextStep = getPrevious(ALL_STEPS, lobbyStep);
      }
      if (nextStep) {
        updateGame({
          ...game,
          state: STEP_STATE_MAP[nextStep],
        });
      }
    };
    const listenerUp = listener("up");
    const listenerDown = listener("down");
    document.addEventListener("keyup", listenerUp);
    document.addEventListener("keydown", listenerDown);
    return () => {
      document.removeEventListener("keyup", listenerUp);
      document.removeEventListener("keydown", listenerDown);
    };
  }, [setHoldingCmd, updateGame, game, lobbyStep, holdingCmd]);

  React.useEffect(() => {
    setLobbyStep(STATE_STEP_MAP[game.state]);
  }, [setLobbyStep, game]);

  const handleStepChange = (s: Step): void => {
    updateGame({
      ...game,
      state: STEP_STATE_MAP[s],
    });
  };

  const handlePreviousClick = (): void => {
    const previousStep = getPrevious(ALL_STEPS, lobbyStep);
    if (previousStep) {
      updateGame({
        ...game,
        state: STEP_STATE_MAP[previousStep],
      });
    }
  };

  const handleNextClick = (): void => {
    const nextStep = getNext(ALL_STEPS, lobbyStep);
    if (nextStep) {
      updateGame({
        ...game,
        state: STEP_STATE_MAP[nextStep],
      });
    }
  };

  const handleLangChange = (language: Language): void => {
    updateGame({
      ...game,
      settings: {
        ...game.settings,
        language,
        mode: config.modes[language]
          .map((mi) => mi.id)
          .includes(game.settings.mode)
          ? game.settings.mode
          : head(config.modes[language])?.id,
      },
    });
  };

  const handleModeChange = (mode: Mode): void => {
    updateGame({
      ...game,
      settings: {
        ...game.settings,
        mode,
      },
    });
  };

  return (
    <div className={classes.root}>
      <Fab
        className={cn(classes.navFab, classes.previous)}
        aria-label="previous"
        size="small"
        color="primary"
        onClick={handlePreviousClick}
        disabled={getPrevious(ALL_STEPS, lobbyStep) === null}
      >
        <NavigateBefore fontSize="inherit" className={classes.navBtn} />
      </Fab>
      <Stepper
        className={classes.stepper}
        steps={ALL_STEPS}
        value={lobbyStep}
        onChange={handleStepChange}
        restrictJump
      />
      <Fab
        className={cn(classes.navFab, classes.next)}
        aria-label="next"
        size="small"
        color="primary"
        onClick={handleNextClick}
        disabled={getNext(ALL_STEPS, lobbyStep) === null}
      >
        <NavigateNext fontSize="inherit" className={classes.navBtn} />
      </Fab>
      {game.state === State.CONFIGURING_LANGUAGE ? (
        <LangSelection
          className={classes.content}
          languageInfos={config.langs}
          value={game.settings.language}
          onChange={handleLangChange}
        />
      ) : null}
      {game.state === State.CONFIGURING_MODE ? (
        <ModeSelection
          className={classes.content}
          modeInfos={config.modes[game.settings.language]}
          value={game.settings.mode}
          onChange={handleModeChange}
        />
      ) : null}
      {game.state === State.CONFIGURING_PARTY ? (
        <Party
          className={classes.content}
          players={game.players}
          requestPlayer={requestPlayer}
        />
      ) : null}
      {[State.READY, State.IN_PROGRESS].includes(game.state) ? (
        <Game className={classes.content} />
      ) : null}
    </div>
  );
}

export default withStyles(styles)(Play);

export const getStaticProps: GetStaticProps<PlayProps> = async () => {
  return {
    props: {
      config: await getLobbyConfig(),
      classes: null,
    },
  };
};
