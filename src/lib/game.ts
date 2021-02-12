import { Result, ok, err } from "neverthrow";
import { Language, Mode, GameConfig, Error } from "../types/game";

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

export function getGameConfig(): Promise<GameConfig> {
  return Promise.resolve({
    langs: [
      {
        id: Language.EN,
        image_url: "/images/uk_1.png",
        flag_url: "/images/uk_flag.svg",
      },
      {
        id: Language.JA,
        image_url: "/images/japan_1.png",
        flag_url: "/images/japan_flag.svg",
      },
    ],
    modes: {
      [Language.EN]: [Mode.FLASHCARD],
      [Language.FR]: [],
      [Language.JA]: [Mode.FLASHCARD],
    },
  });
}
