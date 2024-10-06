import React from "react";
import GenerateCode from "@/app/components/GenerateCode";
import SearchLobby from "@/app/components/SearchCode";

const ConnectPage = () => {
  return (
    <main>
      <SearchLobby></SearchLobby>
      <GenerateCode></GenerateCode>
    </main>
  );
};

export default ConnectPage;
