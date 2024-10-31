import React from "react";
import { jwtDecode } from "jwt-decode";

interface ProfileBtnProps {
  token: string;
}

const ProfileBtn: React.FC<ProfileBtnProps> = ({ token }) => {
  const handleClick = () => {};

  return (
    <button
      className="block mx-4 p-1 font-semibold text-md text-white rounded-md px-6"
      onClick={handleClick}
    >
      Profile
    </button>
  );
};

export default ProfileBtn;
