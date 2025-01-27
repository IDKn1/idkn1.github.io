let x, y;
let speedX, speedY;
let squareSize = 50;
let fadeAmt = 10;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(20);
	//  position and speed
	// divide by 2 roughly centers it
	x = width / 2;
	y = height / 2;
	speedX = 5;
	speedY = 5;
}

function draw() {
	// background drawn with alpha to add ghosting effect
	background(20, fadeAmt);

	rect(x, y, squareSize, squareSize);

	// update position
	x += speedX;
	y += speedY;

	// define bounds and reverse corosponding value if bound is excedded
	if (x + squareSize > width || x < 0) {
		speedX *= -1; // reverse horizontal speed
	}

	if (y + squareSize > height || y < 0) {
		speedY *= -1; // reverse vertical speed
	}
}
