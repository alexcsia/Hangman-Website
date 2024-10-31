"use client";
import React from "react";
import UserProfile from "@/app/components/UserProfile";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

interface DecodedToken {
  id: string;
  username: string;
  exp: number;
  email: string;
}

const ProfilePage = () => {
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
      <div className=" mb-1 mr-80">
        <Link href="/" className="custom-link p-3">
          Home
        </Link>
      </div>
      <UserProfile token={token || ""}></UserProfile>
    </main>
  );
};

export default ProfilePage;
