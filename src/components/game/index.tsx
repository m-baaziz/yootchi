import React from "react";
import { Mode } from "../../types/mode";
import { State } from "../../types/game/game";
import GameContext from "../../contexts/game-context";

import Flashcard from "./flashcard/Flashcard";
import DrawIt from "./DrawIt";

type FlashcardProps = {
  className?: string;
};

function Loading(): React.ReactElement {
  return <div>Loading ...</div>;
}

export default function GameSwitch(props: FlashcardProps): React.ReactElement {
  const { className } = props;
  const { game, updateGame } = React.useContext(GameContext);
  const { mode } = game.settings;

  React.useEffect(() => {
    if (game.state === State.READY) {
      updateGame({
        ...game,
        state: State.IN_PROGRESS,
      });
    }
  }, [updateGame, game]);

  return (
    <>
      {game.state !== State.IN_PROGRESS || game.context === undefined ? (
        <Loading />
      ) : (
        <>
          {mode === Mode.FLASHCARD ? <Flashcard className={className} /> : null}
          {mode === Mode.DRAW_IT ? <DrawIt className={className} /> : null}
        </>
      )}
    </>
  );
}
