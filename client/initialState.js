import shuffle from "./shuffle";

const createRows = function() {
  let numbers = shuffle([
    15, 10, 10,  9,  9,  9,  8,  8,
     8,  8,  8,  7,  7,  7,  7,  7,
     6,  6,  6,  6,  6,  5,  5,  5,
     5,  5,  4,  4,  4,  4,  4,  3,
     3,  3,  3,  3,  2,  2,  2,  2,
     2,  1,  1,  1,  1,  1,  0,  0,
     0,  0, -1, -1, -2, -2, -3, -3,
    -4, -5, -6, -7, -8, -9, -10
  ]);

  let rows = [];

  for (var row = 0; row < 8; row++) {
    let cols = [];

    for (var col = 0; col < 8; col++) {
      if (row == 7 && col == 7) {
        cols.push({player: 1});
      }
      else {
        let idx = row * 8 + col;
        cols.push({row: row, col: col, number: numbers[idx]});
      }
    }
    rows.push({cols: cols});
  }

  return rows;
};

const initialState = function() {
  return {
    rows: createRows(),
    token: {player: 1, row: 7, col: 7},
    points: [0, 0],
    status: "Player 1's turn.",
    pausing: false
  };
};

export default initialState;
