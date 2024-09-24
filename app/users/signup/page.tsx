import React from "react";
import SignUpForm from "@/app/components/SignUpForm";
import PasswordRequirements from "@/app/components/PasswordRequirements";

const SignupPage = () => {
  return (
    <main className="flex flex-row ">
      <SignUpForm></SignUpForm>
      <PasswordRequirements></PasswordRequirements>
    </main>
  );
};

export default SignupPage;
