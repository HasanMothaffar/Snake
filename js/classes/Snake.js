import * as keys from "../key_constants.js";
import Food from "./Food.js";

export default class Snake {
	_tiles = [];
	_tileSize;
	_verticalSpeed = 0;
	_horizontalSpeed = -20;
	_changingDirection = false;
	_parentContext;	

	// colors for tiles
	_normalTileColor;
	_headTileColor;
	// assuming everything is horizontal now and from right to left
	constructor(initialX, initialY, numOfStartingBlocks, tileSize, normalTileColor, headTileColor) {
		this._tileSize = tileSize;
		this._normalTileColor = normalTileColor;
		this._headTileColor = headTileColor;

		// resetCoordinates here actually initializes the snake's coordinates
		this.resetCoordinates(numOfStartingBlocks, initialX, initialY);
		this.registerEventListener();
	}

	/* -- Getters and Setters -- */

	get snakeHead() { return this._tiles[0]; }

	get tiles() { return this._tiles; }

	set changingDirection(value) { this._changingDirection = value; }

	get horizontalSpeed() { return this._horizontalSpeed;}
	set horizontalSpeed(value) { this._horizontalSpeed = value; }

	get verticalSpeed() { return this._verticalSpeed; }
	set verticalSpeed(value) { this._verticalSpeed = value; }

	get tileSize() { return this._tileSize; }

	/*-- DRAWING LOGIC --*/

	drawSnakePart({x, y}, index) {
		this._parentContext.fillStyle = index == 0 ? this._headTileColor : this._normalTileColor;
		this._parentContext.strokeStyle = 'darkblue';

		this._parentContext.fillRect(x, y, this.tileSize, this.tileSize);
		this._parentContext.strokeRect(x, y, this.tileSize, this.tileSize);
	}

	drawOnCanvas(context) {
		this._parentContext = context;
		this._tiles.forEach((tile, index) => {
			this.drawSnakePart(tile, index);
		})
	}

	/*-- DRAWING LOGIC ENDS HERE --*/

	/**
	 * adds tiles to the snake's tiles array
	 * @param {Food} food - snake's food. the reason i'm passing this parameter is that i want to regenerate the food's coordinates if the snake's head collides with it
	 */
	move(food) {
		const head = {
			x: this._tiles[0].x + this.horizontalSpeed,
			y: this._tiles[0].y + this.verticalSpeed,
		}

		this._tiles.unshift(head);
		if (head.x == food.x && head.y == food.y) {
			food.generateCoordinates(this.tiles);
		}
		else {
			this._tiles.pop();
		}
	}

	resetCoordinates(numOfStartingBlocks, initialX, initialY) {
		this._horizontalSpeed = -20;
		this._verticalSpeed = 0;
		this._tiles = [];
		for (let i = 0; i < numOfStartingBlocks; i++) {
			this._tiles.push({
				x: initialX,
				y: initialY
			});

			initialX += this._tileSize;
		}
	}

	registerEventListener() {
		document.addEventListener('keydown', this.changeDirection.bind(this));
	}

	/**
	 * changes the snake's direction. note that the horizontal and vertical speeds in this class represent directions
	 * with negative values indicating left and downwards, and positive ones indicating right and upwards
	 * @param {Event} event 
	 */
	changeDirection(event) {
		let direction = '';
		const keyPressed = event.keyCode;
		if (this._changingDirection) return; //used to prevent the snake from going into the reverse direction. for example, going up and then down
		// the snake would have to wait for this function to return and for the Game loop to run again to be able to change direction
		this._changingDirection = true;
		
		const goingUp = this.verticalSpeed == -20;
		const goingDown = this.verticalSpeed == 20;
		const goingRight = this.horizontalSpeed == 20;  
		const goingLeft = this.horizontalSpeed == -20;

		if (keyPressed == keys.LEFT_KEY && !goingRight) {
			this.horizontalSpeed = -20;
			this.verticalSpeed = 0;
			direction = 'left';
		}

		else if (keyPressed === keys.RIGHT_KEY && !goingLeft) { 
			this.horizontalSpeed = 20;
			this.verticalSpeed = 0;
			direction = 'right';
		}

		else if (keyPressed === keys.UP_KEY && !goingDown) {    
			 this.horizontalSpeed = 0;
			 this.verticalSpeed = -20;
			 direction = 'down'
		}

		else if (keyPressed === keys.DOWN_KEY && !goingUp) {    
			 this.horizontalSpeed = 0;
			 this.verticalSpeed = 20;
			 direction = 'up'
		}

		console.log(`Changing direction to ${direction}`);
	}
}