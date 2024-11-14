"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/registration/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        setErrorMessage(errorData.message);
        return;
      } else {
        setIsSuccessful(true);
      }

      setFormData({ username: "", email: "", password: "" });
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
      setFormData({ username: "", email: "", password: "" });
      setErrorMessage("");
    }
  }, [isSuccessful, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
          name="username"
          placeholder="Username"
          className="border border-gray-300 rounded px-1"
          value={formData.username}
          onChange={handleChange}
          maxLength={20}
          required
        />
        <label className="text-left w-full my-2 text-slate-700">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-gray-300 rounded px-1"
          value={formData.email}
          onChange={handleChange}
          maxLength={254}
          required
        />
        <label className="text-left w-full my-2 text-slate-700">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border border-gray-300 rounded px-1"
          value={formData.password}
          onChange={handleChange}
          maxLength={64}
          required
        />
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
