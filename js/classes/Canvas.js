export default class Canvas {

	/* -- private fields -- */
	_board; //canvas element
	_ctx; //2d context
	_boardBackground;
	_boardBorder;
	_width;
	_height;
	_element; // element to render
	_colorTheme; //string to indicate whether the canvas is in dark or light mode
	
	constructor({
		id = 'canvas',
		width = 300,
		height = 300,
		boardBackground = '#846A6A',
		boardBorder = 'silver',
		element = {}
	}) {
		this._board = document.getElementById(id);
		this._ctx = this._board.getContext('2d');

		this._element = element;
		this._boardBorder = boardBorder;
		this._boardBackground = boardBackground;
		this._colorTheme = 'white';
		this._width = width;
		this._height = height;

		this._adjustDimensions();
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
	 * sets the correct width and height values for the canvas
	 */
	_adjustDimensions() {
		this._board.setAttribute('width', this._width);
		this._board.setAttribute('height', this._height);

		// these are html attributes. required for proper rendering of the canvas element

		this._board.style.width = this._width + 'px';
		this._board.style.height = this.height + 'px';

		// these are css properties for the real width and height properties
	}

	/**
	 * clears the canvas
	 * @returns {void}
	 */
	clear() {
		this._ctx.fillStyle = this._boardBackground;
		this._ctx.strokeStyle = this._boardBorder;
		this._ctx.fillRect(0, 0, this._width, this._height);
		this._ctx.strokeRect(0, 0, this._width, this._height);
	}

	/**
	 * calls the element's rendering function
	 * @param {any} element - element to render 
	 */
	drawElement(element) {
		element.drawOnCanvas(this._ctx);
	}

	/* -- COLOR THEME LOGIC -- */

	setWhiteMode() {
		this._boardBackground = '#846A6A';
		this._boardBorder = 'silver';
		this._colorTheme = 'white';
	}

	setDarkMode() {
		this._boardBackground = 'black';
		this._boardBorder = 'yellow';
		this._colorTheme = 'dark';
	}

	switchColorTheme() {
		if (this._colorTheme == 'white') {
			this.setDarkMode();
		}

		else {
			this.setWhiteMode();
		}
	}
}
