import { LanguageInfo } from "./language";

export type Profile = {
  username: string;
  avatar_url: string;
};

export type Preferences = {
  language_info: LanguageInfo;
};

export type User = {
  user_id: string;
  token: string;
  profile: Profile;
  preferences?: Preferences;
};
