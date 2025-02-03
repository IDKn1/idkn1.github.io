var arm = {
	color: "#ffc27a",
	x: 0,
	y: 0,
	x2: 0,
	y2: 0,
	angle: 0,
	speed: 0.01,
	rotate: function () {
		rotate(this.angle, width, height);
		this.angle += this.speed;
		console.log(this.angle);
	},
	draw: function () {
		stroke(this.color);
		strokeWeight(5);
		line(this.x, this.y, this.x2, this.y2);
	},
};
var armBlue = {
	color: "#6aaf9d",
	x: 0,
	y: 0,
	x2: 0,
	y2: 0,
	angle: 0,
	speed: 0.008,
	rotate: function () {
		rotate(this.angle, width, height);
		this.angle += this.speed;
		console.log(this.angle);
	},
	draw: function () {
		stroke(this.color);
		strokeWeight(5);
		line(this.x, this.y, this.x2, this.y2);
	},
};
function setup() {
	createCanvas(windowWidth, windowHeight);
	background("#201433");
	arm.x = width / 2;
	arm.y = height / 2;
	armBlue.x = width / 2;
	armBlue.y = height / 2;
}

function draw() {
	background("#20143305");
	translate(width / 2, height / 2);
	armBlue.rotate();
	armBlue.draw();
	arm.rotate();
	arm.draw();
	translate(width / 2, height / 2);
}
