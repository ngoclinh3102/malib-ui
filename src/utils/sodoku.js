export const checkValidSodoku = (board) => {
  const errors = new Set();

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const k = board[i][j];
      if (k === 0) continue;

      // column check
      for (let iTemp = i + 1; iTemp < 9; iTemp++)
        if (board[iTemp][j] === k) errors.add("" + i + j).add("" + iTemp + j);

      // row check
      for (let jTemp = j + 1; jTemp < 9; jTemp++)
        if (board[i][jTemp] === k) errors.add("" + i + j).add("" + i + jTemp);

      // block check
      for (let iTemp = i + 1; iTemp < 3 * Math.ceil((i + 1) / 3); iTemp++) {
        for (
          let jTemp = 3 * Math.floor(j / 3);
          jTemp < 3 * Math.ceil((j + 1) / 3);
          jTemp++
        ) {
          if (board[iTemp][jTemp] === k)
            errors.add("" + i + j).add("" + iTemp + jTemp);
        }
      }
    }
  }

  return errors;
};

export const solveSodoku = (board) => {
  solve(board, 0, 0);
  return board;
};

const solve = (board, row, col) => {
  if (row === board.length) return true;

  if (col === board[0].length) return solve(board, row + 1, 0);

  if (board[row][col] !== 0) return solve(board, row, col + 1);

  for (let num = 1; num <= 9; num++) {
    if (isValidPlacement(board, row, col, num)) {
      board[row][col] = num;
      if (solve(board, row, col + 1)) return true;
    }
  }

  board[row][col] = 0;
  return false;
};

const isValidPlacement = (board, row, col, num) => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;
    if (board[i][col] === num) return false;
    if (
      board[3 * parseInt(row / 3) + parseInt(i / 3)][
        3 * parseInt(col / 3) + parseInt(i % 3)
      ] === num
    )
      return false;
  }
  return true;
};
