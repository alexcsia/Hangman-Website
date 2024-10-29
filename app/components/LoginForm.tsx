"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log(response);

      if (!response.ok) {
        setIsSuccessful(false);

        const errorData = await response.json();
        setErrorMessage(errorData.message);
        return;
      } else {
        setIsSuccessful(true);

        const data = await response.json();
        const token = data.token;
        sessionStorage.setItem("token", token);
      }

      setEmail("");
      setPassword("");
      setErrorMessage("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Authentication error", error.message);
        setErrorMessage(error.message);
      }
    }
  };

  useEffect(() => {
    if (isSuccessful) {
      router.push("/");
      setEmail("");
      setPassword("");
      setErrorMessage("");
    }
  }, [isSuccessful, router]);

  return (
    <>
      <div className="bg-slate-300 mx-auto my-52 w-1/4 h-80 flex flex-col items-center justify-center rounded">
        <form
          className="flex flex-col items-center justify-center "
          onSubmit={handleSubmit}
        >
          <header className="mt-4 format-text mb-2 format-header">Login</header>
          <label className="text-left w-full my-2 text-slate-700">Email</label>
          <input
            type="text"
            placeholder="Email"
            className="border border-gray-300 rounded px-1"
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <label className="text-left w-full my-2 text-slate-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded px-1"
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <button
            type="submit"
            className="my-4 w-auto px-4 font-medium text-xl"
          >
            Login
          </button>
        </form>
        {errorMessage && (
          <div>
            <label className="text-red-500">{errorMessage}</label>
          </div>
        )}
        <Link
          href="/users/signup"
          className="mb-2 text-s underline font-semibold text-slate-700"
        >
          Don&apos;t have an account?
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
