import React from "react";
import Link from "next/link";

const SignUpForm = () => {
  return (
    <div className="bg-slate-300 mx-auto my-auto w-1/3 h-3/4 flex flex-col items-center justify-center rounded">
      <header className="mb-10 !text-3xl format-header">
        Create an account
      </header>
      <form className="flex flex-col items-center justify-center mb-10">
        <label className="text-left w-full my-2 text-slate-700">Username</label>
        <input
          type="text"
          placeholder="Username"
          className="border border-gray-300 rounded px-1"
        ></input>
        <label className="text-left w-full my-2 text-slate-700">Email</label>
        <input
          type="email"
          placeholder="Username"
          className="border border-gray-300 rounded px-1"
        ></input>
        <label className="text-left w-full my-2 text-slate-700">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded px-1"
        ></input>
        <button type="submit" className="my-4 w-auto px-4 font-medium text-xl">
          Register
        </button>
      </form>
      <Link
        href="/users/login"
        className="mb-2 text-s underline font-semibold text-slate-700"
      >
        Login here
      </Link>
    </div>
  );
};

export default SignUpForm;
