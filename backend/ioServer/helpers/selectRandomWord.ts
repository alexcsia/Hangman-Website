import { Word } from "../../modules/models/Word.ts";

export const selectRandomWord = async () => {
  const [randomWord] = await Word.aggregate([{ $sample: { size: 1 } }]);
  return randomWord ? randomWord.word : null;
};
