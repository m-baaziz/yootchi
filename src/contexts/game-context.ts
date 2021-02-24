import React from "react";

import { Team } from "../types/player";
import { Game } from "../types/game/game";
import { Message } from "../types/chat";

export type GameContext = {
  game?: Game;
  messages: Message[];
  updateGame: (game: Game) => void;
  setGame: (game: Game) => void;
  requestPlayer: (team: Team) => void;
  sendMessage: (text: string) => void;
};

const gameContext = React.createContext<GameContext>({
  game: undefined,
  messages: [],
  updateGame: () => {
    return;
  },
  setGame: () => {
    return;
  },
  requestPlayer: () => {
    return;
  },
  sendMessage: () => {
    return;
  },
});

export default gameContext;
