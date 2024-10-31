import React from "react";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { decode } from "punycode";

interface ProfileBtnProps {
  token: string;
}

interface DecodedToken {
  id: string;
  email: string;
  username: string;
}

const ProfileBtn: React.FC<ProfileBtnProps> = ({ token }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const router = useRouter();

  const handleClick = () => {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      router.push(`/users/profile/${decodedToken.id}`);
    } catch (error) {
      console.error("Invalid token:", error);
      sessionStorage.removeItem("token");
      setErrorMessage("Please log in first");
    }
  };

  return (
    <>
      <button
        className="block mx-4 p-1 font-semibold text-md text-white rounded-md px-6"
        onClick={handleClick}
      >
        Profile
      </button>
      {errorMessage && (
        <div>
          <label className="text-red-500">{errorMessage}</label>
        </div>
      )}
    </>
  );
};

export default ProfileBtn;
