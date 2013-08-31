

	$(".square").on('click', function() {

		var validMove = squareIsEmpty($(this)) && currentPlayer === 2;

		if(validMove) {
			$(this).addClass('o');
			playboard.makeMove($(this).index(), playboard.O);
			playboard.printBoard();
			currentPlayer = playboard.X;
			if(playboard.getWinner() === 0) {
				computerMove();
			}
			else {
				$("h1").text("HUMAN PLAYER VICTORIOUS");
				$(".again").show(0);
				$(".square").undbind('click');
			}
			if(playboard.isFull()) {
				$("h1").text("TIE GAME");
				$(".again").show(0);
				$(".square").undbind('click');
			}
		}

	});

	function squareIsEmpty(square) {

		return (square.hasClass('o') || square.hasClass('x')) ? false : true;

	}
	function setSquareTo(index, val) {

		$(".square").eq(index).addClass(val);

	}

	var maxdepth = 6;

	$(".easy").on('click', function(e) {
		e.preventDefault();
		maxdepth = 1;
		$(".difficulty").hide(0);
		$(".playerselect").show(0);
	});
	$(".medium").on('click', function(e) {
		e.preventDefault();
		maxdepth = 3;
		$(".difficulty").hide(0);
		$(".playerselect").show(0);
	});
	$(".impossible").on('click', function(e) {
		e.preventDefault();
		maxdepth = 6;
		$(".difficulty").hide(0);
		$(".playerselect").show(0);
	});

	var currentPlayer = "";

	$(".human").on('click', function(e) {
		e.preventDefault();
		currentPlayer = 'h';
		$(".playerselect").hide(0);
		$(".squares").show(0);
		currentPlayer = playboard.O;
	});
	$(".computer").on('click', function(e) {
		e.preventDefault();
		currentPlayer = 'c';
		$(".playerselect").hide(0);
		$(".squares").show(0);
		computerMove();
	});


