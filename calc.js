// ===============================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ===============================

function getFix(mmr, table) {
  const row = table.find(r => mmr >= r.from && mmr < r.to);
  return row ? row.price : 0;
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

// ===============================
// РАСЧЁТ MMR BOOST (передача)
// ===============================

function calcMMRBoost(from, to, doubles) {
  let base = 0;

  for (const r of MMR_FIXES) {
    const start = Math.max(from, r.from);
    const end = Math.min(to, r.to);

    if (end > start) {
      base += ((end - start) / 100) * r.price;
    }
  }

  let booster = base;

  if (doubles) {
    booster *= from < 7700
      ? MODIFIERS.mmrDoublesUnder7700
      : MODIFIERS.mmrDoublesOver7700;
  }

  return {
    fix: Math.round(base),
    booster: Math.round(booster)
  };
}

// ===============================
// РАСЧЁТ PARTY BOOST (игра с клиентом)
// ===============================

function calcPartyBoost(mmr, wins, doubles) {
  let basePerWin = getFix(mmr, PARTY_FIXES);
  let base = basePerWin * wins;
  let booster = base;

  if (doubles) {
    if (mmr < 5620) {
      booster = base * MODIFIERS.partyDoublesUnder5620;
    } else if (mmr < 7000) {
      booster = base * MODIFIERS.partyDoubles5620to7000;
    } else if (mmr < 8500) {
      booster = MODIFIERS.partyDoubles7000to8500 * wins;
    }
  }

  return {
    fix: Math.round(base),
    booster: Math.round(booster)
  };
}

// ===============================
// КАЛИБРОВКА (передача аккаунта)
// ===============================

function calcCalibrationTransfer(mmr, wins) {
  const perWin = getFix(mmr, CALIB_FIXES);
  const base = perWin * wins;
  return {
    fix: Math.round(base),
    booster: Math.round(base)
  };
}

// ===============================
// ОТМЫВ LOW PRIORITY
// ===============================

function calcLowPriority(mmr, lpCount, partyWithClient) {
  const perLp = getFix(mmr, LP_FIXES);
  const base = perLp * lpCount;
  const booster = partyWithClient ? base * 1.5 : base;
  return {
    fix: Math.round(base),
    booster: Math.round(booster)
  };
}

// ===============================
// ПОДНЯТИЕ ПОРЯДОЧНОСТИ
// ===============================

function calcBehavior(fromScore, toScore, highMmrAccount) {
  const delta = Math.max(0, toScore - fromScore);
  let per1000 = BEHAVIOR_PRICES.from9000;

  if (fromScore < 5000) per1000 = BEHAVIOR_PRICES.under5000;
  else if (fromScore < 9000) per1000 = BEHAVIOR_PRICES.under9000;

  const base = (delta / 1000) * per1000;
  const booster = highMmrAccount
    ? base * BEHAVIOR_PRICES.highMmrAccountMultiplier
    : base;

  return {
    fix: Math.round(base),
    booster: Math.round(booster)
  };
}

// ===============================
// ГЛАВНЫЙ РАСЧЁТ
// ===============================

function calculate(data) {
  let fix = 0;
  let booster = 0;

  if (data.type === "mmr") {
    const res = calcMMRBoost(data.from, data.to, data.doubles);
    fix = res.fix;
    booster = res.booster;
  }

  if (data.type === "party") {
    const res = calcPartyBoost(data.from, data.to, data.doubles);
    fix = res.fix;
    booster = res.booster;
  }

  if (data.type === "calib") {
    const res = calcCalibrationTransfer(data.from, data.to);
    fix = res.fix;
    booster = res.booster;
  }

  if (data.type === "lp") {
    const res = calcLowPriority(data.from, data.to, data.partyWithClient);
    fix = res.fix;
    booster = res.booster;
  }

  if (data.type === "behavior") {
    const res = calcBehavior(data.from, data.to, data.highMmrAccount);
    fix = res.fix;
    booster = res.booster;
  }

  // low confidence (для party)
  if (data.lowConfidence && data.type === "party") {
    booster *= MODIFIERS.lowConfidence;
  }

  booster = Math.round(booster);

  // FanPay (50/50)
  const coeff = (FANPAY_COEFFS && FANPAY_COEFFS[data.category])
    ? FANPAY_COEFFS[data.category]
    : (FANPAY_COEFFS ? FANPAY_COEFFS.boost : 1.08);

  const feeTotal = booster * (coeff - 1);         // если бы 100% комиссии было на тебе
  const feeMine = feeTotal * FANPAY_SPLIT;        // твоя часть комиссии (50%)
  const cost = booster + feeMine;                 // фикса + комка(50/50)

  // Цена клиенту: фикса + комка(50/50) + маржа
  const client = cost * (1 + data.margin);

  return {
    fix: Math.round(fix),
    booster: Math.round(booster),
    fanpay: Math.round(feeMine),
    client: Math.round(client),
    profit: Math.round(client - cost),
    coeff: round2(coeff)
  };
}

// ===============================
// КАЛЬКУЛЯТОР КОМИССИИ 50/50
// ===============================

function calcFanPaySplit(sum) {
  const out = {};
  for (const k of Object.keys(FANPAY_COEFFS)) {
    const coeff = FANPAY_COEFFS[k];
    const buyer100 = sum * coeff;
    const list5050 = sum * (1 + (coeff - 1) * FANPAY_SPLIT);
    out[k] = {
      coeff: round2(coeff),
      buyer100: round2(buyer100),
      list5050: round2(list5050)
    };
  }
  return out;
}
