export enum Mode {
  FLASHCARD = "flashcard",
  DRAW_IT = "draw_it",
}
export type ModeInfo = {
  id: Mode;
  image_url?: string;
  title: string;
  description: string;
};
