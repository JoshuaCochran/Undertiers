import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserStore";

export const BoardContext = React.createContext();
export default function BoardStore({ children }) {
  const [boardData, setBoardData] = useState({
    board: [],
    units: [],
    setTitle: null,
    setDescription: null,
    setBoardState: null,
    addUpvote: null,
    deleteUpvote: null
  });
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const userContext = useContext(UserContext);

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

    function setBoardState(id, state, location) {
      var new_data = boardData.board.slice(0);
      if (location === "BOARD") {
        new_data.map(item => {
          if (item.id == id) item.pieces = state;
          return item;
        });
      } else if (location === "EARLY_GAME") {
        new_data.map(item => {
          if (item.id == id) item.early_game = state;
          return item;
        });
      } else if (location === "MID_GAME") {
        new_data.map(item => {
          if (item.id == id) item.mid_game = state;
          return item;
        });
      } else if (location === "TITLE") {
        new_data.map(item => {
          if (item.id == id) item.name = state;
          return item;
        })
      } else if (location === "DESCRIPTION") {
        new_data.map(item => {
          if (item.id == id) item.description = state;
          return item;
        })
      }
      setBoardData(prevState => {
        return { ...prevState, board: new_data };
      });
    }

    setBoardData(prevState => {
      return {
        ...prevState,
        setDescription: setDescription,
        setTitle: setTitle,
        setBoardState: setBoardState
      };
    });
  }, [boardData.board]);

  useEffect(() => {
    function addUpvote(upvote) {
      const newData = boardData.board.slice(0);
      newData.map(item => {
        if (item.id == upvote.board_id) item.upvotes.push(upvote);
        return item;
      });

      setBoardData(prevState => {
        return { ...prevState, board: newData };
      });
    }

    function deleteUpvote(upvote) {
      const newData = boardData.board.slice(0);
      newData.forEach(item => {
        item.upvotes = item.upvotes.filter(up => {
          if (up.board_id == upvote.board_id)
            return up.user_id != upvote.user_id;
          else return true;
        });
      });

      setBoardData(prevState => {
        return { ...prevState, board: newData };
      });
    }

    setBoardData(prevState => {
      return { ...prevState, addUpvote: addUpvote, deleteUpvote: deleteUpvote };
    });
  }, [boardData.board]);

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

    axios({
      method: "get",
      url: "http://www.undertiers.com:8000/units/",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        setBoardData(prevState => {
          return { ...prevState, units: response.data };
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

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
