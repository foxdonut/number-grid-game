import React from "react";

const View = function(props) {
  const token = props.token;

  const currentRow = token.row;
  const currentCol = token.col;
  const player = token.player;

  const move = function(col) {
    return function(evt) {
      if (props.gameOver) {
        alert("The game is over! Start a new game.");
      }
      else if (player === 1) {
        props.dispatch({type: "MOVE", payload: col});
      }
      else {
        alert("It's not your turn!");
      }
    };
  };

  const newGame = function(evt) {
    evt.preventDefault();
    if (confirm("Abandon this game and start a new one?")) {
      props.dispatch({type: "NEW_GAME"});
    }
  };

  const renderColumn = function(rowIdx) {
    return function(col, idx) {
      const moveClass = (player === 1 && rowIdx === currentRow) ? "player1moves" :
                        (player === 2 && idx === currentCol)    ? "player2moves" : "";

      const cls = col.player ? ("player" + col.player) : moveClass;

      return <td key={"col_" + idx} className={cls} onClick={move(col)}>{col.number}</td>;
    };
  };

  const renderRow = function(row, idx) {
    return <tr key={"row_" + idx}>
      {row.cols.map(renderColumn(idx))}
    </tr>;
  };

  return <table><tbody>
    {props.rows.map(renderRow)}
    <tr>
      <td colSpan={8}>{props.status}</td>
    </tr>
    <tr>
      <td className="player1score">{props.points[0]}</td>
      <td className="player2score">{props.points[1]}</td>
      <td colSpan={6}><button onClick={newGame}>New Game</button></td>
    </tr>
  </tbody></table>;
};

export default View;
