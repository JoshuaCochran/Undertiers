import React, { useState, useContext } from "react";
import { GetBoards, GetMyUpvotes } from "../Login";
import BoardCard from "./BoardCard";
import { UserContext } from "../usercontext";
import { Upvote } from "../Login";

function renderBoardCard(item, i, upvoted, clickUpvote) {
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
        clickUpvote={clickUpvote}
      />
    </div>
  );
}

function renderBoardCards(boardData, upvotes, clickUpvote) {
  const boardCards = [];
  boardData.map((item, i) => {
    if (
      Array.isArray(upvotes) &&
      upvotes.filter(upvote => upvote.map === item.id).length
    )
      boardCards.push(renderBoardCard(item, i, true, clickUpvote));
    else boardCards.push(renderBoardCard(item, i, false, clickUpvote));
  });
  return boardCards;
}

export default function BoardList(all) {
  const [loaded, setLoaded] = useState(false);
  const [loadedUpvotes, setLoadedUpvotes] = useState(false);
  const [boardData, setBoardData] = useState();
  const [showingAll, setShowingAll] = useState();
  const [upvotes, setUpvotes] = useState();

  function clickUpvote(id, userId, upvote) {
    Upvote(id, userId, !upvote);
    if (!upvote) 
    {
      const newData = upvotes.slice(0);
      newData.push({user: userId, map: id, });
      setUpvotes(newData);
    }
    else {
      const newData = upvotes.slice(0);
      newData.splice(upvotes.findIndex(upvote => upvote.map === id), 1);
      console.log(newData);
      setUpvotes(newData);
    }
  }

  if (all.all !== showingAll) {
    setShowingAll(all.all);
    setLoaded(false);
  }

  if (!loaded) {
    GetBoards(all, setBoardData, setLoaded);

    return <p>Loading...</p>;
  } if (!loadedUpvotes) {
    GetMyUpvotes(setUpvotes, setLoadedUpvotes);
  } if (boardData !== null && boardData !== undefined) {
    const boardCards = renderBoardCards(boardData, upvotes, clickUpvote);
    return boardCards;
  }
  return <p>Loading...</p>;
}
