import {
  FlashcardQuestion,
  FlashcardAnswer,
  FlashcardAnswerResponse,
  FlashcardAction,
} from "../../types/game/flashcard";
import { Team } from "../../types/player";

import { getPlayers } from "../player";

export async function getNextQuestion(): Promise<FlashcardQuestion> {
  return Promise.resolve({
    questionIndex: 0,
    question: "こんにちは世界",
    availableAnswers: ["Hello world", "Thank you", "Good bye", "How are you ?"],
  });
}

export async function answerQuestion(
  answer: FlashcardAnswer
): Promise<FlashcardAnswerResponse> {
  console.log("answer = ", answer);
  const context = {
    templateId: "flashcard-template-id",
    questionCount: 2,
    actions: [
      {
        player: getPlayers()[0],
        questionIndex: answer.questionIndex,
        question: "こんにちは世界",
        answerIndex: answer.answerIndex,
        validAnswerIndex: answer.answerIndex,
        availableAnswers: [
          "Hello world",
          "Thank you",
          "Good bye",
          "How are you ?",
        ],
        date: new Date(),
      },
    ],
  };
  const nextQuestion: FlashcardQuestion = {
    questionIndex: 1,
    question: "ありがとうございました",
    availableAnswers: [
      "Sorry",
      "Good evening",
      "Thank you",
      "What is your name ?",
    ],
  };
  return Promise.resolve({
    context,
    nextQuestion,
  });
}

export function computeScores(
  teams: Team[],
  questionsCount: number,
  actions: FlashcardAction[]
): Record<Team, number> {
  return actions.reduce(
    (acc, action) => ({
      ...acc,
      [action.player.team]:
        acc[action.player.team] +
        (action.answerIndex === action.validAnswerIndex ? 1 : 0) /
          questionsCount,
    }),
    teams.reduce(
      (teamsAcc, team) => ({ ...teamsAcc, [team]: 0 }),
      {} as Record<Team, number>
    )
  );
}
