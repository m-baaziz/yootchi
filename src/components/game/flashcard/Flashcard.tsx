import React from "react";
import cn from "classnames";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core";

import {
  FlashcardQuestion,
  FlashcardAnswer,
  FlashcardContext,
} from "../../../types/game/flashcard";
import {
  getNextQuestion,
  answerQuestion,
  computeScores,
} from "../../../lib/game/flashcard";
import { getTeams } from "../../../lib/player";

import GameContext from "../../../contexts/game-context";

import Scores from "./Scores";
import QuestionAnswers from "./QuestionAnswers";

const styles = () =>
  createStyles({
    root: {},
    scores: {},
    questionAnswers: {},
  });

type FlashcardProps = WithStyles<typeof styles> & {
  className?: string;
};

function Flashcard(props: FlashcardProps): React.ReactElement {
  const { classes, className } = props;
  const { game, setGame } = React.useContext(GameContext);
  const [question, setQuestion] = React.useState<FlashcardQuestion | null>(
    null
  );

  React.useEffect(() => {
    const initQuestion = async () => {
      try {
        setQuestion(await getNextQuestion());
      } catch (e) {
        console.error(e);
      }
    };
    initQuestion();
  }, [setQuestion]);

  const handleAnswerSelection = async (answer: FlashcardAnswer) => {
    try {
      const answerResponse = await answerQuestion(answer);
      setQuestion(answerResponse.nextQuestion);
      // setGame and not updateGame because answerQuestion already updates game
      setGame({
        ...game,
        context: answerResponse.context,
      });
    } catch (e) {
      console.error(e);
    }
  };

  console.log("question = ", question);

  return (
    <div className={cn(classes.root, className)}>
      <Scores
        className={classes.scores}
        scores={computeScores(
          getTeams(game.players),
          (game.context as FlashcardContext)?.questionCount || 0,
          (game.context as FlashcardContext)?.actions || []
        )}
      />
      {question ? (
        <QuestionAnswers
          className={classes.questionAnswers}
          question={question}
          onAnswerSelection={handleAnswerSelection}
        />
      ) : (
        <div className={classes.questionAnswers} />
      )}
    </div>
  );
}

export default withStyles(styles)(Flashcard);
