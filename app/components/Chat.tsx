"use client";
import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface ChatProps {
  lobbyId: string;
}

const Chat: React.FC<ChatProps> = ({ lobbyId }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const socketRef = useRef<Socket | null>(null);
  const username = "useeername";

  useEffect(() => {
    const protocol = window.location.protocol === "https" ? "wss" : "ws";
    const port = window.location.port ? `:${window.location.port}` : "";
    const socketUrl = `${protocol}://${window.location.hostname}${port}`;

    console.log("Connecting to:", socketUrl);

    socketRef.current = io(socketUrl);

    socketRef.current.emit("joinLobby", lobbyId);
    console.log("Joining lobby:", lobbyId);

    socketRef.current.on("chat message", ({ msg }) => {
      console.log("Reached");
      console.log("Received message:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socketRef.current?.off("chat message");
      socketRef.current?.disconnect();
    };
  }, [lobbyId]);

  const sendMessage = () => {
    console.log("Sending messages:", messages);
    if (input.trim() && socketRef.current) {
      socketRef.current.emit("chat message", {
        lobbyId,
        msg: `${username}: ${input}`,
      });
      setInput("");
    }
  };

  return (
    <div>
      <h1>Chat with your opponent</h1>
      <div className="border border-black p-2 mb-2 h-[300px] overflow-y-scroll">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-300 p-2 w-full"
          placeholder="Type your message"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
