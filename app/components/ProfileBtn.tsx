"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProfileButton = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleProfileClick = async () => {
    try {
      const res = await fetch("/api/userInfo", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const userData = await res.json();
      const userId = userData.id;

      router.push(`/users/profile/${userId}`);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Failed to load profile.");
    }
  };

  return (
    <>
      <button onClick={handleProfileClick}>Profile</button>
      {error && <p>{error}</p>}
    </>
  );
};

export default ProfileButton;
