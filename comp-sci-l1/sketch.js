let cols, rows;
let gridSize = 50; // size of each grid cell

function setup() {
	createCanvas(windowWidth, windowHeight);
	// floor is to stop weird floating point numbers
	cols = floor(width / gridSize);
	rows = floor(height / gridSize);
}

function draw() {
	background(255);

	// Loop through all the squares in the grid
	for (let i = 0; i < 200; i++) {
		for (let j = 0; j < 150; j++) {
			// shift new cube by gridsize
			x = i * gridSize;
			y = j * gridSize;

			// Draw the square
			rectMode(CENTER);
			fill(((100 / 8.234) % i) * j, (150 / (i % 49)) * j, 255 / i - j, j * i);
			noStroke();
			rect(x, y, gridSize - 10, gridSize - 10);
			rotate(5);
		}
	}
}
