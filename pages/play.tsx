import React from "react";
import { GetStaticProps } from "next";
import { useCookies } from "react-cookie";
import { ok } from "neverthrow";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Fab } from "@material-ui/core";
import { NavigateNext } from "@material-ui/icons";

import Stepper from "../src/components/play/Stepper";
import LangSelection from "../src/components/play/LangSelection";
import ModeSelection from "../src/components/play/ModeSelection";

import { GameConfig, Language, Mode } from "../src/types/game";
import { Step, Presets } from "../src/types/play";
import {
  ALL_STEPS,
  DEFAULT_PRESETS,
  serializePresets,
  parsePresets,
} from "../src/lib/play";
import { getGameConfig } from "../src/lib/game";
import { getNext } from "../src/lib/utils";

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
        ' .   .         .       .    . '  3em   \
        / 10%  1fr      auto    auto  10%       \
      ",
    },
    stepper: { gridArea: "stepper" },
    content: { gridArea: "content" },
    actions: { gridArea: "actions" },
    nextBtn: { fontSize: "4em" },
  });

type PlayProps = WithStyles<typeof styles> & {
  config: GameConfig;
};

const COOKIES_PRESETS_KEY = "presets";

function Play(props: PlayProps): React.ReactElement {
  const { classes, config } = props;
  const [cookies, setCookie] = useCookies([COOKIES_PRESETS_KEY]);
  const [cookiesLoaded, setCookiesLoaded] = React.useState(false);
  const [presets, setPresets] = React.useState<Presets>(DEFAULT_PRESETS);

  const handleStepChange = (step: Step): void => {
    setPresets({
      ...presets,
      step,
    });
  };

  const handleLangChange = (language: Language): void => {
    setPresets({
      ...presets,
      language,
    });
  };

  const handleModeChange = (mode: Mode): void => {
    setPresets({
      ...presets,
      mode,
    });
  };

  const handleNextClick = (): void => {
    setPresets({
      ...presets,
      step: getNext(ALL_STEPS, presets.step),
    });
  };

  React.useEffect(() => {
    if (!cookiesLoaded) {
      if (typeof cookies[COOKIES_PRESETS_KEY] === "string") {
        setPresets(parsePresets(cookies[COOKIES_PRESETS_KEY]));
        setCookiesLoaded(true);
        return;
      }
    }
  }, [setCookiesLoaded, setPresets, cookiesLoaded, cookies]);

  React.useEffect(() => {
    serializePresets(presets).andThen((hash) => {
      setCookie(COOKIES_PRESETS_KEY, hash);
      return ok(null);
    });
  }, [setCookie, presets]);

  return (
    <div className={classes.root}>
      <Stepper
        className={classes.stepper}
        steps={ALL_STEPS}
        value={presets.step}
        onChange={handleStepChange}
        restrictJump
      />
      {presets.step === Step.LANGUAGE ? (
        <LangSelection
          className={classes.content}
          languageInfos={config.langs}
          value={presets.language}
          onChange={handleLangChange}
        />
      ) : null}
      {presets.step === Step.MODE ? (
        <ModeSelection
          className={classes.content}
          modeInfos={config.modes[presets.language]}
          value={presets.mode}
          onChange={handleModeChange}
        />
      ) : null}
      <div className={classes.actions}>
        <Fab color="secondary" aria-label="next" onClick={handleNextClick}>
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
      config: await getGameConfig(),
      classes: null,
    },
  };
};
