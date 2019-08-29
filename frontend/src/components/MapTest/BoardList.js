import React, { useState, useContext, useEffect } from "react";
import { Upvote } from "../Login";
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
  var userUpvoted = false;
  boardData.forEach((item, i) => {
    userUpvoted = false;
    if (
      userId &&
      item.upvotes.filter(upvote => userId == upvote.user_id).length
    )
      userUpvoted = true;

    boardCards.push(
      renderBoardCard(item, i, userUpvoted, clickUpvote, item.upvotes.length)
    );
  });
  return boardCards;
}

export default function BoardList(props) {
  const [showingAll, setShowingAll] = useState();
  const [page, setPage] = useState(0);
  const [displayData, setDisplayData] = useState();
  const userContext = useContext(UserContext);
  const boardContext = useContext(BoardContext);

  //console.log("I rendered boardlist!");

  useEffect(() => {
    if (showingAll) setDisplayData(boardContext.board.slice(0, page * 4 + 4));
    else
      setDisplayData(
        boardContext.board
          .filter(item => userContext.user.id == item.user)
          .slice(0, page * 4 + 4)
      );
  }, [page, showingAll, boardContext.board]);

  function clickUpvote(id, alreadyUpvoted) {
    Upvote(id, !alreadyUpvoted);
    if (!alreadyUpvoted)
      boardContext.addUpvote({user_id: userContext.user.id, board_id: id});
    else
      boardContext.deleteUpvote({user_id: userContext.user.id, board_id: id});
  }

  function loadMore() {
    setPage(page + 1);
  }

  if (props.all !== showingAll) {
    setShowingAll(props.all);
  }

  if (displayData !== null && displayData !== undefined) {
    const boardCards = renderBoardCards(
      displayData,
      clickUpvote,
      userContext.loggedIn && userContext.user ? userContext.user.id : null
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
