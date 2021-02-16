import React from "react";

import { Team } from "../types/player";
import { Game } from "../types/game";

export type GameContext = {
  game?: Game;
  setGame: (game: Game) => void;
  requestPlayer: (team: Team) => void;
};

const gameContext = React.createContext<GameContext>({
  game: undefined,
  setGame: () => {
    return;
  },
  requestPlayer: () => {
    return;
  },
});

export default gameContext;
