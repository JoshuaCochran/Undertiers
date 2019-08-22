import React, { useState, useEffect } from "react";
import axios from "axios";

export const BoardContext = React.createContext();
export default function BoardStore({ children }) {
  const [boardData, setBoardData] = useState({
    board: [],
    setTitle: null,
    setDescription: null
  });
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function setTitle(title, id) {
      setBoardData(prevState => {
        return {
          ...prevState,
          board: boardData.board.map(item => {
            if (item.id == id) item.name = title;
            return item;
          })
        };
      });
    }

    setBoardData(prevState => {
      return { ...prevState, setTitle: setTitle };
    });
  }, [boardData]);

  useEffect(() => {
    function setDescription(description, id) {
      setBoardData(prevState => {
        return {
          ...prevState,
          board: boardData.board.map(item => {
            if (item.id == id) item.description = description;
            return item;
          })
        };
      });
    }

    setBoardData(prevState => {
      return { ...prevState, setDescription: setDescription };
    });
  }, [boardData]);

  useEffect(() => {
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
  }, [])

  if (Array.isArray(boardData.board) && boardData.board.length > 0 && !loaded) {
    setLoading(false);
    setLoaded(true);
  }
  if (!loading && !loaded) {
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
