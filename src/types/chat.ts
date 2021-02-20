import { Player } from "./player";

export type Message = {
  player: Player;
  text: string;
  date: Date;
};
