import React from "react";

import { Game } from "../../types/game";
import GameContext from "../../contexts/game-context";

export default function GameController(
  props: React.PropsWithChildren<{ key?: string }>
): React.ReactElement {
  const { children } = props;
  const [game, setGame] = React.useState<Game | undefined>(undefined);

  return (
    <GameContext.Provider
      value={{
        game: game,
        setGame: setGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
