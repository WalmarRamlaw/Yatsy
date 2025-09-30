class Terning {
  constructor() {
    this.xCoordinates = [50, 120, 190, 260, 330, 400];
    this.hoverX = [];
    this.hoverY = 200;
    this.roll = [1, 2, 3, 4, 5, 6, 7];
    this.locked = [false, false, false, false, false, false];
  }

  draw() {
    background(220);
    for (let i = 0; i < this.xCoordinates.length; i += 1)
      this.dice(this.xCoordinates[i], this.hoverY, this.roll[i], this.locked[i]);
  }

  /* Dice */
  dice(diceX, diceY, roll, locked) {
    textSize(18);
        if (locked==true){
      fill(0,230,0)
    } else {(fill(0))}
    rect(diceX, diceY, 50, 50, 10);
    stroke(0);
    fill(255);
    text(roll, diceX + 20, diceY + 30);
    fill(0);
  }
 
  /* Roll dice */
  rollDice() {
    for (let i = 0; i < this.xCoordinates.length; i += 1) {
      if(!this.locked[i]){
      this.roll[i] = int(random(1, 7));
      }
    }
    Antal_slag--
  if (Antal_slag < 1) {
    Antal_slag = 3
    next= true
    spillernr++
    this.locked = [false, false, false, false, false, false];
    if (spillernr >= Antal_spillere){
      spillernr = 0
    }
  } else {
    next = false
}
}
  Valg(){
        for (let i = 0; i < this.xCoordinates.length; i ++)
          if (mouseX > this.xCoordinates[i] && mouseX < this.xCoordinates[i]+50 && mouseY > this.hoverY && mouseY < this.hoverY+50) {
    this.locked[i] = !this.locked[i];} 

  }
}