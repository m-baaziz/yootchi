import { Language, LanguageInfo } from "../types/language";

export const LANGUAGE_MAP: Record<string, LanguageInfo> = {
  english: {
    id: Language.EN,
    image_url: "/images/uk_1.png",
    flag_url: "/images/uk_flag.svg",
  },
  french: {
    id: Language.FR,
    image_url: "/images/uk_1.png",
    flag_url: "/images/uk_flag.svg",
  },
  japanese: {
    id: Language.JA,
    image_url: "/images/japan_1.png",
    flag_url: "/images/japan_flag.svg",
  },
};
