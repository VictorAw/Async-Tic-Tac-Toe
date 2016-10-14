class HumanPlayer {
  constructor (mark) {
    this.mark = mark;
  }

  getMove(board, reader, turnCompletionCallback) {
    board.printBoard();
    reader.question("Where would you like to move? ", (pos) => {
      let row = parseInt(pos[0]);
      let col = parseInt(pos[2]);

      if (this._isValidMove(board, [row, col])) {
        turnCompletionCallback([row, col]);
      } else {
        console.log("Invalid move");
        this.getMove(board, reader, turnCompletionCallback);
      }
    })
  }

  _isValidMove(board, pos) {
    if (pos[0] < 0 || pos[0] > 2) {
      return false;
    } else if (pos[1] < 0 || pos[1] > 2) {
      return false;
    }

    if (board.getMark(pos) !== '-') {
      return false;
    }

    return true;
  }
}

module.exports = {
  HP: HumanPlayer
};
// 
//
// const Board = require("./board");
// let player = new HumanPlayer("x");
// let board = new Board();
// player.getMove(board, reader);
