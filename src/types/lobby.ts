import { Language, LanguageInfo } from "./language";
import { ModeInfo } from "./mode";

export enum Step {
  LANGUAGE = "Language",
  MODE = "Mode",
  PARTY = "Party",
}

export type LobbyConfig = {
  langs: LanguageInfo[];
  modes: Record<Language, ModeInfo[]>;
};
