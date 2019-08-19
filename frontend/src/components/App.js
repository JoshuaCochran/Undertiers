import React from "react";
import NavBar from "./NavBar";
import Main from "./Main";
import UserStore from "./UserStore";

export default function App() {
  return (
    <UserStore>
      <div style={{ marginTop: "45px" }}>
        <NavBar />
        <Main />
      </div>
    </UserStore>
  );
}
