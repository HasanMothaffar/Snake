import Canvas from "./classes/Canvas.js";
import Snake from "./classes/Snake.js";
import Game from "./classes/Game.js";

const snake = new Snake(100, 100, 4, 20);

const snakeBoard = new Canvas({
	id: 'snakeBoard',
	element: snake,
});

const snakeGame = new Game(snakeBoard, snake);

snakeGame.initialRender();
button.onclick = () => snakeGame.start(100);