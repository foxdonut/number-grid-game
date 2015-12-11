const reducer = function(state, action) {
  const move = action.payload;

  // Account for initial action
  if (!move) {
    return state;
  }

  const token = state.token;

  const validMove = parseInt(move.number, 10) >= -10 &&
    (token.player === 1 && move.row === token.row) ||
    (token.player === 2 && move.col === token.col);

  let addedPoints = [0, 0];
  addedPoints[token.player - 1] = move.number;

  if (validMove) {
    const nextPlayer = token.player === 1 ? 2 : 1;
    const rows = state.rows;

    const row = rows[move.row].cols;
    row[move.col] = {player: nextPlayer}; // set

    rows[token.row].cols[token.col] = {}; // set

    return state.set("token", {player: nextPlayer, row: move.row, col: move.col}).
      set("status", "Player " + token.player + " scored " + move.number + ". Player " + nextPlayer + "'s turn.").
      set("points", [state.points[0] + addedPoints[0], state.points[1] + addedPoints[1]]).
      set("rows", rows);
  }
  else {
    return state.set("status", "Invalid move!");
  }
};

export default reducer;
