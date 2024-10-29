"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Chat from "@/app/components/Chat";
import GameScreen from "@/app/components/GameScreen";

interface DecodedToken {
  id: string;
  email: string;
  username: string;
}

const PlayPage = () => {
  const router = useRouter();
  const { lobbyId } = useParams();
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      router.push("/users/login");
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      setPlayerId(decoded.id);
      setUsername(decoded.username);
    } catch (error) {
      console.error("Invalid token:", error);
      sessionStorage.removeItem("token");
      router.push("/users/login");
    }
  }, [router]);

  if (!lobbyId || typeof lobbyId !== "string" || !playerId || !username) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Chat lobbyId={lobbyId} playerId={playerId} username={username}></Chat>
      <GameScreen lobbyId={lobbyId} playerId={playerId}></GameScreen>
    </div>
  );
};

export default PlayPage;
