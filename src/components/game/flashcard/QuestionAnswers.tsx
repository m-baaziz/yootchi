import React from "react";
import cn from "classnames";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Button } from "@material-ui/core";

import {
  FlashcardQuestion,
  FlashcardAnswer,
} from "../../../types/game/flashcard";

const styles = () =>
  createStyles({
    root: {
      display: "grid",
      gridTemplate:
        "  \
          '       .       question       .     ' auto  \
          '       .          .           .     ' 4em   \
          '       .       answers        .     ' 1fr   \
          /      15%        1fr         15%            \
        ",
      justifyContent: "center",
    },
    question: { gridArea: "question", placeSelf: "center", minWidth: "20em" },
    answers: {
      gridArea: "answers",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(15em, 1fr))",
      rowGap: "2em",
      columnGap: "15em",
    },
    answer: {},
  });

type QuestionAnswersProps = WithStyles<typeof styles> & {
  className?: string;
  question: FlashcardQuestion;
  onAnswerSelection: (answer: FlashcardAnswer) => void;
};

function QuestionAnswers(props: QuestionAnswersProps): React.ReactElement {
  const { classes, className, question, onAnswerSelection } = props;

  const handleAnswerClick = (answerIndex: number) => () => {
    onAnswerSelection({
      questionIndex: question.questionIndex,
      answerIndex,
    });
  };

  const handleQuestionClick = () => {
    console.log("playing question sound ...");
  };

  return (
    <div className={cn(classes.root, className)}>
      <Button
        variant="contained"
        className={classes.question}
        onClick={handleQuestionClick}
      >
        {question.question}
      </Button>
      <div className={classes.answers}>
        {question.availableAnswers.map((answer, i) => (
          <Button
            key={i}
            className={classes.answer}
            variant="contained"
            onClick={handleAnswerClick(i)}
          >
            {answer}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default withStyles(styles)(QuestionAnswers);
