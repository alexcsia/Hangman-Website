"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchLobby = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [lobbyCode, setLobbyCode] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMessage("Please log in first");
      return;
    } else {
      setToken(token);
    }

    try {
      const response = await fetch("/api/play/find", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ lobbyCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        return;
      } else {
        const { lobbyId } = await response.json();
        router.push(`/play/${lobbyId}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Authentication error", error.message);
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div>
      <header className="format-header">Put your invite code here</header>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="xxxx-xxxx"
          onChange={(e) => {
            setLobbyCode(e.target.value);
          }}
        ></input>
        <button
          type="submit"
          className="my-4 ml-3 w-auto px-4 font-medium text-xl"
        >
          Go
        </button>
      </form>

      {errorMessage && (
        <div>
          <label className="text-red-500">{errorMessage}</label>
        </div>
      )}
    </div>
  );
};

export default SearchLobby;
