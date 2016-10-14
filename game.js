class Game {
  constructor(player1, player2, reader) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Board();
    this.currentPlayer = this.player1;
    this.reader = reader;
  }

  promptMove(completionCallback) {
    this.currentPlayer.getMove(this.board, this.reader, (pos) => {
      let row = pos[0];
      let col = pos[1];
      this.board.placeMark([row, col], this.currentPlayer.mark);

      if (this.board.won()) {
        completionCallback(this.board.winner());
      } else {
        this._swapPlayers();
        this.run(completionCallback);
      }
    })
  }

  run(completionCallback) {
    this.promptMove(completionCallback);
  }

  _swapPlayers() {
    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
  }
}

const readline = require('readline');
// Create reader object from readline
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const Board = require("./board");
const HumanPlayer = require("./player").HP;

let p1 = new HumanPlayer("X");
let p2 = new HumanPlayer("O");
let game = new Game(p1, p2, reader);
// game.run((winner) => {
//   console.log(winner + " wins!");
//   reader.close();
//   }
// );

game.run(function(winner) {
  console.log(winner + " wins!");
  reader.close();
});
