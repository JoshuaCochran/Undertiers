import React, { useState } from "react";
import { GetBoards, GetMyUpvotes } from "../Login";
import BoardCard from "./BoardCard";


function renderBoardCard(item, i, upvoted) {
  return (
    <div key={i}>
      <BoardCard
        id={item.id}
        name={item.name}
        owner={item.username}
        description={
          item.description.length > 140
            ? item.description.substr(0, 140) + "..."
            : item.description
        }
        upvoted={upvoted}
      />
    </div>
  );
}

function renderBoardCards(boardData, upvotes) {
  const boardCards = [];
  boardData.map((item, i) => {
    if (Array.isArray(upvotes) && upvotes.filter(upvote => upvote.map === item.id).length)
      boardCards.push(renderBoardCard(item, i, true));
    else boardCards.push(renderBoardCard(item, i, false));
  });
  return boardCards;
}

export default function BoardList(all) {
  const [loaded, setLoaded] = useState(false);
  const [boardData, setBoardData] = useState();
  const [showingAll, setShowingAll] = useState();
  const [upvotes, setUpvotes] = useState();

  if (all.all !== showingAll) {
    setShowingAll(all.all);
    setLoaded(false);
  }

  if (!loaded) {
    GetBoards(all, setBoardData, setLoaded);
    GetMyUpvotes(setUpvotes);
    return <p>Loading...</p>;
  } else if (boardData !== null && boardData !== undefined && upvotes != null) {
    const boardCards = renderBoardCards(boardData, upvotes);
    return boardCards;
  }
  return <p>Loading...</p>;
}
