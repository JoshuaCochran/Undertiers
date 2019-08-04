import React, { useState } from "react";
import { GetBoards } from "../Login";
import BoardCard from "./BoardCard";
import AllianceInfo from "../AllianceInfo";

function renderBoardCard(item, i) {
  return (
    <div key={i}>
      <BoardCard
        id={item.id}
        name={item.name}
        owner={item.user}
        description={item.description.length > 140 ? item.description.substr(0, 140) + "..." : item.description}
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

export default function BoardList(all) {
  const [loaded, setLoaded] = useState(false);
  const [boardData, setBoardData] = useState();
  const [showingAll, setShowingAll] = useState();

  if (all.all !== showingAll) {
      setShowingAll(all.all);
      setLoaded(false);
  }

  if (!loaded) {
    GetBoards(all, setBoardData, setLoaded);
    return <p>Loading...</p>;
  } else if (boardData !== null && boardData !== undefined) {
    const boardCards = renderBoardCards(boardData);
    return boardCards;
  }
  return <p>Loading...</p>;
}
