// colorPalette light to dark
const colorPalette = ["#6f5f6f", "#473c4f", "#36313c", "#2e2b33", "#262227"];
let wGL;
let fft;
let soundFile;

// Tutorial 1: https://archive.p5js.org/reference/#/p5.FFT
// fast fourier transform used to get the audio spectrum levels
// =====================
function preload() {
  soundFile = loadSound("audio/noFi.opus");
}
// =====================
// t1 end

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Tutorial 2: https://p5js.org/examples/advanced-canvas-rendering-create-graphics/
  // used to fix background alpha transparency making the fading animation
  // ==============
  wGL = createGraphics(width, height, WEBGL);
  // ==============
  // t2 end

  fft = new p5.FFT(0.8, 256); // Low sensitivity, 257 bins
  fft.setInput(soundFile);
}

function draw() {
  // fft.analyze called to tell fft to actually analyze the incoming audio stream
  fft.analyze();

  // low frequency to control the background alpha
  let lowEnd = fft.getEnergy(20, 200); // bass frequencies (20-200 Hz)
  let alpha = map(lowEnd, 200, 255, 100, 10); // map the low-end energy to alpha
  let strokeW = map(lowEnd, 200, 255, 1, 10); // map the low-end to stroke weight

  // keeps the map value from having weird outputs if below the set amount
  if (lowEnd < 200) {
    strokeW = 1;
    alpha = 100;
  }

  let c = color(colorPalette[4]);
  c.setAlpha(alpha);
  wGL.background(c);

  // high end used to change the scale
  let highEnd = fft.getEnergy(4000, 16000); // highs frequencies (4kHz to 16kHz)
  // rescales the highEnd data from 0-255 to 0.5-2 (these second values can be changed to what ever I want)
  let scale = map(highEnd, 0, 255, 0.5, 10);
  wGL.noFill();

  // map the highend energy over the color palette in reverse so more energy = brighter on the color palette
  let strokeColorIndex = Math.floor(
    map(highEnd, 80, 220, colorPalette.length - 2, 0)
  ); // Math.floor is used to keep the values as whole numbers

  if (highEnd < 80) {
    // keeps the map value from having weird outputs if below the set amount
    strokeColorIndex = colorPalette.length - 2;
    // keeps the map value from having weird outputs if above the set amount
  } else if (highEnd > 220) {
    strokeColorIndex = 0;
  }

  let strokeColor = colorPalette[strokeColorIndex]; // stroke color picked from the color palette based on the stroke color index amount

  // wGL. comes from the tutorial 2 example used to change stuff within the 3d canvas instead of the 2d canvas it is rendered on
  wGL.stroke(strokeColor);
  wGL.strokeWeight(strokeW);

  // Tutorial 3: https://p5js.org/tutorials/coordinates-and-transformations/
  // used to figure out three dimensional shapes and rotation
  // =========================
  // Apply 3D transformations and rotations to the shape
  wGL.push(); // without push and pop it would diappear out of frame almost right away
  wGL.rotateY(frameCount / 60);
  wGL.rotateX(frameCount / 30);
  //==========================
  // t3 end

  wGL.scale(scale); // added scaling based on mid-range freqs

  wGL.box(50);
  wGL.pop();

  // draws the 3d canvas on top of the 2d one to make the fade effect work properly
  image(wGL, 0, 0);
  fill(255);
  text("click to toggle play state", 30, 30);
  text("WARNING FLASHING LIGHTS", 30, 50); // a warning
}

// Tutorial 1 again
// ==================
// toggles play state also needed because web browsers need interaction before playing files
function mousePressed() {
  if (soundFile.isPlaying()) {
    soundFile.pause();
  } else {
    soundFile.play();
  }
}
// ===================
// t1 end
