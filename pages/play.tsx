import React from "react";
import head from "lodash/head";
import { GetStaticProps } from "next";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Fab } from "@material-ui/core";
import { NavigateNext } from "@material-ui/icons";
import { yellow } from "@material-ui/core/colors";

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
import { getNext } from "../src/lib/utils";
import GameContext from "../src/contexts/game-context";

const styles = () =>
  createStyles({
    root: {
      height: "100%",
      width: "100%",
      display: "grid",
      gridTemplate:
        "  \
        ' .   .         .      .     . '  3em   \
        ' . stepper  stepper stepper . '  auto  \
        ' . content  content content . '  1fr   \
        ' .   .      actions actions . '  auto  \
        ' .   .         .       .    . '  1em   \
        / 10%  1fr      auto    auto  10%       \
      ",
    },
    stepper: { gridArea: "stepper" },
    content: { gridArea: "content" },
    actions: { gridArea: "actions" },
    nextFab: {
      backgroundColor: yellow[500],
      "&:hover": {
        backgroundColor: yellow[200],
      },
    },
    nextBtn: { fontSize: "4em" },
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
      <Stepper
        className={classes.stepper}
        steps={ALL_STEPS}
        value={step}
        onChange={handleStepChange}
        restrictJump
      />
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
      <div className={classes.actions}>
        <Fab
          className={classes.nextFab}
          aria-label="next"
          onClick={handleNextClick}
          disabled={getNext(ALL_STEPS, step) === null}
        >
          <NavigateNext fontSize="inherit" className={classes.nextBtn} />
        </Fab>
      </div>
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
