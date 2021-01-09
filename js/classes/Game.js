import Food from "./Food.js";
import Canvas from "./Canvas.js";
import Snake from "./Snake.js";
// the food object is initialized in the constructor

export default class Game {
	_canvas; //the canvas element which will display the game
	_element; // the main element of the game -- in this case, it's the snake
	_food; //the piece of food that the snake will eat
	_gameInterval; //the main loop for the game. i may pause it and then resume it
	_gameSpeed; // every gameSpeed milliseconds, the canvas redraws the snake 
	_running; //a boolean that indicates whether the game is running or not	
	_dead;

	/**
	 * @param {Canvas} canvas 
	 * @param {Snake} element - snake
	 */
	constructor(canvas, element) {
		this._canvas = canvas;
		this._element = element;
		this._food = new Food(this._element.tileSize, this._canvas.width, this._canvas.height, 'lightgreen', 'darkgreen');
		this.initialRender();
	}

	/**
	 * checks if the game should continue or not
	 * @returns {boolean} whether the snake hit any of the boundaries or ate itself
	 */
	_hasSnakeGameEnded() {
		// the snake can only eat one of its own tiles if its length is > 4
		const head = this._element.snakeHead;
		for (let i = 4; i < this._element.tiles.length; i++) {
			// checking if the snake's head collides with any of its other tiles
			if (this._element.tiles[i].x == head.x && this._element.tiles[i].y == head.y) {
				return true;
			}
		}

		const hitLeftWall = head.x < 0;
		const hitRightWall = head.x > this._canvas.width - this._element.tileSize; //the tile with the coordinate 'this._canvas.width - this._element.tileSize' is the last tile in the canvas. therefore, here we're checking if the head of the snake is past this tile
		const hitToptWall = head.y < 0;
		const hitBottomWall = head.y > this._canvas.height - this._element.tileSize;

		return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
	}

	/**
	 * i only want to make the game respond to the restart event listener if the snake's really dead. 
	 * this is just a getter for the _dead property
	 */
	isSnakeDead() {
		return this._dead;
	}

	/**
	 * renders a snake on the screen before the game actually starts. note that the food isn't generated yet.
	 * @returns {void}
	 */
	initialRender() {
		this._canvas.clear();
		// this._element == snake
		this._canvas.drawElement(this._element);
	}

	/**
	 * actually starts the game loop
	 * @param {number} gameSpeed - every gameSpeed milliseconds, the canvas redraws the snake 
	 */
	start(gameSpeed = 100) {		
		if (!this._running) {
			// generates the right coordinates for the piece of food
			this._food.generateCoordinates(this._element.tiles);
			this._gameSpeed = gameSpeed;
			this.resume(); //i only called this function because i'm lazy and don't want to write the same lines of code again
		}
	}

	/**
	 * pauses the game
	 */
	pause() {
		if (this._running) {
			this._running = false;
			clearInterval(this._gameInterval);
		}
	}

	/**
	 * resumes the game
	 */
	resume() {
		if (!this._running) {
			this._gameInterval = setInterval(this.renderGame.bind(this), this._gameSpeed);
			this._running = true;
		}
	}

	/**
	 * restarts the game if the snake is dead and the user presses 'r'. it resets the snake's coordinates and generates a new piece of food.
	 * the user will have to press start again to actually start the game loop
	 */
	restart() {
		this._dead = false;
		this._element.resetCoordinates(4, 100, 100);
		this._food.generateCoordinates(this._element.tiles);
		this.initialRender();
	}

	// i just refactored the same code from the resume and start functions and put it in this one
	renderGame() {
		if (this._hasSnakeGameEnded()) {
			alert('Snake is dead. Press "r" to restart the game.');
			clearInterval(this._gameInterval);
			this._running = false;
			this._dead = true;
			return;
		}

		this._canvas.clear();
		this._element.changingDirection = false; // more explanation can be found in the Snake.js file
		this._element.move(this._food);	

		this._canvas.drawElement(this._element);
		this._canvas.drawElement(this._food);
	}

	/**
	 * used when switching between light and dark themes.
	 * i actually made this function so i can achieve this functionality even when the game isn't running.
	 * it only clears the canvas and redraws elements with new colors suitable for dark or white mode.
	 */
	updateCanvas() {
		this._canvas.clear();
		this._canvas.drawElement(this._element);
		this._canvas.drawElement(this._food);
	}
	
}