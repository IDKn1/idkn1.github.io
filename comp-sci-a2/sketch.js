// https://archive.p5js.org/reference/#/p5.FFT

// Color Palette dark to light
const colorPalette = ["#6f5f6f", "#473c4f", "#36313c", "#2e2b33", "#262227"];
let wGL;

function setup() {
  createCanvas(windowWidth, windowHeight);
  wGL = createGraphics(width, height, WEBGL);
}

function draw() {
  // background decided by colorPalette and alpha amount based on low frequency volume
  let c = color(colorPalette[4]);
  if (frameCount % 300) {
    c.setAlpha(random(1, 30));
  }
  wGL.background(c);
  // Tutorial 1: https://p5js.org/tutorials/coordinates-and-transformations/
  // used for three shapes and rotation
  // Combined with: https://p5js.org/examples/advanced-canvas-rendering-create-graphics/
  // used to fix background alpha transparency making the fading animation
  // =========================
  // 1/1000th x milliseconds increase per frame draw
  // let angle = millis() * 0.001;

  wGL.noFill();
  wGL.stroke(colorPalette[0]);
  wGL.push();
  wGL.rotateY(frameCount / 60);
  wGL.rotateX(frameCount / 30);

  // pg.fill(colorPalette[0]);
  wGL.box();
  wGL.pop();
  // =======================
  //t1 end
  image(wGL, 0, 0);
}
