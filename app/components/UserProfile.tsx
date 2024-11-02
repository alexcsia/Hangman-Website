"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { IUser } from "../../backend/modules/models/User";

interface UserProfileProps {
  token: string | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ token }) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { userId } = useParams();

  useEffect(() => {
    if (token === null) {
      setError("Please log in first");
      setLoading(false);
      return;
    }
  }, [token]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId || !token) return;

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
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error);
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token, userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="bg-slate-300 mx-auto my-45 w-1/4 h-80 flex flex-col items-center justify-center rounded">
        <label className="text-lg text-gray-800 mb-1">
          Username: <span className="font-semibold">{userData?.username}</span>
        </label>
        <label className="text-lg text-gray-800">
          Email: <span className="font-semibold">{userData?.email}</span>
        </label>
      </div>
    </>
  );
};

export default UserProfile;
