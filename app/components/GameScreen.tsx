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
  username,
}: {
  lobbyId: string;
  playerId: string;
  username: string;
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
      setPlayerState(updatedState.playerState);
      setCurrentWord(updatedState.word);
    });

    socketRef.current.on("gameOver", (result) => {
      setGameOver(result);
      //fetch to update lobby
    });

    return () => {
      socketRef.current?.off("gameUpdate");
      socketRef.current?.off("gameOver");
      socketRef.current?.disconnect();
    };
  }, [playerId, lobbyId]);

  const handleGuess = () => {
    if (socketRef.current && guess) {
      socketRef.current.emit("makeGuess", {
        lobbyId,
        playerId,
        letter: guess.toLowerCase(),
        username,
      });
    }
    setGuess("");
  };

  const handleRematch = () => {
    socketRef.current?.emit("rematch", { lobbyId, playerId });
    setGameOver(null);
    console.log(playerState);
  };

  if (!playerState || !currentWord) {
    return <div>Loading game...</div>;
  }

  return (
    <div>
      <h1 className="text-center text-xl font-semibold text-slate-600 mb-3 ">
        Hangman Game
      </h1>
      {gameOver ? (
        <>
          <p className="text-2xl font-semibold text-slate-600 mb-3">
            {gameOver}
          </p>
          <button onClick={handleRematch}>Rematch</button>
        </>
      ) : (
        <>
          <p className="font-bold text-3xl text-slate-700 my-20">
            Word:{" "}
            {currentWord
              .split("")
              .map((letter) =>
                playerState.guessedLetters.includes(letter) ? letter : "_"
              )
              .join(" ")}
          </p>

          <input
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            maxLength={1}
            disabled={gameOver !== null}
            className="rounded mx-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleGuess();
            }}
          />
          <button
            onClick={handleGuess}
            disabled={gameOver !== null}
            className="my-2 px-2"
          >
            Guess
          </button>
          <p className="text-lg font-semibold text-slate-600 mb-3">
            Remaining attempts: {playerState.remainingAttempts}
          </p>
        </>
      )}
    </div>
  );
};

export default GameScreen;
