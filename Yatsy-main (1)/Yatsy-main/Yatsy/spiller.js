class spiller {
  constructor() {
  }

  player(){ 
    this.tur = Spillere[spillernr]
    console.log(this.tur)
    textSize(32);
    text(this.tur, 10, 30);
    text("Antal slag tilbage: " + Antal_slag, 10, 70);
    
  }

}





