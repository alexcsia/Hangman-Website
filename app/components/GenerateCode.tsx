"use client";
import React from "react";
import { useState, useEffect } from "react";

const GenerateCode = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setErrorMessage("Please log in first");
      return;
    } else {
      setToken(token);
    }
  }, [code]);

  const handleClick = async () => {
    try {
      const response = await fetch("/api/play/generate", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        return;
      } else {
        const data = await response.json();
        setCode(data.code);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Authentication error", error.message);
        setErrorMessage(error.message);
      }
    }
  };
  return (
    <div className="  flex flex-col items-center">
      <header className="format-header">or</header>
      <br></br>
      <button className="px-2" onClick={handleClick}>
        Create new invite code
      </button>
      <label className="font-semibold text-slate-700 text-xl pt-4">
        {code ? code : "xxxx-xxxx"}
      </label>
      {errorMessage && (
        <div>
          <label className="text-red-500">{errorMessage}</label>
        </div>
      )}
    </div>
  );
};

export default GenerateCode;
