import { LanguageInfo } from "./language";

export enum Team {
  BLUE = "blue",
  RED = "red",
}

export type Player = {
  user_id: string;
  username: string;
  avatar_url: string;
  language_info: LanguageInfo;
  team: Team;
};
