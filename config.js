// ===============================
// ОБЩИЕ НАСТРОЙКИ
// ===============================
// FanPay: коэффициенты (сколько платит покупатель, чтобы продавец получил 1)
// Пример: если нужно получить 100, покупатель платит 114.89 => coeff = 1.1489
const FANPAY_COEFFS = {
    education: 1.0998,
  boost: 1.11
};

// Делёж комиссии 50/50 (часть на выдавателе, часть на бустере)
// Твоя часть комиссии = (coeff - 1) / 2
// Себестоимость до маржи = booster * (1 + (coeff - 1)/2)
const FANPAY_SPLIT = 0.5;
const DEFAULT_MARGIN = 0.25; // 25% твоя маржа (можно менять из UI)

// ===============================
// MMR BOOST (передача аккаунта)
// цена за 100 MMR
// ===============================
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

// ===============================
// PARTY BOOST (игра с клиентом)
// цена за победу
// ===============================
const PARTY_FIXES = [
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
  { from: 7000, to: 8500, price: 480 }, // с даблами = 600
  { from: 8500, to: 9500, price: 700 },
  { from: 9500, to: 10000, price: 800 }
];

// ===============================
// КАЛИБРОВКА (передача аккаунта)
// цена за win
// ===============================
const CALIB_FIXES = [
  { from: 0, to: 2000, price: 55 },
  { from: 2000, to: 3000, price: 65 },
  { from: 3000, to: 4000, price: 75 },
  { from: 4000, to: 4500, price: 90 },
  { from: 4500, to: 5000, price: 100 },
  { from: 5000, to: 5500, price: 135 },
  { from: 5500, to: 6000, price: 165 },
  { from: 6000, to: 6500, price: 200 },
  { from: 6500, to: 7000, price: 250 },
  { from: 7000, to: 7500, price: 300 },
  { from: 7500, to: 8000, price: 350 },
  { from: 8000, to: 8500, price: 400 },
  { from: 8500, to: 9000, price: 500 },
  { from: 9000, to: 9500, price: 600 },
  { from: 9500, to: 10000, price: 700 },
  { from: 10000, to: 10500, price: 750 },
  { from: 10500, to: 11000, price: 850 }
];

// ===============================
// ОТМЫВ Low Priority (1 LP = 1 игра)
// цена за 1 LP
// ===============================
const LP_FIXES = [
  { from: 0, to: 3000, price: 50 },
  { from: 3000, to: 5600, price: 75 },
  { from: 5600, to: 8000, price: 150 },
  { from: 8000, to: 1e9, price: 200 }
];

// ===============================
// ПОДНЯТИЕ ПОРЯДОЧНОСТИ
// цена за 1000 порядочности зависит от текущей порядки
// ===============================
const BEHAVIOR_PRICES = {
  under5000: 2000,
  under9000: 3000,
  from9000: 4000,
  highMmrAccountMultiplier: 1.30 // 7500+ ммр аккаунт
};

// ===============================
// МОДИФИКАТОРЫ
// ===============================
const MODIFIERS = {
  // MMR Boost (передача)
  mmrDoublesUnder7700: 0.75, // -25%
  mmrDoublesOver7700: 0.70,  // -30%

  // Party Boost
  partyDoublesUnder5620: 1.50, // +50%
  partyDoubles5620to7000: 1.30, // +30%
  partyDoubles7000to8500: 600,  // фикс за win

  // Общие
  lowConfidence: 0.90 // -10%
};
