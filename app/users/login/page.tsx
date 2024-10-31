import React from "react";
import LoginForm from "@/app/components/LoginForm";
import Link from "next/link";
const LoginPage = () => {
  return (
    <main>
      <div className="mt-15 mb-1 mr-80">
        <Link href="/" className="custom-link p-3">
          Home
        </Link>
      </div>
      <LoginForm></LoginForm>
    </main>
  );
};

export default LoginPage;
