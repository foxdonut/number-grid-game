import {all, isNil, map, max, prop, reduce, remove} from "ramda";

var computer = function(store) {
  return function() {
    const state = store.getState();

    if (state.gameOver) {
      return;
    }

    const token = state.token;

    if (token.player !== 2) {
      // not computer's turn
      // check for game over
      const row = state.rows[token.row];

      if (all(isNil, map(prop("number"), row.cols))) {
        store.dispatch({type: "GAME_OVER"});
      }
      return;
    }
    if (!state.pausing) {
      setTimeout(() => store.dispatch({type: "PAUSE"}), 2000);
      return;
    }

    const rows = state.rows;

    const col = token.col;
    let move = null;
    let lastNet = -100;

    for (var row = 0; row < 8; row++) {
      const candidate = rows[row].cols[col];

      if (!isNil(candidate.number)) {
        const otherRows = remove(col, 1, rows[row].cols);
        const maxLoss = reduce(max, -100, map(prop("number"), otherRows));
        const nextNet = candidate.number - maxLoss;

        if (nextNet > lastNet) {
          move = candidate;
          lastNet = nextNet;
        }
      }
    }

    if (move) {
      store.dispatch({type: "MOVE", payload: move});
    }
    else {
      store.dispatch({type: "GAME_OVER"});
    }
  };
};

export default computer;
