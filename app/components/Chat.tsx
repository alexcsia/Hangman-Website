"use client";
import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import DOMPurify from "dompurify";

interface ChatProps {
  lobbyId: string;
  playerId: string;
  username: string;
}

const Chat: React.FC<ChatProps> = ({ lobbyId, playerId, username }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const socketRef = useRef<Socket | null>(null);
  const maxMessageSize = 200;

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) setMessages(JSON.parse(savedMessages));
  }, []);

  useEffect(() => {
    const protocol = window.location.protocol === "https" ? "wss" : "ws";
    const port = window.location.port ? `:${window.location.port}` : "";
    const socketUrl = `${protocol}://${window.location.hostname}${port}`;

    socketRef.current = io(socketUrl);
    socketRef.current.emit("joinLobby", { lobbyId, playerId });

    socketRef.current.on("chat message", ({ msg }) => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, msg];
        localStorage.setItem("chatMessages", JSON.stringify(newMessages));
        return newMessages;
      });
    });

    return () => {
      socketRef.current?.off("chat message");
      socketRef.current?.disconnect();
      localStorage.removeItem("chatMessages");
    };
  }, [lobbyId, messages, playerId]);

  const sendMessage = () => {
    if (input.trim() && socketRef.current) {
      const sanitizedMsg = DOMPurify.sanitize(input);
      const sanitizedUsername = DOMPurify.sanitize(username);
      if (sanitizedMsg.length > maxMessageSize) return;

      socketRef.current.emit("chat message", {
        lobbyId,
        msg: `${sanitizedUsername}: ${sanitizedMsg}`,
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
          maxLength={200}
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
