import { Result, ok, err } from "neverthrow";
import { Language } from "../../types/language";
import { Mode } from "../../types/mode";
import { Game, State, Error } from "../../types/game/game";
import { FlashcardContext } from "../../types/game/flashcard";

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

export function updateGame(game: Game): Promise<Game> {
  console.log("updating game: ", game);
  const newGame = { ...game };
  if (game.state === State.READY && game.context === undefined) {
    if (game.settings.mode === Mode.FLASHCARD) {
      const flashcardContext: FlashcardContext = {
        templateId: "flashcard-template-id",
        questionCount: 2,
        actions: [],
      };
      newGame.context = flashcardContext;
    }
  }
  return Promise.resolve(newGame);
}
