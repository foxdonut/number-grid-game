import {map, max, prop, reduce, remove} from "ramda";

var computer = function(store) {
  return function() {
    const state = store.getState();
    const token = state.token;

    if (token.player !== 2) {
      // not computer's turn
      return;
    }

    const rows = state.rows;

    const col = token.col;
    let move = null;
    let lastNet = -100;

    for (var row = 0; row < 8; row++) {
      const candidate = rows[row].cols[col];

      if (parseInt(candidate.number, 10) >= -10) {
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
  };
};

export default computer;
