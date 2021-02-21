import React from "react";
import head from "lodash/head";
import { GetStaticProps } from "next";
import cn from "classnames";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Fab } from "@material-ui/core";
import { NavigateNext, NavigateBefore } from "@material-ui/icons";

import Stepper from "../src/components/lobby/Stepper";
import LangSelection from "../src/components/lobby/LangSelection";
import ModeSelection from "../src/components/lobby/ModeSelection";
import Party from "../src/components/lobby/Party/Party";

import { Language } from "../src/types/language";
import { Mode } from "../src/types/mode";
import { Step, LobbyConfig } from "../src/types/lobby";
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
  const { game, setGame, requestPlayer } = React.useContext(GameContext);
  const [step, setStep] = React.useState<Step>(STATE_STEP_MAP[game.state]);

  React.useEffect(() => {
    setStep(STATE_STEP_MAP[game.state]);
  }, [setStep, game]);

  const handleStepChange = (s: Step): void => {
    setGame({
      ...game,
      state: STEP_STATE_MAP[s],
    });
  };

  const handlePreviousClick = (): void => {
    const previousStep = getPrevious(ALL_STEPS, step);
    if (previousStep) {
      setGame({
        ...game,
        state: STEP_STATE_MAP[previousStep],
      });
    }
  };

  const handleNextClick = (): void => {
    const nextStep = getNext(ALL_STEPS, step);
    if (nextStep) {
      setGame({
        ...game,
        state: STEP_STATE_MAP[nextStep],
      });
    }
  };

  const handleLangChange = (language: Language): void => {
    setGame({
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
    setGame({
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
        disabled={getPrevious(ALL_STEPS, step) === null}
      >
        <NavigateBefore fontSize="inherit" className={classes.navBtn} />
      </Fab>
      <Stepper
        className={classes.stepper}
        steps={ALL_STEPS}
        value={step}
        onChange={handleStepChange}
        restrictJump
      />
      <Fab
        className={cn(classes.navFab, classes.next)}
        aria-label="next"
        size="small"
        color="primary"
        onClick={handleNextClick}
        disabled={getNext(ALL_STEPS, step) === null}
      >
        <NavigateNext fontSize="inherit" className={classes.navBtn} />
      </Fab>
      {step === Step.LANGUAGE ? (
        <LangSelection
          className={classes.content}
          languageInfos={config.langs}
          value={game.settings.language}
          onChange={handleLangChange}
        />
      ) : null}
      {step === Step.MODE ? (
        <ModeSelection
          className={classes.content}
          modeInfos={config.modes[game.settings.language]}
          value={game.settings.mode}
          onChange={handleModeChange}
        />
      ) : null}
      {step === Step.PARTY ? (
        <Party
          className={classes.content}
          players={game.players}
          requestPlayer={requestPlayer}
        />
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
