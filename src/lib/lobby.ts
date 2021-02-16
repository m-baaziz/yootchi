import { Language } from "../types/language";
import { Mode } from "../types/mode";
import { Step, LobbyConfig } from "../types/lobby";
import { State } from "../types/game";

export const ALL_STEPS: Step[] = [Step.LANGUAGE, Step.MODE, Step.PARTY];

export const STATE_STEP_MAP: Record<State, Step> = {
  [State.CONFIGURING_LANGUAGE]: Step.LANGUAGE,
  [State.CONFIGURING_MODE]: Step.MODE,
  [State.CONFIGURING_PARTY]: Step.PARTY,
  [State.READY]: Step.PARTY,
  [State.IN_PROGRESS]: Step.PARTY,
  [State.FINISHED]: Step.PARTY,
};

export const STEP_STATE_MAP: Record<Step, State> = {
  [Step.LANGUAGE]: State.CONFIGURING_LANGUAGE,
  [Step.MODE]: State.CONFIGURING_MODE,
  [Step.PARTY]: State.CONFIGURING_PARTY,
};

export function getLobbyConfig(): Promise<LobbyConfig> {
  return Promise.resolve({
    langs: [
      {
        id: Language.EN,
        image_url: "/images/uk_1.png",
        flag_url: "/images/uk_flag.svg",
      },
      {
        id: Language.JA,
        image_url: "/images/japan_1.png",
        flag_url: "/images/japan_flag.svg",
      },
    ],
    modes: {
      [Language.EN]: [
        {
          id: Mode.FLASHCARD,
          image_url: "/images/flashcard.png",
          title: "Flashcard",
          description:
            "Choose the corresponding word or sentence. A wrong answer adds an additional card. The first to classify all cards wins !",
        },
      ],
      [Language.FR]: [],
      [Language.JA]: [
        {
          id: Mode.FLASHCARD,
          image_url: "/images/flashcard.png",
          title: "Flashcard",
          description:
            "Choose the corresponding word or sentence. A wrong answer adds an additional card. The first to classify all cards wins !",
        },
        {
          id: Mode.DRAW_IT,
          image_url: "/images/flashcard.png",
          title: "Draw It!",
          description: "Draw and Guess !",
        },
      ],
    },
  });
}
