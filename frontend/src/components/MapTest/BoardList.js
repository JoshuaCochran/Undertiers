import React, { useState, useContext } from "react";
import { GetBoards, GetMyUpvotes, Upvote, GetAllUpvotes } from "../Login";
import BoardCard from "./BoardCard";
import { UserContext } from "../usercontext";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
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

function renderBoardCards(boardData, upvotes, clickUpvote, count) {
  const boardCards = [];
  var numUpvotes = 0;
  boardData.forEach((item, i) => {
    if (Array.isArray(count)) {
      numUpvotes = count.filter(upvote => upvote[0].board === item.id).length;
      if (numUpvotes)
        numUpvotes = count.filter(upvote => upvote[0].board === item.id)[0]
          .length;
    }

    if (
      Array.isArray(upvotes) &&
      upvotes.filter(upvote => upvote.board === item.id).length
    )
      boardCards.push(renderBoardCard(item, i, true, clickUpvote, numUpvotes));
    else
      boardCards.push(renderBoardCard(item, i, false, clickUpvote, numUpvotes));
  });
  return boardCards;
}

export default function BoardList(all) {
  const [loaded, setLoaded] = useState(false);
  const [loadedUpvotes, setLoadedUpvotes] = useState(false);
  const [loadedCount, setLoadedCount] = useState(false);
  const [boardData, setBoardData] = useState();
  const [showingAll, setShowingAll] = useState();
  const [upvotes, setUpvotes] = useState();
  const [count, setCount] = useState();
  const [sorted, setSorted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUpvotes, setLoadingUpvotes] = useState(false);
  const [loadingCount, setLoadingCount] = useState(false);
  const [page, setPage] = useState(0);
  const [displayData, setDisplayData] = useState();
  const contextValue = useContext(UserContext);

  function clickUpvote(id, userId, upvote) {
    Upvote(id, userId, !upvote);
    if (!upvote) {
      const newData = upvotes.slice(0);
      newData.push({ user: userId, board: id });
      setUpvotes(newData);
    } else {
      const newData = upvotes.slice(0);
      newData.splice(upvotes.findIndex(upvote => upvote.board === id), 1);
      console.log(newData);
      setUpvotes(newData);
    }
  }

  function nav(forward) {
    if (forward && (page + 1) * 4 < boardData.length) {
      const newPage = page + 1;
      setPage(newPage);
      setDisplayData(boardData.slice(newPage * 4, newPage * 4 + 4));
    } else if (!forward && page >= 1) {
      const newPage = page - 1;
      setPage(newPage);
      setDisplayData(boardData.slice(newPage * 4, newPage * 4 + 4));
    }
  }

  function loadMore() {
    setPage(page + 1);
    setDisplayData(boardData.slice(0, ((page + 1) * 4) + 4));
  }

  if (all.all !== showingAll) {
    setShowingAll(all.all);
    setLoaded(false);
    setLoadedCount(false);
    setLoadedUpvotes(false);
    setLoading(false);
    setLoadingCount(false);
    setLoadingUpvotes(false);
    setSorted(false);
  }

  if (loaded && loadedCount && !sorted) {
    const newBoards = boardData.slice(0);

    newBoards.forEach(board => {
      var numUpvotes = count.filter(upvote => upvote[0].board === board.id)
        .length;
      if (numUpvotes)
        numUpvotes = count.filter(upvote => upvote[0].board === board.id)[0]
          .length;

      board.upvotes = numUpvotes;
    });
    newBoards.sort(function(a, b) {
      return b.upvotes - a.upvotes;
    });
    setBoardData(newBoards);
    setDisplayData(newBoards.slice(page * 4, page * 4 + 4));
    setSorted(true);
  }
  if (!loaded && !loading) {
    GetBoards(all, setBoardData, setLoaded, setLoading);
    return <p>Loading...</p>;
  }
  if (contextValue.loggedIn && !loadedUpvotes && !loadingUpvotes) {
    GetMyUpvotes(setUpvotes, setLoadedUpvotes, setLoadingUpvotes);
  }
  if (!loadedCount && !loadingCount) {
    GetAllUpvotes(setCount, setLoadedCount, setLoadingCount);
  }
  if (displayData !== null && displayData !== undefined && sorted) {
    const boardCards = renderBoardCards(
      displayData,
      upvotes,
      clickUpvote,
      count
    );
    return (
      <>
        {boardCards}
        <Button fullWidth onClick={loadMore}>Load more</Button>
      </>
    );
  }
  return <p>Loading...</p>;
}
