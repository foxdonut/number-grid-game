import React from "react";

const View = function(props) {
  const move = function(col) {
    return function(evt) {
      props.dispatch({type: "MOVE", payload: col});
    };
  };
  const renderColumn = function(col, idx) {
    const cls = col.player ? "player" + col.player : "";
    return <td key={idx} className={cls} onClick={move(col)}>{col.number}</td>;
  };
  const renderRow = function(row, idx) {
    return <tr key={idx}>
      {row.cols.map(renderColumn)}
    </tr>;
  };
  return <table><tbody>
    {props.rows.map(renderRow)}
    <tr><td colSpan={8}>{props.status}</td></tr>
    <tr><td className="player1score">{props.points[0]}</td><td className="player2score">{props.points[1]}</td></tr>
  </tbody></table>;
};

export default View;
