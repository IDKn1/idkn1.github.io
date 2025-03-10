let input;
let values = [];
let resultDiv, layoutDiv;

function setup() {
  noCanvas(); // stop empty canvas making padding issues
  // create an input field
  input = createInput();

  // create a button to submit the input
  let submitButton = createButton("Submit");
  submitButton.mousePressed(handleInput);

  // create layout generation button
  let generateButton = createButton("Generate");
  generateButton.mousePressed(buildLayout);

  // create a div to display queued components
  resultDiv = createDiv();

  // fullscreen helper text
  let fullHelp = createP("Press `F` to toggle fullscreen state");

  // create a paragraph for the prompt message
  let inputParagraph = createP(
    "Enter a value (or press the 'generate' button to build the website layout):"
  );
  let options = createP("Options include: hero, about, split, quote");

  let title = createElement("h1", "Website Generator");
  // div to make gui portion styling easier in css
  let gui = createDiv();
  gui.addClass("gui");
  // add main layout to body and  generator elements to the gui div
  title.parent(gui);
  fullHelp.parent(gui);
  inputParagraph.parent(gui);
  options.parent(gui);
  input.parent(gui);
  submitButton.parent(gui);
  resultDiv.parent(gui);
  generateButton.parent(gui);
  gui.parent(document.body);
  // create div for generated layout
  layoutDiv = createDiv();
  layoutDiv.addClass("layout");
  layoutDiv.parent(document.body);
}

function keyPressed() {
  // check for f key press and toggle fullscreen state
  if (key === "f") {
    // check if the input field has focus
    // figured out from: https://www.w3schools.com/jsref/prop_document_activeelement.asp
    if (document.activeElement === input.elt) {
      return; // Do nothing if the input field is focused prevents mistriggering fullscreen while typing
    }
    let fs = fullscreen();
    fullscreen(!fs); //toggle fullscreen state
  }
  if (key === "Enter") {
    handleInput(); //add enter as other means for toggling handleInput instead of clicking the button
  }
}

function handleInput() {
  let userInput = input.value().trim(); // get the user input and remove any extra spaces

  values.push(userInput); // append the input to the array
  resultDiv.html("Website components to be created: " + values.join(", ")); // display the current values to be created
  input.value(""); // clear the input field for the next entry
}

// layout builder function
// parses values from array and then adds them in order to the layoutDiv
function buildLayout() {
  for (item of values) {
    if (item === "hero") {
      createHero();
      console.log("hero item added");
    } else if (item === "about") {
      createAbout();
      console.log("about item added");
    } else if (item === "split") {
      createSplit();
      console.log("split item added");
    } else if (item === "quote") {
      createQuote();
      console.log("quote item added");
    } else {
      alert(item + " is not a valid option"); // fallback state
    }
  }
  values = []; // reset array to avoid creation of duplicates
  resultDiv.html("Website components to be created: "); // clear result output
}

function createHero() {
  let img = createImg(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cow_%28Fleckvieh_breed%29_Oeschinensee_Slaunger_2009-07-07.jpg/800px-Cow_%28Fleckvieh_breed%29_Oeschinensee_Slaunger_2009-07-07.jpg"
  );
  img.addClass("heroImg");
  img.parent(layoutDiv);
}

function createAbout() {
  // about div for 2 column grid layout
  let about = createDiv();
  about.addClass("about");
  let profile = createImg(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5ilihiQWied-urDIQFLy0h6p7bR8RNjMXuQ&s"
  );
  profile.parent(about);
  let aboutText = createP(
    "Hello I am a cow. I enjoy mooing and eating grass. Did you know that I have four compartments within my stomach. They are called the rumen, reticulum, omasum, and abomasum."
  );
  aboutText.parent(about);
  about.parent(layoutDiv);
}

function createSplit() {
  // twoCol div made for equal split layout
  let twoCol = createDiv();
  twoCol.addClass("twoCol");
  let copy = createDiv();
  copy.parent(twoCol);
  let heading = createElement("h2", "Info About Cattle");
  // source for text: https://en.wikipedia.org/wiki/Cattle
  let body = createP(
    "Cattle (Bos taurus) are large, domesticated, bovid ungulates widely kept as livestock. They are prominent modern members of the subfamily Bovinae and the most widespread species of the genus Bos. Mature female cattle are called cows and mature male cattle are bulls. Young female cattle are called heifers, young male cattle are oxen or bullocks, and castrated male cattle are known as steers."
  );
  let img = createImg(
    "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSVLKD3NCrmKNdGPqKys4o3gEywhptKjSW79W7Dyz9PiTIxA0_7JaTy0cjPVAJzz73Q4ZiyadcO0gUcu9i32-ikVQ"
  );
  img.addClass("twoCol-img");
  // added everything to their respective parent
  heading.parent(copy);
  body.parent(copy);
  img.parent(twoCol);
  twoCol.parent(layoutDiv);
}

function createQuote() {
  let fullQuote = createDiv();
  let quote = createElement(
    "h3",
    "Moooo, mooo moo *chewing noise* mooooo. Mooooo moo"
  );
  quote.addClass("quote");
  quote.parent(fullQuote);
  let author = createP("— A Cow ");
  author.addClass("author");
  author.parent(fullQuote);

  fullQuote.addClass("fullQuote");
  fullQuote.parent(layoutDiv);
}
