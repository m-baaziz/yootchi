import React from "react";

import { Game } from "../../types/game";
import { Team } from "../../types/player";

import GameContext from "../../contexts/game-context";
import {
  DEFAULT_GAME,
  getActiveGame,
  createGame,
  updateGame,
} from "../../lib/game";
import { getPlayers } from "../../lib/player";

export default function GameController(
  props: React.PropsWithChildren<{ key?: string }>
): React.ReactElement {
  const { children } = props;
  const [game, setGame] = React.useState<Game>(DEFAULT_GAME);
  const [initialized, setInitialized] = React.useState<boolean>(false);

  const requestPlayer = (team: Team): void => {
    const players = getPlayers().filter((p) => p.team === team);
    if (players.length > 0) {
      setGame({
        ...game,
        players: [...game.players, players[0]],
      });
    }
    return;
  };

  React.useEffect(() => {
    const initGame = async () => {
      try {
        const activeGame = await getActiveGame();
        if (activeGame === null) {
          setGame(await createGame(game));
          return;
        }
        setGame(activeGame);
      } catch (e) {
        console.error(e);
      } finally {
        setInitialized(true);
      }
    };
    if (!initialized) initGame();
  }, [setInitialized, initialized, game]);

  React.useEffect(() => {
    const update = async () => {
      try {
        const newGame = await updateGame(game);
        setGame(newGame);
      } catch (e) {
        console.error(e);
      }
    };
    update();
  }, [setGame, game]);

  return (
    <GameContext.Provider
      value={{
        game: game,
        setGame: setGame,
        requestPlayer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
