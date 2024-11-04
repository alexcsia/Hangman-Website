"use client";
import React from "react";
import GenerateCode from "@/app/components/GenerateCode";
import SearchLobby from "@/app/components/SearchCode";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ConnectPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/userInfo");
        if (!response.ok) {
          throw new Error("Unauthorized access");
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
        router.push("/users/login");
      }
    };

    checkAuthStatus();
  }, [router]);

  return (
    <main>
      <div className="mb-12 mr-80">
        <Link href="/" className="custom-link p-3">
          Home
        </Link>
      </div>
      <SearchLobby></SearchLobby>
      <GenerateCode></GenerateCode>
    </main>
  );
};

export default ConnectPage;
