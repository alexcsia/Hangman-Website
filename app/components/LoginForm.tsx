import React from "react";
import Link from "next/link";

const LoginForm = () => {
  return (
    <>
      <div className="bg-slate-300 mx-auto my-52 w-1/4 h-80 flex flex-col items-center justify-center rounded">
        <form className="flex flex-col items-center justify-center ">
          <header className="mt-4 format-text mb-2 format-header">Login</header>
          <label className="text-left w-full my-2 text-slate-700">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-300 rounded px-1"
          ></input>
          <label className="text-left w-full my-2 text-slate-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded px-1"
          ></input>
          <button
            type="submit"
            className="my-4 w-auto px-4 font-medium text-xl"
          >
            Login
          </button>
        </form>
        <Link
          href="/users/signup"
          className="mb-2 text-s underline font-semibold text-slate-700"
        >
          Don't have an account?
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
