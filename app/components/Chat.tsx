"use client";
import React, { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import DOMPurify from "dompurify";

interface ChatProps {
  lobbyId: string;
  playerId: string;
  username: string;
  socketRef: React.MutableRefObject<Socket | null>;
}

const Chat: React.FC<ChatProps> = ({
  lobbyId,
  playerId,
  username,
  socketRef,
}) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const maxMessageSize = 200;

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) setMessages(JSON.parse(savedMessages));
  }, []);

  useEffect(() => {
    socketRef.current?.on("chat message", ({ msg }) => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, msg];
        return newMessages;
      });
    });

    return () => {
      socketRef.current?.off("chat message");
      localStorage.removeItem("chatMessages");
    };
  }, [lobbyId, playerId, socketRef]);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

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
      <h1 className="text-slate-700">Chat with your opponent</h1>
      <div className="border rounded border-gray-700 p-2 mb-2 h-[300px] w-[300px] overflow-y-scroll">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>

      <div className="flex items-center space-x-2 ">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-300 p-2 rounded"
          placeholder="Type your message"
          maxLength={200}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-3 py-1 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
