import React from "react";

const ConnectPage = () => {
  return (
    <main>
      <div>
        <header className="format-header">Put your invite code here</header>
        <form>
          <input placeholder="xxxx-xxxx"></input>
          <button
            type="submit"
            className="my-4 ml-3 w-auto px-4 font-medium text-xl"
          >
            Go
          </button>
        </form>
      </div>
      <div className="  flex flex-col items-center">
        <header className="format-header">or</header>
        <br></br>
        <header className=" !text-slate-500 underline format-header ">
          Create new invite code
        </header>
        <label className="font-semibold text-slate-700 text-xl pt-4">
          1234-5678
        </label>
      </div>
    </main>
  );
};

export default ConnectPage;
