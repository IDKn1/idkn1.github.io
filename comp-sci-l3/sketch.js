let rowArr = [];
let currentValue = 1; // start with Option 1
let numRows = 30; // number of radio button rows
let numCols = 25; // number of options per radio button
let paused = false; //animation state
let speed;
let slider; //scoping slider so it can be used in the draw loop and keypressed after setup

function setup() {
  createCanvas(400, 50);
  for (let i = 0; i < numRows; i++) {
    // create a new radio group for each row
    let currDiv = createRadio();

    // add options
    for (let j = 0; j < numCols; j++) {
      currDiv.option(j); // add options 0, 1, ..., 9
    }

    // set the default selected option for each group
    currDiv.selected("1");

    // Store the radio group in the rowArr
    rowArr[i] = currDiv;
  }
  slider = createSlider(1, 20, 10, 2);
  speed = slider.value();
  text("click to temporarily pause", 10, 10);
  text("p to toggle pause", 10, 25);
  text("s to slow, f to speed up", 10, 40);
}

function draw() {
  if (!paused) {
    // loop through each row
    for (let row in rowArr) {
      let radioGroup = rowArr[row];
      // let options = radioGroup.elt.getElementsByTagName("input");

      // Loop through the radio buttons and change selection
      if (frameCount % speed === 0) {
        // Get the current selected index and increment it
        let selectedIndex = (parseInt(currentValue) + 1) % numCols;

        // Set the selected radio button for each row
        radioGroup.selected(selectedIndex.toString());
        currentValue = selectedIndex; // Update currentValue
      }
    }
  } else {
  }
}

function keyPressed() {
  if (key === "p") {
    // Toggle paused state
    paused = !paused;
    console.log(paused ? "animation paused" : "animation resumed");
  } else if (key === "f") {
    // Slow down the animation (decrease speed)
    slider.value(slider.value() - 2); // Decrease slider value by 1
    console.log("Speed decreased to " + speed);
  } else if (key === "s") {
    // Speed up the animation (increase speed)
    slider.value(slider.value() + 1); // Increase slider value by 1
    console.log("Speed increased to " + speed);
  }
  speed = slider.value(); // Update speed
}

// refferenced from https://archive.p5js.org/reference/#/p5/mouseReleased
function mousePressed() {
  paused = true;
}

function mouseReleased() {
  paused = false;
}
