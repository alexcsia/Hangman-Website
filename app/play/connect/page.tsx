"use client";
import React from "react";
import GenerateCode from "@/app/components/GenerateCode";
import SearchLobby from "@/app/components/SearchCode";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ConnectPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log("token", token);
    if (!token) {
      router.push("/users/login");
      return;
    }
  }, []);

  return (
    <main>
      <SearchLobby></SearchLobby>
      <GenerateCode></GenerateCode>
    </main>
  );
};

export default ConnectPage;
