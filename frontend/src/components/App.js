import React from "react";
import NavBar from "./NavBar";
import Main from "./Main";
import UserStore from "./UserStore";
import BoardStore from "./BoardStore";

export default function App() {
  return (
    <UserStore>
      <BoardStore>
        <div style={{ marginTop: "45px" }}>
          <NavBar />
          <Main />
        </div>
      </BoardStore>
    </UserStore>
  );
}
