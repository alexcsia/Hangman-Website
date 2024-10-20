import React from "react";
import Link from "next/link";

const HomePageMenu = () => {
  return (
    <>
      <div className="bg-inherit flex items-center justify-center my-17 w-1/3 mx-auto">
        <header className="format-header !text-4xl">
          How&apos;s it hanging?
        </header>
      </div>

      <div className="flex flex-col space-y-4 mx-auto my-10 w-1/4">
        <Link
          href="/users/signup"
          className=" custom-link mb-7 h-15 text-center text-2xl flex items-center justify-center"
        >
          PLAY
        </Link>
        <Link href="/users/login" className="custom-link">
          Login
        </Link>

        <Link href="/users/signup" className="custom-link">
          Sign Up
        </Link>
      </div>

      <div className="flex flex-row">
        <Link href="/users/signup" className="custom-link p-3">
          About
        </Link>
      </div>
    </>
  );
};

export default HomePageMenu;
