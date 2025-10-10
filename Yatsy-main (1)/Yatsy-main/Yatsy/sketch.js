// sketch.js
Antal_spillere = 4;
let Spiller;
Spillere = [];
Antal_slag = 2;
next = false;
spillernr = 0;
let terning;

// NYT: scorekort pr. spiller
let scoreCards = [];

function setup() {
  createCanvas(800, 800);
  Spiller = new spiller();
  terning = new Terning();

  for (let i = 0; i < Antal_spillere; i++) {
    Spillere[i] = "Spiller " + (i + 1);
    scoreCards[i] = new ScoreCard(); // NYT
  }
}

function draw() {
  background(220);

  // Dine terninger og UI
  terning.draw();
  terning.dice(); // (din oprindelige kaldesignatur bruges)

  Spiller.player();
  // “Rul”-knap i midten (din eksisterende)
  rect(height / 2 - 25, width / 2 - 25, 50);

  // NYT: Score-panel til højre
  drawScorePanel();
}

function drawScorePanel() {
  const panelX = 550,
    panelY = 40,
    lineH = 24;
  const card = scoreCards[spillernr];
  const dice5 = terning.getFiveDice();

  push();
  noStroke();
  fill(245);
  rect(panelX - 10, panelY - 30, 170, 520, 8);

  textSize(16);
  textAlign(LEFT, TOP);

  // Tegn ALLE kategorier
  for (let i = 0; i < Category.length; i++) {
    const cat = Category[i];
    const y = panelY + i * lineH;
    const used = card.used.has(cat);

    // hover-effekt
    if (
      mouseX >= panelX - 10 &&
      mouseX <= panelX + 160 &&
      mouseY >= y &&
      mouseY < y + lineH
    ) {
      stroke(0);
      noFill();
      rect(panelX - 10, y - 2, 170, lineH, 4);
      noStroke();
    }

    // Hvis feltet er brugt → rød boks med hvid tekst
    if (used) {
      fill(255, 100, 100);
      rect(panelX - 10, y - 2, 170, lineH, 4);
      fill(255);
    } else {
      fill(next ? 0 : 120); // grå/sort tekst hvis man ikke må klikke
    }

    // Kategorinavn
    text(cat.replaceAll("_", " "), panelX, y);

    // Hvis feltet er brugt → vis gemt værdi, ellers preview
    const val = used ? card.scores[cat] : YatzyScore.score(cat, dice5);
    text(val, panelX + 120, y);
  }

  // sum + bonus nederst
  const yBase = panelY + Category.length * lineH + 10;
  fill(0);
  textAlign(LEFT, TOP);
  text("Øvre sum: " + card.upperSum(), panelX, yBase);
  const bonusTxt = card.upperSum() >= 63 ? " (bonus +50)" : "";
  text("Total: " + card.total() + bonusTxt, panelX, yBase + lineH);

  pop();
}

// Klik-håndtering
function mousePressed() {
  // Din eksisterende “rul”-knap
  if (
    mouseX > width / 2 - 25 &&
    mouseX < width / 2 + 25 &&
    mouseY > height / 2 - 25 &&
    mouseY < height / 2 + 25
  ) {
    terning.rollDice();
  }
  terning.Valg();

  // Din eksisterende “næste spiller”-knap (tegnes når next==true)
  if (
    mouseX > width / 3 - 25 &&
    mouseX < width / 3 + 25 &&
    mouseY > height / 3 - 25 &&
    mouseY < height / 3 + 25
  ) {
    if (next == true) {
      terning.næsteSpiller();
      next = false;
    }
  }

  // NYT: klik på kategori i højre panel
  handleScoreClick();
}

function handleScoreClick() {
  if (!next) return; // kun når turen er slut og man skal vælge felt

  const panelX = 430,
    panelY = 40,
    lineH = 24;
  if (mouseX < panelX - 10 || mouseX > panelX + 160) return;

  const card = scoreCards[spillernr];
  const rem = card.remaining();

  // VIGTIGT: brug samme panelY og lineH som i drawScorePanel (TOP alignment)
  const idx = Math.floor((mouseY - panelY) / lineH);
  if (idx < 0 || idx >= rem.length) return;

  const chosen = rem[idx];
  if (card.used.has(chosen)) return; // ekstra sikkerhed

  const dice5 = terning.getFiveDice();
  const pts = card.place(chosen, dice5);
  if (pts !== null) {
    terning.næsteSpiller();
    next = false;
  }
}
