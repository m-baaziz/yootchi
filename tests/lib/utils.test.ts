import { Mode, ModeInfo } from "../../src/types/game";
import { Step } from "../../src/types/play";
import { ALL_STEPS } from "../../src/lib/play";
import { getNext, getPrevious } from "../../src/lib/utils";

type TestCase<T, U> = {
  sortedArray: T[];
  currentValue: U;
  nextValue: U | null;
  previousValue: U | null;
  mapper?: (source: T) => U;
};

const ALL_MODE_INFOS: ModeInfo[] = [
  {
    id: Mode.FLASHCARD,
    image_url: "/images/flashcard.png",
    title: "Flashcard",
    description:
      "Choose the corresponding word or sentence. A wrong answer adds an additional card. The first to classify all cards wins !",
  },
  {
    id: Mode.DRAW_IT,
    image_url: "/images/draw_it.png",
    title: "Draw It!",
    description: "Draw and Guess !",
  },
];

describe("Utils", () => {
  describe("getNext & getPrevious", () => {
    const stepTestCases: TestCase<Step, Step>[] = [
      {
        sortedArray: ALL_STEPS,
        currentValue: Step.MODE,
        nextValue: Step.LOBBY,
        previousValue: Step.LANGUAGE,
      },
      {
        sortedArray: ALL_STEPS,
        currentValue: Step.LOBBY,
        nextValue: null,
        previousValue: Step.MODE,
      },
      {
        sortedArray: ALL_STEPS,
        currentValue: Step.LANGUAGE,
        nextValue: Step.MODE,
        previousValue: null,
      },
    ];

    const modeTestCases: TestCase<ModeInfo, Mode>[] = [
      {
        sortedArray: ALL_MODE_INFOS,
        currentValue: Mode.FLASHCARD,
        nextValue: Mode.DRAW_IT,
        previousValue: null,
        mapper: (source: ModeInfo) => source.id,
      },
      {
        sortedArray: ALL_MODE_INFOS,
        currentValue: Mode.DRAW_IT,
        nextValue: null,
        previousValue: Mode.FLASHCARD,
        mapper: (source: ModeInfo) => source.id,
      },
    ];

    test.each(stepTestCases)(
      "[step] getNext (%#)",
      (testCase: TestCase<Step, Step>) => {
        const result = getNext(
          testCase.sortedArray,
          testCase.currentValue,
          testCase.mapper
        );

        expect(result).toEqual(testCase.nextValue);
      }
    );

    test.each(stepTestCases)(
      "[step] getPrevious (%#)",
      async (testCase: TestCase<Step, Step>) => {
        const result = getPrevious(
          testCase.sortedArray,
          testCase.currentValue,
          testCase.mapper
        );

        expect(result).toEqual(testCase.previousValue);
      }
    );

    test.each(modeTestCases)(
      "[mode] getNext (%#)",
      (testCase: TestCase<ModeInfo, Mode>) => {
        const result = getNext(
          testCase.sortedArray,
          testCase.currentValue,
          testCase.mapper
        );

        expect(result).toEqual(testCase.nextValue);
      }
    );

    test.each(modeTestCases)(
      "[mode] getPrevious (%#)",
      async (testCase: TestCase<ModeInfo, Mode>) => {
        const result = getPrevious(
          testCase.sortedArray,
          testCase.currentValue,
          testCase.mapper
        );

        expect(result).toEqual(testCase.previousValue);
      }
    );
  });
});
