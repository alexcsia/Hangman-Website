import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    const protocol = window.location.protocol === "https" ? "wss" : "ws";
    const port = window.location.port ? `:${window.location.port}` : "";
    const socketUrl = `${protocol}://${window.location.hostname}${port}`;

    socketRef.current = io(socketUrl);

    socketRef.current.emit("joinLobby", { lobbyId, playerId });

    socketRef.current.on("gameOver", (result) => {
      setGameOver(result);
    });

    socketRef.current?.on("gameUpdate", (updatedState) => {
      setPlayerState(updatedState.playerState);
      setCurrentWord(updatedState.word);
    });

    socketRef.current.on("matchQuit", () => {
      socketRef.current?.disconnect();
      router.push("/");
    });

    return () => {
      socketRef.current?.off("gameOver");
      socketRef.current?.disconnect();
    };
  }, [playerId, lobbyId]);

  const handleGuess = () => {
    if (socketRef.current && guess) {
      console.log("Guessing:", guess);
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
    setPlayerState(null);
    setGameOver(null);
    setCurrentWord("");
    socketRef.current?.emit("rematch", { lobbyId, playerId });
  };

  const handleQuit = () => {
    socketRef.current?.emit("quit", { lobbyId, playerId });
    socketRef.current?.disconnect();
    router.push("/");
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
          <button onClick={handleQuit}>Quit to homepage</button>
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
