class Board {
  constructor() {
    this.grid = []
    for (let i=0; i<3; i++) {
      this.grid.push(['-', '-', '-'])
    }
  }

  _threeInARow(arr) {
    if (arr[0] === '-') {
      return false;
    }

    if (arr.length !== 3) {
      return false;
    }

    return (arr.every((el) => el == arr[0]))
  }

  _column(colIdx) {
    let col = [];
    for (let i=0; i<3; i++) {
      col.push(this.grid[i][colIdx]);
    }

    return col;
  }

  _check_diagonals() {
    // 0, 0
    let diag1 = [];
    //0, 2
    let diag2 = [];

    for (let i=0; i<3; i++) {
      diag1.push(this.grid[i][i]);
      diag2.push(this.grid[i][2-i]);
    }

    if (this._threeInARow(diag1)) {
      return diag1[0];
    }
    else if (this._threeInARow(diag2)) {
      return diag2[0];
    }

    return false;
  }

  _check_rows() {
    for (let i=0; i<3; i++) {
      if (this._threeInARow(this.grid[i])) {
        return this.grid[i][0];
      }
    }

    return false;
  }

  _get_cols() {
    let cols = [];
    for (let i=0; i<3; i++) {
      cols.push(this._column(i));
    }
    return cols;
  }

  _check_cols() {
    let cols = this._get_cols();
    for (let i=0; i<3; i++) {
      if (this._threeInARow(cols[i])) {
        return cols[i][0];
      }
    }

    return false;
  }

  won() {
    return this.winner() !== false;
  }

  winner() {
    return this._check_cols() || this._check_rows() || this._check_diagonals();
  }

  getMark(pos) {
    return this.grid[pos[0]][pos[1]];
  }

  empty(pos) {
    return (this.getMark(pos) === '-')
  }

  placeMark(pos, mark) {
    this.grid[pos[0]][pos[1]] = mark;
  }

  toStr() {
    let str = "";
    for (let i=0; i<3; i++) {
      str += JSON.stringify(this.grid[i]) + "\n";
    }
    return str;
  }

  printBoard() {
    console.log(this.toStr());
  }
}

module.exports = Board;
// let board = new Board();
// Check row/col/diag tests
// console.log(board._check_rows());
// // console.log(board._check_cols());
// // console.log(board._check_diagonals());
// console.log(board.won());
// // row
// board.placeMark([0, 0], 'x');
// board.placeMark([0, 1], 'x');
// board.placeMark([0, 2], 'x');
// // console.log(board._check_rows());
// // col
// board.placeMark([1, 0], 'x');
// board.placeMark([2, 0], 'x');
// // console.log(board._check_cols());
// // diags
// board.placeMark([1, 1,], 'x');
// // console.log(board._check_diagonals());
// console.log(board.won());
// console.log(board.winner());
