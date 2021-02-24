import { Player } from "../player";

export type FlashcardAction = {
  player: Player;
  questionIndex: number;
  question: string;
  answerIndex: number;
  validAnswerIndex: number;
  availableAnswers: string[];
  date: Date;
};

export type FlashcardContext = {
  templateId: string;
  questionCount: number;
  actions: FlashcardAction[];
};

export type FlashcardQuestion = {
  questionIndex: number;
  question: string;
  availableAnswers: string[];
};

export type FlashcardAnswer = {
  questionIndex: number;
  answerIndex: number;
};

export type FlashcardAnswerResponse = {
  context: FlashcardContext;
  nextQuestion?: FlashcardQuestion;
};
