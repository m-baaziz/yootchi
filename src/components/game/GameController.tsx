import React from "react";

import { Game } from "../../types/game/game";
import { Team } from "../../types/player";
import { Message } from "../../types/chat";
import { Account } from "../../types/account";

import GameContext from "../../contexts/game-context";
import {
  DEFAULT_GAME,
  getActiveGame,
  createGame,
  updateGame,
} from "../../lib/game/game";
import { getPlayers } from "../../lib/player";
import { sendMessage } from "../../lib/chat";
import { getAccount, accountToPlayer } from "../../lib/account";

export default function GameController(
  props: React.PropsWithChildren<{ key?: string }>
): React.ReactElement {
  const { children } = props;
  const [account, setAccount] = React.useState<Account | undefined>(undefined);
  const [game, setGame] = React.useState<Game>(DEFAULT_GAME);
  const [initialized, setInitialized] = React.useState<boolean>(false);
  const [messages, setMessages] = React.useState<Message[]>([]);

  const updateAndSetGame = async (game: Game) => {
    try {
      const newGame = await updateGame(game);
      setGame(newGame);
    } catch (e) {
      console.error(e);
    }
  };

  const requestPlayer = (team: Team): void => {
    const players = getPlayers().filter((p) => p.team === team);
    if (players.length > 0) {
      updateAndSetGame({
        ...game,
        players: [...game.players, players[0]],
      });
    }
    return;
  };

  const handleSendMessage = async (text: string) => {
    try {
      if (!account) return;
      const message: Message = {
        player: await accountToPlayer(account),
        text,
        date: new Date(),
      };
      sendMessage(message);
      setMessages([...messages, message]);
    } catch (e) {
      console.error(e);
    }
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
    const loadAccount = async () => {
      try {
        const account = await getAccount();
        setAccount(account);
      } catch (e) {
        console.error(e);
      }
    };
    if (account === undefined) loadAccount();
  }, [setAccount, account]);

  return (
    <GameContext.Provider
      value={{
        game: game,
        messages,
        updateGame: updateAndSetGame,
        setGame,
        requestPlayer,
        sendMessage: handleSendMessage,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
