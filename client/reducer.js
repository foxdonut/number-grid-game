import {compose, lensIndex, lensProp, set} from "ramda";
import initialState from "./initialState";
import ShortCircuit from "./short-circuit";

const actions = {
  "PAUSE": function(state) {
    return set(lensProp("pausing"), true, state);
  },
  "NEW_GAME": function(state) {
    return initialState();
  },
  "GAME_OVER": function(state) {
    let status = "Game over. " + (
      (state.points[0] === state.points[1]) ?
        "It's a tie!" :
        "Player " + (state.points[0] > state.points[1] ? 1 : 2) + " wins!"
    );

    return set(lensProp("status"), status, set(lensProp("gameOver"), true, state));
  }
};

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
