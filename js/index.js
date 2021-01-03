import Canvas from "./classes/Canvas.js";
import Snake from "./classes/Snake.js";
import Game from "./classes/Game.js";
import EventHandler from "./classes/EventHandler.js";

const snake = new Snake(100, 100, 4, 20);
const snakeBoard = new Canvas({
	id: 'snakeBoard',
	element: snake,
});

const snakeGame = new Game(snakeBoard, snake);
const buttonsWrapper = document.querySelector('.buttons-wrapper');
const eventHandler = new EventHandler(snakeGame);


snakeGame.initialRender();
buttonsWrapper.addEventListener('click', eventHandler)