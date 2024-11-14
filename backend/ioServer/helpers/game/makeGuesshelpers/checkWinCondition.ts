export const checkWinCondition = (
  word: string,
  guessedLetters: string[]
): boolean => {
  return word.split("").every((letter) => guessedLetters.includes(letter));
};
