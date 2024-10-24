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

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setPlayerId(decoded.id);
      } catch (error) {
        console.error("Invalid token:", error);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  if (!lobbyId || typeof lobbyId !== "string" || !playerId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Chat lobbyId={lobbyId} playerId={playerId}></Chat>
      <GameScreen lobbyId={lobbyId} playerId={playerId}></GameScreen>
    </div>
  );
};

export default PlayPage;
