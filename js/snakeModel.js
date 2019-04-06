/**
* The Model - stores data, notifies observers about changes
*/
class Model() {

	let snake = [
	  {x: 160, y: 160},
	  {x: 140, y: 160},
	  {x: 120, y: 160},
	  {x: 100, y: 160},
	  {x: 80, y: 160},
	];

	var dx = 20;
	var dy = 0;

	var xFood;
	var yFood;

	var score = 0;

	var directionChange;

	var speed = 100;


	function moveSnake() {
		directionChange = false;
		var head = {x: snake[0].x + dx, y: snake[0].y + dy};

		snake.unshift(head);
		var ateFood = snake[0].x === xFood && snake[0].y === yFood;
		if (ateFood) {
			if (speed > 20) {
				speed -= 10;
			}
			positionFood();
			score++;
		} else {
			snake.pop();
		}
	}

	function randomPosition(min, max) {
		var number = Math.round((Math.random() * (max - min) + min) / 10) * 10;
		if(number > 0) {
	        return Math.ceil(number/20.0) * 20;
		} else {
	        return 20;
		}
	}

	function positionFood() {
		xFood = randomPosition(0, gameCanvas.width - 20);
		yFood = randomPosition(0, gameCanvas.height - 20);

		snake.forEach(function isFoodOnSnake(snakePart) {
			if (snakePart.x == xFood && snakePart.y == yFood) {
				positionFood();
			}
		});
	}

	function changeDirection(key) {
		const left = 37;
		const up = 38;
		const right = 39;
		const down = 40;

		var keyPressed = key.keyCode;
		var movingUp = dy === -20;
		var movingDown = dy === 20;
		var movingLeft = dx === -20;
		var movingRight = dx === 20;

		if (directionChange) {
			return;
		}
		
		directionChange = true;

		if (keyPressed === right && !movingLeft) {
			dx = 20;
			dy = 0;
		}

		if (keyPressed === left && !movingRight) {
			dx = -20;
			dy = 0;
		}

		if (keyPressed === up && !movingDown) {
			dx = 0;
			dy = -20;
		}

		if (keyPressed === down && !movingUp) {
			dx = 0;
			dy = 20;
		}
	}

	function lostGame() {
	for (var i = 4; i < snake.length; i++) {
		if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
			return true;
		}
	}

	return snake[0].x < 0 || snake[0].y < 0 || 
		snake[0].x > gameCanvas.width - 20 || snake[0].y > gameCanvas.height - 20;
	}

	function restart() {
		snake = [
		  {x: 160, y: 160},
		  {x: 140, y: 160},
		  {x: 120, y: 160},
		  {x: 100, y: 160},
		  {x: 80, y: 160},
		];
		clearCanvas();
		positionFood();
		drawFood();
		drawSnake();
		dx = 20;
		dy = 0;
		score = 0;
		speed = 100;
	}

}

class Controller() {
	constructor(model, view) {
		this.model = model;
		this.view = view;
	}

	// get user actions from view, then make changes/call model functions(main)
	// change direction (dx, dy)
}


class View() {

	constructor(model) {
		this.model = model;
	}

	document.addEventListener("keydown", Model.changeDirection);
	document.getElementById("squishyStartBtn").addEventListener("click", main());

	window.addEventListener("keydown", function(e) {
	    // space and arrow keys
	    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
	        e.preventDefault();
	    }
	}, false);

	var gameCanvas = document.getElementById("gameCanvas");
	var context = gameCanvas.getContext("2d"); 

	const canvasBorderColor = "brown";
	const canvasBackgroundColor = "#fff5e6";
	const snakeColor = "lightblue";
	const snakeBorderColor = "darkblue";
	const foodColor = "red";
	const foodColorBorder = "black";

	function clearCanvas() {
		context.fillStyle = canvasBackgroundColor;
		context.strokeStyle = canvasBorderColor;
		context.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
		context.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
	}

	function main() {
		document.getElementById("squishyStartBtn").style.display = "none";
		if (Model.lostGame()) {
			document.getElementById("squishyStartBtn").style.display = "inline-block";
			Model.restart();
			return;
		}

		setTimeout(function onTick() {
			Model.clearCanvas();
			Model.drawFood();
			Model.moveSnake();
			Model.drawSnake();

			main();
		}, Model.speed)
	}

	

	/**
	* Draws the snake on the canvas
	*/
	function drawSnake() {
		// loop through the snake parts drawing each part on the canvas
		Model.snake.forEach(drawSnakePart);
	}

	/**
	* Draws a part of the snake on the canvas
	* @param { object } snakePart - The coordinates where the part should be drawn
	*/
	function drawSnakePart(snakePart) {
		image = new Image();
		image.src = 'squishy.png';
			context.drawImage(image, snakePart.x, snakePart.y, 20, 20);
	}

	/**
	* Draws the food on the canvas
	*/
	function drawFood() {
		imageFood = new Image();
		imageFood.src = 'acorn.png';
		context.drawImage(imageFood, Model.xFood, Model.yFood, 20, 20);
	}

	document.getElementById("score").innerHTML = Model.score;
}


window.onload = function() {
	
}

