"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/registration/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        setErrorMessage(errorData.message);
        return;
      } else {
        setIsSuccessful(true);
        const data = await response.json();
        console.log(data);
      }

      setUsername("");
      setEmail("");
      setPassword("");
      setErrorMessage("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Registration error", error.message);
        setErrorMessage(error.message);
      }
    }
  };

  useEffect(() => {
    if (isSuccessful) {
      router.push("/");
      setUsername("");
      setEmail("");
      setPassword("");
      setErrorMessage("");
    }
  }, [isSuccessful, router]);

  return (
    <div className="bg-slate-300 mx-1/2 my-1/2  w-1/3 h-3/4 flex flex-col items-center justify-center rounded">
      <header className="mb-10 !text-3xl format-header">
        Create an account
      </header>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center mb-10"
      >
        <label className="text-left w-full my-2 text-slate-700">Username</label>
        <input
          type="text"
          placeholder="Username"
          className="border border-gray-300 rounded px-1"
          onChange={(e) => setUsername(e.target.value)}
          maxLength={20}
          required
        ></input>
        <label className="text-left w-full my-2 text-slate-700">Email</label>
        <input
          type="email"
          placeholder="Username"
          className="border border-gray-300 rounded px-1"
          onChange={(e) => setEmail(e.target.value)}
          maxLength={254}
          required
        ></input>
        <label className="text-left w-full my-2 text-slate-700">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded px-1"
          onChange={(e) => setPassword(e.target.value)}
          maxLength={64}
          required
        ></input>
        <button type="submit" className="my-4 w-auto px-4 font-medium text-xl">
          Register
        </button>
        {errorMessage && (
          <div>
            <label className="text-red-500">{errorMessage}</label>
          </div>
        )}
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
