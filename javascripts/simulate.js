// javascripts/simulate.js
// Motor de simulación con ET0 por región/clima, Kc, lluvia, eficiencia (η),
// conversión L↔mm y costo en COP (según tarifa ingresada).

window.SimEngine = (() => {
  const cropFactor = { maiz: 1.0, papa: 0.95, cafe: 0.9 };
  const scheduleAdj = { manana: 1.0, tarde: 0.95, noche: 0.9 };

  function computeKc(crop, stage) {
    const c = AgroData.crops[crop];
    if (!c) return 0.9;
    const st = stage || "medio";
    return c.kc[st] ?? 0.9;
  }

  /**
   * simulate
   * @param {Object} args
   * @param {'maiz'|'papa'|'cafe'} args.crop
   * @param {'inicial'|'desarrollo'|'medio'|'final'} args.stage
   * @param {'arenoso'|'arcilloso'|'mixto'} args.soil
   * @param {'seco'|'templado'|'lluvioso'} args.climate
   * @param {'altiplano'|'valles'|'tropical'|'custom'} [args.region]
   * @param {number|string} args.area - m²
   * @param {'goteo'|'aspersion'|'gravedad'} args.method
   * @param {number|string} args.water - L aplicados
   * @param {number|string} [args.rain] - mm (opcional)
   * @param {'manana'|'tarde'|'noche'} args.schedule
   */
  function simulate({
    crop,
    stage,
    soil,
    climate,
    region,
    area,
    method,
    water,
    rain,
    schedule,
  }) {
    const area_m2 = Math.max(1, Number(area || 0));
    const water_L = Math.max(0, Number(water || 0));
    const rain_mm = Math.max(0, Number(rain != null ? rain : 0));
    const eta = AgroData.methodEff[method] ?? 0.75;

    // ET0 según región (si preset) o clima
    const ET0 = AgroData.getET0({ region, climate }); // mm/d
    const Kc = computeKc(crop, stage);
    const ETc = ET0 * Kc;

    // Riego efectivo (mm): 1 mm = 1 L/m²; ajustado por η
    const effWater_mm = (water_L / area_m2) * eta;

    // Aporte neto diario
    const net_mm = rain_mm + effWater_mm;

    // Productividad (proxy %)
    let ratio = ETc > 0 ? net_mm / ETc : 0;
    ratio *= scheduleAdj[schedule] ?? 1.0;
    ratio *= cropFactor[crop] ?? 1.0;

    const productivity = Number(
      Math.max(0, Math.min(120, ratio * 100)).toFixed(1)
    );
    let tip = "Buen equilibrio hídrico para el día.";
    if (productivity > 105)
      tip = "Exceso hídrico: reduce riego para evitar pérdidas.";
    if (productivity < 70)
      tip = "Déficit hídrico: aumenta riego o usa horarios frescos.";

    // Litros recomendados para cubrir ETc (si hay déficit) considerando η
    const deficit_mm = Math.max(0, ETc - rain_mm);
    const recLiters = Math.round((deficit_mm * area_m2) / eta);

    // Costo en COP (se formatea en UI)
    const costPerM3 = Number(document.getElementById("price")?.value || 0);
    const costoCOP = (water_L / 1000) * costPerM3;

    return {
      crop,
      stage,
      soil,
      climate,
      region,
      area: area_m2,
      method,
      water: water_L,
      rain: rain_mm,
      schedule,
      ET0: Number(ET0.toFixed(2)),
      Kc: Number(Kc.toFixed(2)),
      ETc: Number(ETc.toFixed(2)),
      effWater_mm: Number(effWater_mm.toFixed(2)),
      recLiters,
      cost: costoCOP,
      productivity,
      tip,
      createdAt: Date.now(),
    };
  }

  return { simulate };
})();
