let terning;

function setup() {
  createCanvas(450, 400);
  terning = new Terning();
}

function draw() {
  background(220);
  terning.draw();
  terning.dice();
}

/* Dice rolling logic */
function mousePressed() {
  terning.rollDice();
}
