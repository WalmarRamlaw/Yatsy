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
      this.dice(
        this.xCoordinates[i],
        this.hoverY,
        this.roll[i],
        this.locked[i],
        next
      );
  }

  /* Dice */
  dice(diceX, diceY, roll, locked, next) {
    textSize(18);
    if (locked == true) {
      fill(0, 230, 0);
    } else {
      fill(0);
    }
    rect(diceX, diceY, 50, 50, 10);
    stroke(0);
    fill(255);
    text(roll, diceX + 20, diceY + 30);
    fill(0);
    if (next == true) {
      rect(height / 3 - 25, width / 3 - 25, 50);
    }
  }

  /* Roll dice */
  rollDice() {
    if (Antal_slag > 0) {
      for (let i = 0; i < this.xCoordinates.length; i += 1) {
        if (!this.locked[i]) {
          this.roll[i] = int(random(1, 7));
        }
      }
      Antal_slag--;
      if (Antal_slag == 0) {
        next = true;
      } else {
        next = false;
      }
    }
  }
  Valg() {
    for (let i = 0; i < this.xCoordinates.length; i++)
      if (
        mouseX > this.xCoordinates[i] &&
        mouseX < this.xCoordinates[i] + 50 &&
        mouseY > this.hoverY &&
        mouseY < this.hoverY + 50
      ) {
        this.locked[i] = !this.locked[i];
      }
  }

  // terning.js — inde i class Terning { ... }
  getFiveDice() {
    // Brug de 5 første terninger til scoring
    return [
      this.roll[0],
      this.roll[1],
      this.roll[2],
      this.roll[3],
      this.roll[4],
    ];
  }

  næsteSpiller() {
    Antal_slag = 2;
    spillernr++;
    this.locked = [false, false, false, false, false, false];
    for (let i = 0; i < this.xCoordinates.length; i += 1) {
      this.roll[i] = int(random(1, 7));
    }
    if (spillernr >= Antal_spillere) {
      spillernr = 0;
    }
  }
}
