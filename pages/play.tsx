import React from "react";
import { GetStaticProps } from "next";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Grid } from "@material-ui/core";
import { useCookies } from "react-cookie";
import { ok } from "neverthrow";

import LangSelection from "../src/components/play/LangSelection";
import Stepper from "../src/components/play/Stepper";

import { GameConfig, Language } from "../src/types/game";
import { Step, Presets } from "../src/types/play";
import { ALL_STEPS, serializePresets, parsePresets } from "../src/lib/play";
import { getGameConfig } from "../src/lib/game";

const styles = () =>
  createStyles({
    root: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    stepper: { paddingTop: "3em" },
    langSelection: {},
  });

type PlayProps = WithStyles<typeof styles> & {
  config: GameConfig;
};

const COOKIES_PRESETS_KEY = "presets";

function Play(props: PlayProps): React.ReactElement {
  const { classes, config } = props;
  const [cookies, setCookie] = useCookies([COOKIES_PRESETS_KEY]);

  const [presets, setPresets] = React.useState<Presets | undefined>(undefined);

  const handleLangSelectionSubmit = (language: Language): void => {
    setPresets({
      ...presets,
      language,
    });
  };

  const handleStepChange = (step: Step): void => {
    setPresets({
      ...presets,
      step,
      language: Language.JA,
    });
  };

  React.useEffect(() => {
    if (presets === undefined) {
      if (typeof cookies[COOKIES_PRESETS_KEY] === "string") {
        setPresets(parsePresets(cookies[COOKIES_PRESETS_KEY]));
        return;
      }
    } else {
      serializePresets(presets).andThen((hash) => {
        if (cookies[COOKIES_PRESETS_KEY] === hash) {
          return ok(null);
        }
        setCookie(COOKIES_PRESETS_KEY, hash);
        return ok(null);
      });
    }
  }, [setCookie, setPresets, cookies, presets]);

  return (
    <div className={classes.root}>
      <Stepper
        className={classes.stepper}
        steps={ALL_STEPS}
        value={presets?.step}
        onChange={handleStepChange}
      />
      <LangSelection
        className={classes.langSelection}
        value={presets?.language}
        onSubmit={handleLangSelectionSubmit}
      />
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
