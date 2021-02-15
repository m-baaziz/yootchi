import { Result, ok, err } from "neverthrow";
import { Language } from "../types/game";
import { Presets, Step, Error } from "../types/play";
import { parseLanguage, parseMode } from "./game";

export const ALL_STEPS: Step[] = [Step.LANGUAGE, Step.MODE, Step.LOBBY];
export const DEFAULT_PRESETS: Presets = {
  step: Step.LANGUAGE,
  language: Language.EN,
};

export function parseStep(str: string): Result<Step, string> {
  if ((Object.values(Step) as string[]).includes(str)) {
    return ok(str as Step);
  }
  return err(Error.INVALID_STEP);
}

export function serializePresets(presets: Presets): Result<string, string> {
  try {
    return ok(btoa(JSON.stringify(presets)));
  } catch (e) {
    return err(e);
  }
}

export function parsePresets(b64Str: string): Presets {
  try {
    const json = JSON.parse(atob(b64Str));
    const presets: Presets = { step: Step.LANGUAGE };
    const langResult = parseLanguage(json["language"]);
    presets.language = langResult.unwrapOr(DEFAULT_PRESETS.language);
    if (langResult.isOk()) {
      presets.step = Step.MODE;
    }
    parseMode(json["mode"]).andThen((mode) => {
      presets.mode = mode;
      presets.step = Step.LOBBY;
      return ok(null);
    });
    parseStep(json["step"]).andThen((step) => {
      const stepIndex = ALL_STEPS.findIndex((s) => s === step);
      const presetsStepIndex = ALL_STEPS.findIndex((s) => s === presets.step);
      if (stepIndex < presetsStepIndex) {
        presets.step = step;
      }
      return ok(null);
    });
    return presets;
  } catch (e) {
    console.debug(e);
    return {
      step: Step.LANGUAGE,
    };
  }
}
