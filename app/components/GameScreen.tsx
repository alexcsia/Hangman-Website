import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface PlayerState {
  guessedLetters: string[];
  remainingAttempts: number;
}

interface GameState {
  word: string;
  playerState: PlayerState;
}

const GameScreen = ({
  lobbyId,
  playerId,
}: {
  lobbyId: string;
  playerId: string;
}) => {
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  const [guess, setGuess] = useState<string>("");
  const [gameOver, setGameOver] = useState<string | null>(null);
  const [currentWord, setCurrentWord] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === "https" ? "wss" : "ws";
    const port = window.location.port ? `:${window.location.port}` : "";
    const socketUrl = `${protocol}://${window.location.hostname}${port}`;

    socketRef.current = io(socketUrl);

    socketRef.current.emit("joinLobby", { lobbyId, playerId });

    socketRef.current.on("gameUpdate", (updatedState: GameState) => {
      console.log("Updated State:", updatedState);
      console.log("player state:", updatedState.playerState);
      setPlayerState(updatedState.playerState);
      setCurrentWord(updatedState.word);
    });

    socketRef.current.on("gameOver", (result) => {
      setGameOver(result);
      alert(result);
    });

    return () => {
      socketRef.current?.off("gameUpdate");
      socketRef.current?.off("gameOver");
      socketRef.current?.disconnect();
    };
  }, []);

  const handleGuess = () => {
    console.log(lobbyId);
    console.log(playerId);
    if (socketRef.current && guess) {
      socketRef.current.emit("makeGuess", {
        lobbyId,
        playerId,
        letter: guess.toLowerCase(),
      });
    }
    setGuess("");
  };

  if (!playerState || !currentWord) {
    return <div>Loading game...</div>;
  }
  // TODO: style this
  return (
    <div>
      <h1>Hangman Game</h1>
      {gameOver ? (
        <p>{gameOver}</p>
      ) : (
        <>
          <p>
            Word:{" "}
            {currentWord
              .split("")
              .map((letter, idx) =>
                playerState.guessedLetters.includes(letter) ? letter : "_"
              )
              .join(" ")}
          </p>
          <p>Remaining attempts: {playerState.remainingAttempts}</p>
          <input
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            maxLength={1}
            disabled={gameOver !== null}
          />
          <button onClick={handleGuess} disabled={gameOver !== null}>
            Guess
          </button>
        </>
      )}
    </div>
  );
};

export default GameScreen;
