import { Language } from "./language";
import { Mode } from "./mode";
import { Player } from "./player";

export enum Error {
  INVALID_LANGUAGE = "Invalid language",
  INVALID_MODE = "Invalid mode",
}

export enum State {
  CONFIGURING_LANGUAGE = "Changing Language",
  CONFIGURING_MODE = "Changing Mode",
  CONFIGURING_PARTY = "Changing Party",
  READY = "Ready",
  IN_PROGRESS = "In Progress",
  FINISHED = "Finished",
}

export type Settings = {
  language?: Language;
  mode?: Mode;
};

export type Game = {
  id?: string;
  state: State;
  settings: Settings;
  players: Player[];
};
