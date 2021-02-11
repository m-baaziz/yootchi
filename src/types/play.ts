import { Language, Mode } from "./game";

export enum Error {
  INVALID_STEP = "Invalid step",
}

export enum Step {
  LANGUAGE = "Language",
  MODE = "Mode",
  LOBBY = "Lobby",
}

export type Presets = {
  step: Step;
  language?: Language;
  mode?: Mode;
};
