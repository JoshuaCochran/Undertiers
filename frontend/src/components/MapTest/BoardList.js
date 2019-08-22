import React, { useState, useContext, useEffect } from "react";
import { GetBoards, GetMyUpvotes, Upvote, GetAllUpvotes } from "../Login";
import BoardCard from "./BoardCard";
import { UserContext } from "../UserStore";
import { BoardContext } from "../BoardStore";
import Button from "@material-ui/core/Button";

function renderBoardCard(item, i, upvoted, clickUpvote, numUpvotes) {
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
        numUpvotes={numUpvotes}
      />
    </div>
  );
}

function renderBoardCards(boardData, clickUpvote, userId) {
  const boardCards = [];
  boardData.forEach((item, i) => {
    if (
      userId &&
      item.upvotes.filter(upvote => userId == upvote.user_id).length
    )
      boardCards.push(
        renderBoardCard(item, i, true, clickUpvote, item.upvotes.length)
      );
    else
      boardCards.push(
        renderBoardCard(item, i, false, clickUpvote, item.upvotes.length)
      );
  });
  return boardCards;
}

export default function BoardList(all) {
  const [showingAll, setShowingAll] = useState();
  const [page, setPage] = useState(0);
  const [displayData, setDisplayData] = useState();
  const contextValue = useContext(UserContext);
  const boardContext = useContext(BoardContext);

  useEffect(() => {
    if (showingAll) setDisplayData(boardContext.board.slice(0, page * 4 + 4));
    else
      setDisplayData(
        boardContext.board
          .filter(item => contextValue.user.id == item.user)
          .slice(0, page * 4 + 4)
      );
  }, [page, showingAll]);

  function clickUpvote(id, upvote) {
    Upvote(id, !upvote);
  }

  function loadMore() {
    setPage(page + 1);
  }

  if (all.all !== showingAll) {
    setShowingAll(all.all);
  }

  if (displayData !== null && displayData !== undefined) {
    const boardCards = renderBoardCards(
      displayData,
      clickUpvote,
      contextValue.loggedIn && contextValue.user ? contextValue.user.id : null
    );
    return (
      <>
        {boardCards}
        <Button fullWidth onClick={loadMore}>
          Load more
        </Button>
      </>
    );
  }
  return <p>loading...</p>;
}
