window.Optimizer = (() => {
  function findOptimalWater(metaPct, baseInputs) {
    const target = Math.max(10, Math.min(100, Number(metaPct || 85)));
    let low = 0,
      high = 20000; // rango L (0–20 m³)
    let best = { water: 0, productivity: 0 };

    for (let iter = 0; iter < 20; iter++) {
      const mid = Math.round((low + high) / 2);
      const run = SimEngine.simulate({ ...baseInputs, water: mid });
      best = run;
      if (run.productivity >= target) high = mid - 1;
      else low = mid + 1;
    }
    return { liters: best.water, productivity: best.productivity };
  }

  function sensitivitySeries(baseInputs, step = 200, max = 6000) {
    const xs = [],
      ys = [];
    for (let w = 0; w <= max; w += step) {
      const run = SimEngine.simulate({ ...baseInputs, water: w });
      xs.push(w);
      ys.push(run.productivity);
    }
    return { xs, ys };
  }

  return { findOptimalWater, sensitivitySeries };
})();
