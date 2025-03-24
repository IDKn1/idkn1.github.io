let moos = [];

function preload() {
  let moo1 = createAudio("moos/moo1.mp3");
  let moo2 = createAudio("moos/moo2.mp3");
  let moo3 = createAudio("moos/moo3.mp3");
  moos.push(moo1);
  moos.push(moo2);
  moos.push(moo3);
}
function setup() {
  noCanvas();
  let cow = createImg(
    "https://i.guim.co.uk/img/media/595623e12934b89a84bb3a739c0e080f77e0d69e/0_346_5184_3110/master/5184.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=7fdef914494ca0e77949ace68c6a675f"
  );
  cow.mousePressed(handleMooput);
}

function draw() {}

function handleMooput() {
  console.log("MOOO");
  let mooNum = floor(random(3));
  moos[mooNum].play();
}
