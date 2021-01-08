import Canvas from "./classes/Canvas.js";
import Snake from "./classes/Snake.js";
import Game from "./classes/Game.js";
import EventHandler from "./classes/EventHandler.js";

const snake = new Snake(100, 100, 4, 20, 'darkgreen', 'yellow');
const snakeBoard = new Canvas({
	id: 'snakeBoard',
	element: snake,
	width: 600,
	height: 600,
});

const snakeGame = new Game(snakeBoard, snake);
const eventHandler = new EventHandler(snakeGame);

document.addEventListener('keydown', eventHandler);
dark_mode.addEventListener('click', (event) => {
	document.documentElement.classList.toggle('dark');
	snakeBoard.switchColorTheme();
	snakeGame.updateCanvas();
	event.target.blur();
});

// this adds support for keyboard arrows.