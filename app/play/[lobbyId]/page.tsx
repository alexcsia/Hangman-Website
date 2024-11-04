"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Chat from "@/app/components/Chat";
import GameScreen from "@/app/components/GameScreen";
import { io, Socket } from "socket.io-client";

const PlayPage = () => {
  const router = useRouter();
  const { lobbyId } = useParams();
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const protocol = window.location.protocol === "https" ? "wss" : "ws";
    const port = window.location.port ? `:${window.location.port}` : "";
    const socketUrl = `${protocol}://${window.location.hostname}${port}`;

    socketRef.current = io(socketUrl);

    socketRef.current.emit("joinLobby", { lobbyId, playerId });

    return () => {
      socketRef.current?.off("joinLobby");
      socketRef.current?.disconnect();
    };
  }, [playerId, lobbyId]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/userInfo");
        if (!response.ok) {
          throw new Error("Unauthorized access");
        }

        const userData = await response.json();
        setPlayerId(userData.id);
        setUsername(userData.username);
      } catch (error: unknown) {
        if (error instanceof Error) {
          router.push("/users/login");
        }
      }
    };

    checkAuthStatus();
  }, [router]);

  if (!lobbyId || typeof lobbyId !== "string" || !playerId || !username) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {" "}
      <div className="flex flex-row items-center justify-center w-auto space-x-10 mx-auto min-h-screen rounded">
        <div>
          <p className="font-bold text-xl text-slate-700 my-20">
            Join code: {code}
          </p>
        </div>
        <div className="flex flex-col rounded bg-slate-300 h-[400px] w-[500px] items-center justify-center">
          <GameScreen
            lobbyId={lobbyId}
            playerId={playerId}
            username={username}
            socketRef={socketRef}
          ></GameScreen>
        </div>
        <div>
          <Chat
            lobbyId={lobbyId}
            playerId={playerId}
            username={username}
            socketRef={socketRef}
          ></Chat>
        </div>
      </div>
    </>
  );
};

export default PlayPage;
