export default class Canvas {

	/* -- private fields -- */
	_board;
	_ctx;
	_boardBackground;
	_boardBorder;
	_width;
	_height;
	_element;
	
	constructor({
		id = 'canvas',
		snake = [],
		width = 300,
		height = 300,
		boardBackground = 'white',
		boardBorder = 'black',
		element = {}
	}) {
		this._board = document.getElementById(id);
		/** @type {CanvasRenderingContext2D} */
		this._ctx = this._board.getContext('2d');
		this._element = element;

		this._width = width;
		this._height = height;
		this._boardBackground = boardBackground;
		this._boardBorder = boardBorder;
	}

	get width() { return this._width; }

	get height() { return this._height; }

	clear() {
		this._ctx.strokestyle = this._boardBorder;
		this._ctx.fillStyle = this._boardBackground;
		
		this._ctx.clearRect(0, 0, this._width, this._height);
		this._ctx.strokeRect(0, 0, this._width, this._height);
	}

	drawElement(element) {
		element.drawOnCanvas(this._ctx);
	}
}
