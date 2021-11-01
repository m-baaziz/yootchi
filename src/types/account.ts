import { LanguageInfo } from "./language";

export type Account = {
  user_id: string;
  username: string;
  avatar_url: string;
  language_info: LanguageInfo;
};

export enum ERRORS {
  USER_NOT_SIGNED_IN = "user not signed in",
}
