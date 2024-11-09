"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import DOMPurify from "dompurify";

interface UserData {
  username: string;
  email: string;
  winNum: number;
}

const UserProfile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return;

      try {
        const res = await fetchWithAuth(`/api/users/user/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user profile");
        const data = await res.json();
        setUserData(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
          router.push("/users/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router, userId]);

  const sanitizeMessage = (message: string) => DOMPurify.sanitize(message);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const sanitizedUsername = userData
    ? sanitizeMessage(userData.username)
    : "N/A";

  return (
    <div className="bg-slate-300 mx-auto my-45 w-1/4 h-80 flex flex-col items-center justify-center rounded">
      <label className="text-lg text-gray-800 mb-1">
        Username: <span className="font-semibold">{sanitizedUsername}</span>
      </label>
      <label className="text-lg text-gray-800">
        Email: <span className="font-semibold">{userData?.email || "N/A"}</span>
      </label>
      <label className="text-lg text-gray-800">
        Wins: <span className="font-semibold">{userData?.winNum ?? 0}</span>
      </label>
    </div>
  );
};

export default UserProfile;
