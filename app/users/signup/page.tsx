import React from "react";
import SignUpForm from "@/app/components/SignUpForm";
import PasswordRequirements from "@/app/components/PasswordRequirements";
import Link from "next/link";

const SignupPage = () => {
  return (
    <main className="flex flex-row ">
      <div className=" mx-2">
        <Link href="/" className="custom-link p-3">
          Home
        </Link>
      </div>
      <SignUpForm></SignUpForm>
      <PasswordRequirements></PasswordRequirements>
    </main>
  );
};

export default SignupPage;
