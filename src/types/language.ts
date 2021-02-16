export enum Language {
  EN = "english",
  FR = "french",
  JA = "japanese",
}
export type LanguageInfo = {
  id: Language;
  image_url?: string;
  flag_url?: string;
};
