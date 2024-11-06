"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProfileBtn from "./ProfileBtn";
import LogoutBtn from "./LogoutBtn";
import { fetchWithAuth } from "../utils/fetchWithAuth";

const HomePageMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetchWithAuth("/api/userInfo");
        if (!response.ok) throw new Error("Authentication failed");
        const userData = await response.json();
        setUserId(userData.id);
        if (userData) setIsLoggedIn(true);
        else setIsLoggedIn(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error checking authentication status");
          setIsLoggedIn(false);
        }
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <>
      <div className="bg-inherit flex items-center justify-center my-17 w-1/3 mx-auto">
        <header className="format-header !text-4xl">
          How&apos;s it hanging?
        </header>
      </div>

      <div className="flex flex-col space-y-4 mx-auto my-10 w-1/4">
        <Link
          href="/play/connect"
          className="custom-link mb-7 h-15 text-center text-2xl flex items-center justify-center"
        >
          PLAY
        </Link>

        {!isLoggedIn && (
          <>
            <Link href="/users/login" className="custom-link">
              Login
            </Link>

            <Link href="/users/signup" className="custom-link">
              Sign Up
            </Link>
          </>
        )}
      </div>

      <div className="flex flex-col space-y-4">
        {isLoggedIn && (
          <>
            {" "}
            <ProfileBtn userId={userId} /> <LogoutBtn />{" "}
          </>
        )}

        <Link href="/about" className="ml-2 custom-link p-3 w-20">
          About
        </Link>
      </div>
    </>
  );
};

export default HomePageMenu;
