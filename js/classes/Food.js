export default class Food {
	_x;
	_y;
	_XLimit;
	_YLimit;
	_foodSize;

	constructor(foodSize, canvasWidth, canvasHeight) {
		this._XLimit = canvasWidth;
		this._YLimit = canvasHeight;
		this._foodSize = foodSize;
	}

	get x() { return this._x; }
	get y() { return this._y; }


	drawOnCanvas(context) {
		context.fillStyle = 'lightgreen';
		context.strokestyle = 'darkgreen';
		
		context.fillRect(this._x, this._y, this._foodSize, this._foodSize);
		context.strokeRect(this._x, this._y, this._foodSize, this._foodSize);
	}

	generateCoordinates(tiles) {
		this._x = this.randomCoordinate(0, this._XLimit - this._foodSize);
		this._y = this.randomCoordinate(0, this._YLimit - this._foodSize);
		while(tiles.some(tile => tile.x == this._x && tile.y == this._y))
			this.generateCoordinates(tiles);
	}

	randomCoordinate(min, max) {
		return Math.round((Math.random() * (max-min) + min) / this._foodSize) * this._foodSize;
	}
}