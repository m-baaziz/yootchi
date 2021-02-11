import { Language, Mode } from "../../src/types/game";
import { Presets, Step } from "../../src/types/play";
import { parsePresets, serializePresets } from "../../src/lib/play";

type TestCase = {
  presets: Presets;
  hash: string;
  afterParsePresets?: Presets;
};

describe("Play page", () => {
  const testCases: TestCase[] = [
    {
      presets: {
        step: Step.LANGUAGE,
        language: Language.JA,
        mode: Mode.FLASHCARD,
      },
      hash:
        "eyJzdGVwIjoiTGFuZ3VhZ2UiLCJsYW5ndWFnZSI6ImphcGFuZXNlIiwibW9kZSI6ImZsYXNoY2FyZCJ9",
    },
    {
      presets: {
        step: Step.LOBBY,
        language: Language.EN,
        mode: Mode.DRAW_IT,
      },
      hash:
        "eyJzdGVwIjoiTG9iYnkiLCJsYW5ndWFnZSI6ImVuZ2xpc2giLCJtb2RlIjoiZHJhd19pdCJ9",
    },
    {
      presets: {
        step: Step.LOBBY,
        language: Language.EN,
      },
      hash: "eyJzdGVwIjoiTG9iYnkiLCJsYW5ndWFnZSI6ImVuZ2xpc2gifQ==",
      afterParsePresets: {
        step: Step.MODE,
        language: Language.EN,
      },
    },
  ];

  test.each(testCases)("serialize presets (%#)", async (testCase: TestCase) => {
    const result = await serializePresets(testCase.presets);
    expect(result).toBe(testCase.hash);
  });

  test.each(testCases)("parse presets (%#)", async (testCase: TestCase) => {
    const result = await parsePresets(testCase.hash);
    expect(result).toEqual(testCase.afterParsePresets || testCase.presets);
  });
});
