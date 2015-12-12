import {compose, lensIndex, lensProp, set} from "ramda";

const reducer = function(state, action) {
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
    const rows = state.rows;

    const rowLens = compose(lensIndex(move.col),  lensProp("cols"), lensIndex(move.row));
    const colLens = compose(lensIndex(token.col), lensProp("cols"), lensIndex(token.row));
    const nextRows = compose(set(colLens, {}), set(rowLens, {player: nextPlayer}))(rows);
    const status = "Player " + token.player + " scored " + move.number + ". Player " + nextPlayer + "'s turn.";

    return compose(
      set(lensProp("token"), {player: nextPlayer, row: move.row, col: move.col}),
      set(lensProp("status"), status),
      set(lensProp("points"), [state.points[0] + addedPoints[0], state.points[1] + addedPoints[1]]),
      set(lensProp("rows"), nextRows)
    )(state);
  }
  else {
    return set(lensProp("status"), "Invalid move!", state);
  }
};

export default reducer;
