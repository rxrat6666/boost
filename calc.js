// ===============================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ===============================

function getFix(mmr, table) {
  const row = table.find(r => mmr >= r.from && mmr < r.to);
  return row ? row.price : 0;
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

  // low confidence (для party)
  if (data.lowConfidence && data.type === "party") {
    booster *= MODIFIERS.lowConfidence;
  }

  booster = Math.round(booster);

  // FanPay
  const fanpayCost = booster * FANPAY_COEFF;

  // Цена клиенту
  const client = fanpayCost * (1 + data.margin);

  return {
    fix: Math.round(fix),
    booster: Math.round(booster),
    fanpay: Math.round(fanpayCost),
    client: Math.round(client),
    profit: Math.round(client - fanpayCost)
  };
}
