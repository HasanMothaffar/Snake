import * as keys from "../key_constants.js";

export default class Snake {
	/* -- private fields -- */
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

		for (let i = 0; i < numOfStartingBlocks; i++) {
			this._tiles.push({
				x: initialX,
				y: initialY
			})

			initialX += this._tileSize;
		}
		this.registerEventListener();
	}

	get snakeHead() {
		return this._tiles[0];
	}

	get tiles() {
		return this._tiles;
	}

	set changingDirection(value) {
		this._changingDirection = value;
	}

	/* -- Getters and Setters -- */

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

	registerEventListener() {
		document.addEventListener('keydown', this.changeDirection.bind(this));
	}

	changeDirection(event) {
		let direction = '';
		const keyPressed = event.keyCode;
		if (this._changingDirection) return; //used to prevent the snake from going into the reverse direction. for example, going up and then down
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