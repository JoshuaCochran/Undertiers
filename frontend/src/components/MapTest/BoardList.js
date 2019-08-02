import React, { useState, useContext } from "react";
import { GetBoards } from "../Login";
import BoardCard from "./BoardCard";
import { UserContext } from "../usercontext";

function renderBoardCard(item, i) {
  return (
    <div key={i}>
      <BoardCard
        id={item.id}
        name={item.name}
        owner={item.user}
        description={item.description}
      />
    </div>
  );
}

function renderBoardCards(boardData) {
  const boardCards = [];
  boardData.map((item, i) => {
    boardCards.push(renderBoardCard(item, i));
  });
  return boardCards;
}

export default function BoardList(children) {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [boardData, setBoardData] = useState();
  const contextValue = useContext(UserContext);

  if (!loaded && !loading) {
    GetBoards(contextValue.token, setBoardData, setLoading, setLoaded);
    return <p>Getting...</p>;
  } else if (!loaded && loading) { 
    return <p>Loading...</p>;
  } else if (boardData !== null && boardData !== undefined) {
    const boardCards = renderBoardCards(boardData);
    return boardCards;
  }
  return <p>Test</p>;
}
