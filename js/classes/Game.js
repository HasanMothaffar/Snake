import Food from "./Food.js";

export default class Game {
	_canvas;
	_element;
	_food;
	
	constructor(canvas, element) {
		this._canvas = canvas;
		this._element = element;
		this._food = new Food(this._element.tileSize, this._canvas.width, this._canvas.height);
	}

	initialRender() {
		this._canvas.clear();
		this._canvas.drawElement(this._element);
	}

	start(gameSpeed) {
		this._food.generateCoordinates(this._element.tiles);
		let gameInterval = setInterval(() => {
			if (this._hasSnakeGameEnded()) {
				alert('dead bitch');
				clearInterval(gameInterval);
				return;
			}

			this._canvas.clear();
			this._element.changingDirection = false;
			this._element.move(this._food);	

			this._canvas.drawElement(this._element);
			this._canvas.drawElement(this._food);
			
		}, gameSpeed)
	}

	_hasSnakeGameEnded() {
		const head = this._element.snakeHead;
		for (let i = 4; i < this._element.tiles.length; i++) {
			if (this._element.tiles[i].x == head.x && this._element.tiles[i].y == head.y) {
				return true;
			}
		}

		const hitLeftWall = head.x < 0;
		const hitRightWall = head.x > this._canvas.width - this._element.tileSize;
		const hitToptWall = head.y < 0;
		const hitBottomWall = head.y > this._canvas.height - this._element.tileSize;

		return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
	}

	_alreadyEaten(food_X, food_Y) {
		return this._element.tiles.some(tile => tile.x == food_X && tile.y == food_Y);
	}
}