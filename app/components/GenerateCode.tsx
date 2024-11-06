"use client";
import React from "react";
import { useState } from "react";
import { fetchWithAuth } from "../utils/fetchWithAuth";

const GenerateCode = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleClick = async () => {
    try {
      const response = await fetchWithAuth("/api/play/generate");
      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message);
        throw new Error(data.message);
      }

      window.location.href = data.redirectUrl;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Authentication error", error);
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="  flex flex-col items-center">
      <header className="format-header">or</header>
      <br></br>
      <button className="px-2" onClick={handleClick}>
        Create new lobby
      </button>
      {errorMessage && (
        <div>
          <label className="text-red-500">{errorMessage}</label>
        </div>
      )}
    </div>
  );
};

export default GenerateCode;
