import * as Keys from "../key_constants.js";

export default class EventHandler {
	_providerElement;

	/**
	 * initializes the element that we want to take the methods from
	 * @param {Object} providerElement 
	 */
	constructor(providerElement) {
		this._providerElement = providerElement;
	}

	handleEvent(event) {
		const keyPressed = event.keyCode;
		let method = '';

		if (keyPressed == Keys.SPACE) {
			method = 'start';
		}

		else if (keyPressed == Keys.ESCAPE) {
			method = 'pause';
		}

		if (method) {
			this._providerElement[method]();
		}

	}
}

/**
 * TODO: find a way to pass the gameSpeed parameter to the snakeBoard.start() method
 */