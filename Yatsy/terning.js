class Terning {
  constructor() {
    this.xCoordinates = [50, 120, 190, 260, 330, 400];
    this.hoverX = [];
    this.hoverY = 200;
    this.roll = [1, 2, 3, 4, 5, 6, 7];
  }

  draw() {
    background(220);
    for (let i = 0; i < this.xCoordinates.length; i += 1)
      this.dice(this.xCoordinates[i], 200, this.roll[i]);
  }

  /* Dice */
  dice(diceX, diceY, roll) {
    textSize(18);
    rect(diceX, diceY, 50, 50, 10);
    stroke(0);
    fill(255);
    text(roll, diceX + 20, diceY + 30);
    fill(0);
  }

  /* Roll dice */
  rollDice() {
    for (let i = 0; i < this.xCoordinates.length; i += 1) {
      this.roll[i] = int(random(1, 7));
    }
    Antal_slag--
  if (Antal_slag < 1) {
    Antal_slag = 3
    next= true
    spillernr++
    if (spillernr >= Antal_spillere){
      spillernr = 0
    }
  } else {
    next = false
}
}
}