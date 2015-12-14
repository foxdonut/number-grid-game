import {compose, lensIndex, lensProp, set} from "ramda";
import initialState from "./initialState";

/*
var Maybe = require("data.maybe");

var f1 = function(input) {
  console.log("f1");
  return null;
};
var f2 = function(input) {
  console.log("f2");
  return 42;
};
var f3 = function(input) {
  console.log("f3");
  return null;
};
var input = "input";

var toMaybe = function(f) { return function() { return Maybe.fromNullable(f()); } };

var result = Maybe.fromNullable(f1(input)).orElse(toMaybe(function() { return f2(input); })).orElse(toMaybe(function() { return f3(input); })).get();
*/

const reducer = function(state, action) {
  if (action.type === "PAUSE") {
    return set(lensProp("pausing"), true, state);
  }
  else if (action.type === "NEW_GAME") {
    return initialState();
  }
  else if (action.type === "GAME_OVER") {
    let status = "Game over. " + (
      (state.points[0] === state.points[1]) ?
        "It's a tie!" :
        "Player " + (state.points[0] > state.points[1] ? 1 : 2) + " wins!"
    );

    return set(lensProp("status"), status, set(lensProp("gameOver"), true, state));
  }

  const move = action.payload;

  // Account for initial action, which is not a move
  if (!move) {
    return state;
  }

  const token = state.token;

  const validMove = parseInt(move.number, 10) >= -10 &&
    (token.player === 1 && move.row === token.row) ||
    (token.player === 2 && move.col === token.col);

  if (validMove) {
    let addedPoints = [0, 0];
    addedPoints[token.player - 1] = move.number;

    const nextPlayer = 2 - ((token.player + 1) % 2);

    // gotcha: lens compose left to right!
    const moveLens  = compose(lensIndex(move.row),  lensProp("cols"), lensIndex(move.col));
    const tokenLens = compose(lensIndex(token.row), lensProp("cols"), lensIndex(token.col));
    const rows      = compose(set(tokenLens, {}), set(moveLens, {player: nextPlayer}))(state.rows);

    const status = "Player " + token.player + " scored " + move.number + ". Player " + nextPlayer + "'s turn.";

    return compose(
      set(lensProp("token"), {player: nextPlayer, row: move.row, col: move.col}),
      set(lensProp("status"), status),
      set(lensProp("points"), [state.points[0] + addedPoints[0], state.points[1] + addedPoints[1]]),
      set(lensProp("rows"), rows),
      set(lensProp("pausing"), false)
    )(state);
  }
  else {
    return set(lensProp("status"), "Invalid move!", state);
  }
};

export default reducer;
