import { v4 as uuidv4 } from "uuid";
import { Language } from "../types/language";
import { Team, Player } from "../types/player";

export function getPlayers(): Player[] {
  return [
    {
      user_id: uuidv4(),
      username: "Sanji",
      avatar_url: "/images/avatar_1.png",
      language_info: {
        id: Language.EN,
        image_url: "/images/uk_1.png",
        flag_url: "/images/uk_flag.svg",
      },
      team: Team.BLUE,
    },
    {
      user_id: uuidv4(),
      username: "Luffy",
      avatar_url: "/images/avatar_2.png",
      language_info: {
        id: Language.JA,
        image_url: "/images/japan_1.png",
        flag_url: "/images/japan_flag.svg",
      },
      team: Team.RED,
    },
  ];
}
