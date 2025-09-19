Antal_spillere = 2
let Spiller
Spillere = []
Antal_slag = 3
next = false
spillernr = 0
let terning;

function setup() {
  createCanvas(600, 600);
  Spiller = new spiller()
  terning = new Terning();
    for (let i = 0; i < Antal_spillere; i++) {
    Spillere[i] = "Spiller " + (i + 1);
  }
}


function draw() {
  background(220);
  terning.draw();
  terning.dice();
  Spiller.player()
  //Laver en firkant der er i midten af canvas, der er 50 pixels stor
  rect(height/2-25,width/2-25,50)
  
  //Man registrer muse positionen og hvis den er inden i firkanten eller parametrene bliver position værdi lavet om til 1.
  if (mouseX > width/2-25 && mouseX < width /2+25 && mouseY > height/2-25 && mouseY < height / 2+25) {
    position = 1;} 
  else{
    //hvis musen ikke er inde i firkanten bliver værdien lavet om til 0 igen
    position = 0}

  }

//Laver en funktion mere til når musen bliver trykket
function mousePressed() {
  //Hvis position = 1, eller inde i firkanten bliver plusset 1 til antal slag
  if (position == "1") {
    terning.rollDice();
  }  
    
}