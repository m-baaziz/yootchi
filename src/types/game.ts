export enum Error {
  INVALID_LANGUAGE = "Invalid language",
  INVALID_MODE = "Invalid mode",
}

export enum Language {
  EN = "english",
  FR = "french",
  JA = "japanese",
}

export enum Mode {
  FLASHCARD = "flashcard",
  DRAW_IT = "draw_it",
}

export type Game = {
  mode: Mode;
};

export type LanguageInfo = {
  id: Language;
  image_url?: string;
  flag_url?: string;
};

export type GameConfig = {
  langs: LanguageInfo[];
  modes: Record<Language, Mode[]>;
};
