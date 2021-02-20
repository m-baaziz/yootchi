import { LanguageInfo } from "./language";

export type Account = {
  user_id: string;
  username: string;
  avatar_url: string;
  language_info: LanguageInfo;
};
