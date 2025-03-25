let colorPickers = [];
let colorNames = [
  "primary",
  "secondary",
  "text",
  "contrast-text",
  "background",
]; //can be added to for a wider palette

function setup() {
  noCanvas();

  // create the div for the color pickers
  let colorPickerDiv = createDiv();
  colorPickerDiv.addClass("color-picker-container");

  // create color pickers and push them to the array
  for (let i = 0; i < colorNames.length; i++) {
    // create a div for each color picker
    let pickerDiv = createDiv();
    pickerDiv.addClass("picker-wrapper"); // add a class for styling each color picker wrapper

    // title (color name) above each color picker
    let title = createElement("h2", toTitleCase(colorNames[i])); // capitalize the first letter
    title.addClass("picker-title");
    title.parent(pickerDiv);

    // generate a random color and convert it to hex
    let hexColor = convertToHex(randRGB());
    let hexColorComp = "#" + hexColor.join("");
    let picker = createColorPicker(hexColorComp);
    picker.parent(pickerDiv);

    // set css var to color
    setCSSVar(colorNames[i], hexColorComp);

    // create a paragraph element to display the hex code under the color picker
    let hexReadout = createP("#" + hexColor.join(""));
    hexReadout.addClass("hex-readout");
    hexReadout.parent(pickerDiv);

    // Append the color picker div to the main container
    pickerDiv.parent(colorPickerDiv);

    // store the picker in the array
    colorPickers.push(picker);

    // listen for changes and update the corresponding CSS variable
    picker.input(function () {
      let colorValue = picker.value();
      setCSSVar(colorNames[i], colorValue); // update the CSS variable when the picker changes
      hexReadout.html(colorValue); // Update the hex code readout under the picker
    });
  }
}

function draw() {}

// function to generate random RGB values
function randRGB() {
  let randR = floor(random(256));
  let randG = floor(random(256));
  let randB = floor(random(256));
  return [randR, randG, randB];
}

// function for converting RGB values to hex
function convertToHex(values) {
  let colorHex = [];
  // loop through array of values and convert each channel of R G B into their hexa decimal values
  for (let value of values) {
    // base conversion tutorial: https://www.youtube.com/watch?v=dkaX9NGaGn4
    // haha who knew the solution was so simple?
    // start ---------------
    //convert to hexa decimal
    let convertedHex = value.toString(16).padStart(2, "0"); // padding to always have two values
    // end   ---------------

    colorHex.push(convertedHex);
  }
  return colorHex;
}

function toTitleCase(value) {
  // convert to titlecase tutorial: www.freecodecamp.org/news/javascript-capitalize-first-letter-of-word/
  // start ------------
  const firstLetter = value.charAt(0).toUpperCase() + value.slice(1);
  const capitalizedWord = firstLetter;
  // end   ------------
  return capitalizedWord;
}

function setCSSVar(name, value) {
  // tutorial to set css vars with JS: https://css-tricks.com/updating-a-css-variable-with-javascript/
  // start ----------
  // Set the CSS variable on the root :root
  document.documentElement.style.setProperty(`--${name}-color`, value);
  // end   ----------
}
