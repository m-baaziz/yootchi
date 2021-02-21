import { Result, ok, err } from "neverthrow";
import { Language } from "../types/language";
import { Mode } from "../types/mode";
import { Game, State, Error } from "../types/game";

export const DEFAULT_GAME: Game = {
  state: State.CONFIGURING_LANGUAGE,
  settings: {
    language: Language.EN,
  },
  players: [],
};

export function parseLanguage(str: string): Result<Language, string> {
  if ((Object.values(Language) as string[]).includes(str)) {
    return ok(str as Language);
  }
  return err(Error.INVALID_LANGUAGE);
}

export function parseMode(str: string): Result<Mode, string> {
  if ((Object.values(Mode) as string[]).includes(str)) {
    return ok(str as Mode);
  }
  return err(Error.INVALID_MODE);
}

export function getActiveGame(): Promise<Game | null> {
  return Promise.resolve(null);
}

export function createGame(game: Game): Promise<Game> {
  return Promise.resolve(game);
}

export function updateGame(game: Game): Promise<void> {
  return Promise.resolve();
}
