"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface userData {
  username: string;
  email: string;
  winNum: number;
}

const UserProfile = () => {
  const [userData, setUserData] = useState<userData>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`/api/users/user/${userId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await res.json();
        console.log("data received:", data);
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
        <label className="text-lg text-gray-800">
          Wins:
          <span className="font-semibold">{userData?.winNum.valueOf()}</span>
        </label>
      </div>
    </>
  );
};

export default UserProfile;
