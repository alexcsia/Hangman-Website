interface PlayerState {
  guessedLetters: string[];
  remainingAttempts: number;
}

interface Lobby {
  word: string;
}
export const makeGuess = (
  playerState: PlayerState,
  lobby: Lobby,
  letter: string
) => {
  if (!playerState.guessedLetters.includes(letter)) {
    playerState.guessedLetters.push(letter);

    if (!lobby.word.includes(letter)) {
      playerState.remainingAttempts--;
    }
  }
};
