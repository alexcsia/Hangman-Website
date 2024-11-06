"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Chat from "@/app/components/Chat";
import GameScreen from "@/app/components/GameScreen";
import { io, Socket } from "socket.io-client";
import { fetchWithAuth } from "@/app/utils/fetchWithAuth";

const PlayPage = () => {
  const router = useRouter();
  const { lobbyId } = useParams();
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const socketRef = useRef<Socket | null>(null);
  const [isSocketReady, setIsSocketReady] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetchWithAuth("/api/userInfo");
        if (!response.ok) {
          throw new Error("Authentication failed");
        }

        const userData = await response.json();
        setPlayerId(userData.id);
        setUsername(userData.username);
      } catch {
        router.push("/users/login");
      }
    };

    checkAuthStatus();
  }, [router]);

  useEffect(() => {
    if (!playerId || !lobbyId) return;

    const initializeSocket = () => {
      const protocol = window.location.protocol === "https:" ? "wss" : "ws";
      const port = window.location.port ? `:${window.location.port}` : "";
      const socketUrl = `${protocol}://${window.location.hostname}${port}`;

      socketRef.current = io(socketUrl);
      socketRef.current.on("connect", () => {
        socketRef.current?.emit("joinLobby", { lobbyId, playerId });
        setIsSocketReady(true);
      });

      socketRef.current.on("disconnect", () => {
        setIsSocketReady(false);
      });

      return () => {
        socketRef.current?.disconnect();
        socketRef.current = null;
      };
    };

    const cleanupSocket = initializeSocket();
    return cleanupSocket;
  }, [playerId, lobbyId]);

  if (!lobbyId || typeof lobbyId !== "string" || !playerId || !username) {
    return <div>Loading...</div>;
  }

  if (!isSocketReady) {
    return <div>Connecting to game...</div>;
  }

  return (
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
        />
      </div>
      <div>
        <Chat
          lobbyId={lobbyId}
          playerId={playerId}
          username={username}
          socketRef={socketRef}
        />
      </div>
    </div>
  );
};

export default PlayPage;
