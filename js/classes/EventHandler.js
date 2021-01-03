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
		let id = event.target.id;
		this._providerElement[id]();

		/*
			Example use case:
			the pause button is pressed, which causes an event with event.target.id == 'pause' to be emitted
			now this objects listens to this event and calls the appropriate snakeBoard method.
			note that snakeBoard == this._providerElement

		*/
	}
}

/**
 * TODO: find a way to pass the gameSpeed parameter to the snakeBoard.start() method
 */