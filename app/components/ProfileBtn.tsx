"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface ProfileBtnProps {
  userId: string;
}

const ProfileButton: React.FC<ProfileBtnProps> = ({ userId }) => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleProfileClick = async () => {
    try {
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
