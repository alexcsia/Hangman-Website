"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IUser } from "../backend/model";

const UserProfile = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { userId } = useParams();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found, please log in.");
      setLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      if (!userId) return;

      try {
        const res = await fetch(`/api/users/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await res.json();
        setUserData(data);
      } catch (error: any) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-slate-300 mx-auto my-52 w-1/4 h-80 flex flex-col items-center justify-center rounded">
      <label>Username: {userData?.username}</label>
      <label>Email: {userData?.email}</label>
    </div>
  );
};

export default UserProfile;
