import React, { useState } from "react";
import { GetBoard, GetBoards } from "../Login";
import BoardCard from "./BoardCard";

function renderBoardCard(item, i) {
  return (
    <div key={i}>
      <BoardCard id={item.id} name={item.name} owner={item.user} description={item.description} />
    </div>
  );
}

function renderBoardCards(boardData) {
    const boardCards = [];
    boardData.map((item, i) => {
        boardCards.push(renderBoardCard(item, i))
    });
    return boardCards;
}

export default function BoardList(children) {
  const [loaded, setLoaded] = useState(false);
  const [boardData, setBoardData] = useState();
  if (!loaded) {
    GetBoards(setBoardData);
    setLoaded(true);
    return <p>Loading...</p>;
  }
  else if (boardData != undefined && boardData != null) {
    const boardCards = renderBoardCards(boardData);
    return boardCards;
  }
  return <p>Test</p>
}
