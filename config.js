// === ОБЩИЕ НАСТРОЙКИ ===
const FANPAY_COEFF = 1.08;
const DEFAULT_MARGIN = 0.25; // 25%

// === MMR BOOST (руб за 100 ммр) ===
const MMR_FIXES = [
  { from: 0, to: 2000, price: 125 },
  { from: 2000, to: 3000, price: 150 },
  { from: 3000, to: 3500, price: 185 },
  { from: 3500, to: 4000, price: 250 },
  { from: 4000, to: 4500, price: 300 },
  { from: 4500, to: 5000, price: 330 },
  { from: 5000, to: 5500, price: 420 },
  { from: 5500, to: 6000, price: 470 },
  { from: 6000, to: 6500, price: 560 },
  { from: 6500, to: 7700, price: 600 },
  { from: 7700, to: 8500, price: 800 },
  { from: 8500, to: 9000, price: 900 },
  { from: 9000, to: 9500, price: 1200 },
  { from: 9500, to: 10000, price: 1400 },
  { from: 10000, to: 10500, price: 1700 },
  { from: 10500, to: 11000, price: 2000 }
];

// === PARTY / CALIB (руб за win) ===
const WIN_FIXES = [
  { from: 0, to: 2000, price: 55 },
  { from: 2000, to: 3000, price: 65 },
  { from: 3000, to: 3500, price: 75 },
  { from: 3500, to: 4000, price: 90 },
  { from: 4000, to: 4500, price: 100 },
  { from: 4500, to: 5000, price: 135 },
  { from: 5000, to: 5500, price: 165 },
  { from: 5500, to: 6000, price: 200 },
  { from: 6000, to: 6500, price: 300 },
  { from: 6500, to: 7000, price: 400 },
  { from: 7000, to: 8500, price: 480 },
  { from: 8500, to: 9500, price: 700 },
  { from: 9500, to: 10000, price: 800 }
];

// === МОДИФИКАТОРЫ ===
const MODIFIERS = {
  doublesMMR7700: 1.30,
  partyDoubles5620: 1.30,
  calibAlways: 1.50,

  shareUnder7700: 0.75,
  shareOver7700: 0.70,

  lowConfidence: 0.90
};
