function getFix(mmr, table) {
  return table.find(r => mmr >= r.from && mmr < r.to)?.price || 0;
}

function calcMMR(from, to) {
  let sum = 0;
  for (let r of MMR_FIXES) {
    const a = Math.max(from, r.from);
    const b = Math.min(to, r.to);
    if (b > a) {
      sum += ((b - a) / 100) * r.price;
    }
  }
  return sum;
}

function calculate(data) {
  let booster = 0;

  if (data.type === "mmr") {
    booster = calcMMR(data.from, data.to);
    if (data.doubles && data.from >= 7700)
      booster *= MODIFIERS.doublesMMR7700;
  }

  if (data.type !== "mmr") {
    booster = getFix(data.from, WIN_FIXES) * data.to;

    if (data.type === "party" &&
        data.doubles &&
        data.from >= 5620 && data.from < 7000)
      booster *= MODIFIERS.partyDoubles5620;

    if (data.type === "calib")
      booster *= MODIFIERS.calibAlways;

    if (data.share && data.doubles) {
      booster *= data.from < 7700
        ? MODIFIERS.shareUnder7700
        : MODIFIERS.shareOver7700;
    }
  }

  if (data.lowConfidence)
    booster *= MODIFIERS.lowConfidence;

  const client =
    booster * FANPAY_COEFF * (1 + data.margin);

  return {
    booster: Math.round(booster),
    client: Math.round(client),
    profit: Math.round(client - booster * FANPAY_COEFF)
  };
}
