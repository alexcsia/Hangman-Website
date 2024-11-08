export interface PlayerState {
  guessedLetters: string[];
  remainingAttempts: number;
}

export interface GameState {
  word: string;
  players: Record<string, PlayerState>;
}

export const lobbies: Record<string, GameState> = {};
export const rematchCounts: Record<string, Set<string>> = {};
