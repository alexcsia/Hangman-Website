import React from "react";

const PasswordRequirements = () => {
  return (
    <div className="bg-slate-300 rounded p-3 ml-5">
      <header className="format-header !text-lg">Passwords must:</header>
      <ul className="p-3 list-disc my-2 text-slate-700">
        <li>be at least 10 characters long</li>
        <li>have a minimum of 1 lowercase characters</li>
        <li>have a minimum of 1 uppercase characters</li>
        <li>contain 1 or more digits</li>
        <li>contain 1 or more special symbols</li>
      </ul>
    </div>
  );
};

export default PasswordRequirements;
