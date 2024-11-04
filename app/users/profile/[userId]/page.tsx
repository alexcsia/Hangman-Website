"use client";
import React from "react";
import UserProfile from "@/app/components/UserProfile";
import Link from "next/link";

const ProfilePage = () => {
  return (
    <main>
      <div className=" mb-1 mr-80">
        <Link href="/" className="custom-link p-3">
          Home
        </Link>
      </div>
      <UserProfile></UserProfile>
    </main>
  );
};

export default ProfilePage;
