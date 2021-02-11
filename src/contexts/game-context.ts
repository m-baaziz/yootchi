import React from "react";

import { Game } from "../types/game";

type GameContext = {
  game?: Game;
  setGame: (game: Game) => void;
};

const gameContext = React.createContext<GameContext>({
  game: undefined,
  setGame: () => {
    return;
  },
});

export default gameContext;
