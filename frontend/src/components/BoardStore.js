import React, { useState } from "react";
import axios from "axios";

export const BoardContext = React.createContext();
export default function BoardStore({ children }) {
  const [boardData, setBoardData] = useState({ board: [], getBoard: getBoard });
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  function getBoards() {
    setLoading(true);
    axios({
      method: "get",
      url: "http://www.undertiers.com:8000/boards/",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        setBoardData(prevState => {
          return { ...prevState, board: response.data };
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  function getBoard(id) {
    console.log("Loaded: " + loaded + " .");
    console.log("Id: " + id);
    return boardData.board;
  }

  if (Array.isArray(boardData.board) && boardData.board.length > 0 && !loaded) {
    setLoading(false);
    setLoaded(true);
  }
  if (!loading && !loaded) {
    getBoards();
    return <p>Loading...</p>;
  }
  if (loaded && !loading)
    return (
      <BoardContext.Provider value={boardData}>
        {children}
      </BoardContext.Provider>
    );
  if (loading) return <p>Loading...</p>;
}
