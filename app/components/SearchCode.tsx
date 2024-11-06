"use client";
import React from "react";
import { useState } from "react";
import { fetchWithAuth } from "../utils/fetchWithAuth";

const SearchLobby = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [lobbyCode, setLobbyCode] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetchWithAuth("/api/play/find", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lobbyCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        return;
      } else {
        const data = await response.json();
        window.location.href = data.redirectUrl;
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
