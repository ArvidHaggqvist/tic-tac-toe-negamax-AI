var bestMove = 0;

function negaMax(board, player, depth) {

	if(depth > maxdepth) return 0;

	var opponent = (player === 1) ? 2 : 1;

	if( player === board.getWinner() ) return 1;
	else if( opponent === board.getWinner() ) return -1;
	else if( board.isFull() ) return 0;

	var moves = board.getPossibleMoves();

	var a = -1;
	var bList = [];

	moves.forEach(function(val, i) {

		var boardclone = board.clone(board);
		boardclone.makeMove(val, player);

		var b = -(negaMax(boardclone, opponent, depth+1));

		if(a < b) a = b;

		if(depth === 0) {
			bList[i] = b;
		}

	});

	if(depth === 0) {
		console.log("POSSIBLE MOVES: " + moves);
		console.log("SUBALPHA LIST: " + bList);
		console.log("ALPHA: " + a);
		var bestMoves = [];
		var bestMovesObj = {};

		for(i=0;i<bList.length;i++) {
			if(bList[i] === a) {
				bestMoves.push( moves[i] );
				bestMovesObj[moves[i]] = bList[i];
			}
		}
		console.log("BEST MOVES: " + bestMoves);
 		bestMove = bestMoves[Math.floor(Math.random() * bestMoves.length)]; // Select a random move out of the ones marked as best moves
	}
	return a;

}
function getBest(board, player) {
	bestMove = -1;
	var a = negaMax(board, player, 0);
	return bestMove;
}
function Board(list)  {

	this.list = list;
	this.X = 1;
	this.O = 2;
	this.getPossibleMoves = function() {
		var result = [];
		this.list.forEach(function(val, i) {
			if(val === 0) result.push(i);
		});
		return result;
	};
	this.clone = function(board) {
		var copy = [];
		board.list.forEach(function(val, i) {
			copy[i] = val;
		});
		return new Board(copy);
	};
	this.makeMove = function(square, player) {
		this.list[square] = player;
	};
	this.belongsToOnePlayer = function(a,b,c) {
		if(this.list[a] === this.list[b] && this.list[a] === this.list[c] && this.list[a] !== 0) return this.list[a];
		else { return 0 };
	};
	this.getWinner = function() {
		var winner = 0;
		winner = this.belongsToOnePlayer(0,1,2);
		if(winner !== 0) return winner;
		winner = this.belongsToOnePlayer(3,4,5);
		if(winner !== 0) return winner;
		winner = this.belongsToOnePlayer(6,7,8);
		if(winner !== 0) return winner;
		winner = this.belongsToOnePlayer(0,3,6);
		if(winner !== 0) return winner;
		winner = this.belongsToOnePlayer(1,4,7);
		if(winner !== 0) return winner;
		winner = this.belongsToOnePlayer(2,5,8);
		if(winner !== 0) return winner;
		winner = this.belongsToOnePlayer(0,4,8);
		if(winner !== 0) return winner;
		winner = this.belongsToOnePlayer(2,4,6);
		if(winner !== 0) return winner;
		return winner;
	};
	this.isFull = function() {
		for(i=0;i<this.list.length;i++) {
			if(this.list[i] === 0) return false;
		}
		return true;
	};
	this.printSquare = function(square) {
		return (square === 1) ? "X" : (square === 0) ? " " : "O"; // Convert numeric values to symbols. "X" for player 1, "O" for player two and an empty space for the empty squares.
	};
	this.printBoard = function() {

		var _boardCopy = [];
		for(i=0;i<this.list.length;i++) {
			_boardCopy[i] = this.printSquare(this.list[i]);
		}

		console.log(' | ' + _boardCopy[0] + ' | ' + _boardCopy[1] + ' | ' + _boardCopy[2] + ' | ');
		console.log(' | ' + _boardCopy[3] + ' | ' + _boardCopy[4] + ' | ' + _boardCopy[5] + ' | ');
		console.log(' | ' + _boardCopy[6] + ' | ' + _boardCopy[7] + ' | ' + _boardCopy[8] + ' | ');
	};

}
var playboard = new Board([0,0,0,0,0,0,0,0,0]);

function computerMove() {
	var move = getBest(playboard, currentPlayer);
	console.log("Computer moves: " + move);
	playboard.makeMove(move, 1);
	setSquareTo(move, 'x');
	playboard.printBoard();
	if(playboard.getWinner() === 0) {
		currentPlayer = playboard.O;
	}
	else {
		$("h1").text("GAME OVER");
		$(".again").show(0);
		$(".square").undbind('click');
	}
	if(playboard.isFull()) {
		$("h1").text("TIE GAME");
		$(".again").show(0);
		$(".square").undbind('click');
	}
}
