"use client";
import React, { useState } from "react";
import GenerateCode from "@/app/components/GenerateCode";
import SearchLobby from "@/app/components/SearchCode";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  username: string;
  exp: number;
  email: string;
}

const ConnectPage = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/users/login");
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      const isTokenExpired = decoded.exp * 1000 < Date.now();

      if (isTokenExpired) {
        sessionStorage.removeItem("token");
        router.push("/users/login");
      } else {
        setToken(token);
      }
    } catch {
      router.push("/users/login");
    }
  }, [router]);

  return (
    <main>
      <SearchLobby token={token || ""}></SearchLobby>
      <GenerateCode token={token || ""}></GenerateCode>
    </main>
  );
};

export default ConnectPage;
