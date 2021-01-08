import Food from "./Food.js";
import Canvas from "./Canvas.js";
import Snake from "./Snake.js";
// the food object is initialized in the constructor

export default class Game {
	/* -- Private fields -- */
	_canvas; //the canvas element which will display the game
	_element; // the main element of the game -- in this case, it's the snake
	_food; //the piece of food that the snake will eat
	_gameInterval; //the main loop for the game. i may pause it and then resume it
	_gameSpeed; // every gameSpeed milliseconds, the canvas redraws the snake 
	_running; //a boolean that indicates whether the game is running or not	

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

		return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
	}

	/**
	 * renders a snake on the screen before the game actually starts
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
		if (this._running) {
			return;
		}

		// generates the right coordinates for the piece of food
		this._food.generateCoordinates(this._element.tiles);
		this._gameSpeed = gameSpeed;
		this.resume();
	}

	pause() {
		if (!this._running) {
			return;
		}
		this._running = false;
		clearInterval(this._gameInterval);
	}

	resume() {
		if (!this._running) {
			this._gameInterval = setInterval(this.renderGame.bind(this), this._gameSpeed);
			this._running = true;
		}
	}

	// i just refactored the same code from the resume and start functions and put it in this one
	renderGame() {
		if (this._hasSnakeGameEnded()) {
			alert('dead');
			clearInterval(this._gameInterval);
			return;
		}

		this._canvas.clear();
		this._element.changingDirection = false;
		this._element.move(this._food);	

		this._canvas.drawElement(this._element);
		this._canvas.drawElement(this._food);
	}

	updateCanvas() {
		this._canvas.clear();
		this._canvas.drawElement(this._element);
		this._canvas.drawElement(this._food);
	}
}

/**
 * TODO: remember to provide a comment for the line labelled with a bookmark. sth with change_direction = false;
 */