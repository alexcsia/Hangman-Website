"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import Chat from "@/app/components/Chat";

const PlayPage = () => {
  const router = useRouter();
  const { lobbyId } = useParams();

  if (!lobbyId || typeof lobbyId !== "string") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Chat lobbyId={lobbyId}></Chat>
    </div>
  );
};

export default PlayPage;
