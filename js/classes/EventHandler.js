import * as Keys from "../key_constants.js";
import Game from "./Game.js";

export default class EventHandler {
	_providerElement;
	_alreadyStarted; //a boolean to indicate whether the user started the game before.

	/**
	 * initializes the element that we want to take the methods from
	 * @param {Game} providerElement 
	 */
	constructor(providerElement) {
		this._providerElement = providerElement;
	}

	handleEvent(event) {
		const keyPressed = event.keyCode;
		let method = '';

		if (keyPressed == Keys.SPACE && this._alreadyStarted) {
			if (this._alreadyStarted == true) {
				console.log('Resuming.');
				method = 'resume';
			}
			else {
				console.log('Starting the game. Have fun!');
				method = 'start';
				this._alreadyStarted = true;
			}
		}

		else if (keyPressed == Keys.ESCAPE) {
			console.log('Pausing the game.');
			method = 'pause';
		}

		else if (keyPressed == Keys.R && this._providerElement.isSnakeDead()) {
			method = 'restart';
		}

		if (method) {
			this._providerElement[method]();
		}

	}
}

/**
 * TODO: find a way to pass the gameSpeed parameter to the snakeBoard.start() method
 */