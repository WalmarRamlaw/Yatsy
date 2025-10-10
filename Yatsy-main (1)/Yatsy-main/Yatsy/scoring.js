// scoring.js — super enkel Yatzy scorer + scorekort

const Category = [
  "ONES",
  "TWOS",
  "THREES",
  "FOURS",
  "FIVES",
  "SIXES",
  "ONE_PAIR",
  "TWO_PAIR",
  "THREE_OF_A_KIND",
  "FOUR_OF_A_KIND",
  "SMALL_STRAIGHT",
  "LARGE_STRAIGHT",
  "FULL_HOUSE",
  "CHANCE",
  "YATZY",
];

const YatzyScore = {
  score(cat, dice) {
    const c = count(dice);
    switch (cat) {
      case "ONES":
        return faceSum(1, dice);
      case "TWOS":
        return faceSum(2, dice);
      case "THREES":
        return faceSum(3, dice);
      case "FOURS":
        return faceSum(4, dice);
      case "FIVES":
        return faceSum(5, dice);
      case "SIXES":
        return faceSum(6, dice);

      case "ONE_PAIR":
        return highestPair(c);
      case "TWO_PAIR":
        return twoPair(c);
      case "THREE_OF_A_KIND":
        return nOfAKind(3, c);
      case "FOUR_OF_A_KIND":
        return nOfAKind(4, c);

      case "SMALL_STRAIGHT":
        return isSmallStraight(c) ? 15 : 0; // 1-2-3-4-5
      case "LARGE_STRAIGHT":
        return isLargeStraight(c) ? 20 : 0; // 2-3-4-5-6
      case "FULL_HOUSE":
        return fullHouse(c);
      case "CHANCE":
        return sum(dice);
      case "YATZY":
        return isYatzy(c) ? 50 : 0;
      default:
        return 0;
    }
  },
};

class ScoreCard {
  constructor() {
    this.scores = {}; // { "ONES": 3, ... }
    this.used = new Set();
  }
  remaining() {
    return Category.filter((c) => !this.used.has(c));
  }
  place(cat, dice) {
    if (this.used.has(cat)) return null;
    const pts = YatzyScore.score(cat, dice);
    this.used.add(cat);
    this.scores[cat] = pts;
    return pts;
  }
  upperSum() {
    const ups = ["ONES", "TWOS", "THREES", "FOURS", "FIVES", "SIXES"];
    return ups.reduce((s, c) => s + (this.scores[c] || 0), 0);
  }
  total() {
    const base = Object.values(this.scores).reduce((a, b) => a + b, 0);
    const bonus = this.upperSum() >= 63 ? 50 : 0;
    return base + bonus;
  }
}

/* ===== hjælpere ===== */
function count(d) {
  const c = Array(7).fill(0);
  d.forEach((v) => c[v]++);
  return c;
}
function sum(d) {
  return d.reduce((a, b) => a + b, 0);
}
function faceSum(face, d) {
  return d.filter((v) => v === face).reduce((a, b) => a + b, 0);
}
function highestPair(c) {
  for (let f = 6; f >= 1; f--) if (c[f] >= 2) return f * 2;
  return 0;
}
function twoPair(c) {
  let total = 0,
    found = 0;
  for (let f = 6; f >= 1; f--)
    if (c[f] >= 2) {
      total += f * 2;
      found++;
      if (found === 2) return total;
    }
  return 0;
}
function nOfAKind(n, c) {
  for (let f = 6; f >= 1; f--) if (c[f] >= n) return f * n;
  return 0;
}
function isSmallStraight(c) {
  for (let f = 1; f <= 5; f++) if (c[f] !== 1) return false;
  return c[6] === 0;
}
function isLargeStraight(c) {
  for (let f = 2; f <= 6; f++) if (c[f] !== 1) return false;
  return c[1] === 0;
}
function fullHouse(c) {
  let three = 0,
    two = 0;
  for (let f = 1; f <= 6; f++) {
    if (c[f] === 3) three = f;
    else if (c[f] === 2) two = f;
  }
  return three > 0 && two > 0 ? three * 3 + two * 2 : 0;
}
function isYatzy(c) {
  return c.some((cnt) => cnt === 5);
}
