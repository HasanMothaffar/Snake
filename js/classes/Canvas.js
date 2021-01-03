export default class Canvas {

	/* -- private fields -- */
	_board; //canvas element
	_ctx; //2d context
	_boardBackground;
	_width;
	_height;
	_element; // element to render
	
	constructor({
		id = 'canvas',
		snake = [],
		width = 300,
		height = 300,
		boardBackground = 'white',
		boardBorder = 'silver',
		element = {}
	}) {
		this._board = document.getElementById(id);
		this._ctx = this._board.getContext('2d');
		this._element = element;

		this._width = width;
		this._height = height;
		this._boardBackground = boardBackground;
	}

	/**
	 * @returns {number}
	 */
	get width() { return this._width; }

	/**
	 * @returns {number}
	 */
	get height() { return this._height; }

	/**
	 * clears the canvas
	 * @returns {void}
	 */
	clear() {
		this._ctx.fillStyle = this._boardBackground;
		this._ctx.clearRect(0, 0, this._width, this._height);
	}

	/**
	 * calls the element's rendering function
	 * @param {any} element - element to render 
	 */
	drawElement(element) {
		element.drawOnCanvas(this._ctx);
	}
}
