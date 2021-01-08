/** Class representing food for the snake */
export default class Food {
	_x; // x coordinate for the food
	_y; // y coordinate for the food
	_XLimit; // horizontal limit that the snake cannot go further
	_YLimit; // vertical limit that the snake cannot go further
	_foodSize;
	_foodColor;
	_foodBorderColor;

	/**
	 * Initialize a food object.
	 * @param {number} foodSize - Size of the food tile
	 * @param {number} canvasWidth - Horizontal limit for both the food and the snake
	 * @param {number} canvasHeight - Vertical limit for both the food and the snake
	 * @param {string} foodColor - Fill color for the piece of food
	 * @param {string} foodBorderColor - Fill color for the border of the piece of food
	 */
	constructor(foodSize, canvasWidth, canvasHeight, foodColor, foodBorderColor) {
		this._XLimit = canvasWidth;
		this._YLimit = canvasHeight;
		this._foodSize = foodSize;
		this._foodColor = foodColor;
		this._foodBorderColor = foodBorderColor;
	}
	
	/**
	 * @return {number}
	 */
	get x() { return this._x; }
	/**
	 * @return {number}
	 */
	get y() { return this._y; }

	/**
	 * draws the piece of food in the parent canvas
	 * @param {CanvasRenderingContext2D} context - context of the parent canvas
	 * @returns {void}
	 */
	drawOnCanvas(context) {
		context.fillStyle = this._foodColor;
		context.strokeStyle = this._foodBorderColor;

		context.fillRect(this._x, this._y, this._foodSize, this._foodSize);
		context.strokeRect(this._x, this._y, this._foodSize, this._foodSize);
	}

	/**
	 * generate coordinates for the piece of food.
	 * @param {Array} tiles - array of tiles that the snake occupies 
	 * @returns {void}
	 */
	generateCoordinates(tiles) {
		this._x = this._randomCoordinate(0, this._XLimit - this._foodSize);
		this._y = this._randomCoordinate(0, this._YLimit - this._foodSize);
		// as long as the generated coordinates overlap with the snake's tiles, call this function again to generate another pair of coordinates
		while(this._foodCollidesWithSnake(tiles))
			this.generateCoordinates(tiles);
	}
	/**
	 * returns true if the randomly generated piece of food lies on top of any of the snake's tiles
	 * @param {Array} tiles - array of tiles that the snake occupies 
	 * @returns {boolean}  
	 */
	_foodCollidesWithSnake(tiles) {
		return tiles.some(tile => tile.x == this._x && tile.y == this._y);
	}

	/**
	 * generate a random coordinate for the piece of food
	 * @param {number} min - usually 0, which is the starting point of the canvas
	 * @param {number} max - the furthest place on the canvas upon which the piece of food can be generated
	 * @returns {number} A random number representing a coordinate. note that this isn't an (x, y) pair. it's just a single number
	 */
	_randomCoordinate(min, max) {
		return Math.round((Math.random() * (max-min) + min) / this._foodSize) * this._foodSize;
	}
}