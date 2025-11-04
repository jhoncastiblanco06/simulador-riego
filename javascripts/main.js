// javascripts/main.js
// Inicialización de UI, poblar selects, manejo de eventos y orquestación de módulos.

document.addEventListener("DOMContentLoaded", () => {
  // Iconos y gráfico principal
  feather.replace();
  UI.initChart();

  // === Referencias a elementos ===
  const els = {
    crop: document.getElementById("crop"),
    stage: document.getElementById("stage"),
    soil: document.getElementById("soil"),
    climate: document.getElementById("climate"),
    region: document.getElementById("region"),
    area: document.getElementById("area"),
    method: document.getElementById("method"),
    water: document.getElementById("water"),
    rain: document.getElementById("rain"), // puede no existir en el HTML
    schedule: document.getElementById("schedule"),
    price: document.getElementById("price"),

    simulateBtn: document.getElementById("simulateBtn"),
    saveBtn: document.getElementById("saveBtn"),
    exportPng: document.getElementById("exportPng"),
    exportCsv: document.getElementById("exportCsv"),
    importJson: document.getElementById("importJson"),
    clearHistory: document.getElementById("clearHistory"),
    darkToggle: document.getElementById("darkToggle"),
    chartCanvas: document.getElementById("chart"),

    optimizeBtn: document.getElementById("optimizeBtn"),
    targetProd: document.getElementById("targetProd"),
    optResult: document.getElementById("optResult"),
  };

  // === Poblar selects desde AgroData ===
  // Cultivo
  Object.entries(AgroData.crops).forEach(([value, cfg]) => {
    const o = document.createElement("option");
    o.value = value;
    o.textContent = cfg.name;
    els.crop.appendChild(o);
  });

  // Etapas fenológicas
  AgroData.stages.forEach((s) => {
    const o = document.createElement("option");
    o.value = s;
    o.textContent = s;
    els.stage.appendChild(o);
  });
  els.stage.value = "medio";

  // Suelos
  Object.entries(AgroData.soils).forEach(([value, cfg]) => {
    const o = document.createElement("option");
    o.value = value;
    o.textContent = cfg.name;
    els.soil.appendChild(o);
  });
  els.soil.value = "arcilloso";

  // Región (si existe en el HTML)
  if (els.region) {
    // Ya viene con opciones en el HTML; solo asegurar default:
    els.region.value = "custom"; // usar "Clima" por defecto
  }

  // === Helpers ===
  function formValues() {
    return {
      crop: els.crop.value,
      stage: els.stage.value,
      soil: els.soil.value,
      climate: els.climate.value,
      region: els.region ? els.region.value : "custom",
      area: els.area.value,
      method: els.method.value,
      water: els.water.value,
      rain: els.rain ? els.rain.value : 0, // si no hay campo lluvia en el HTML, usar 0
      schedule: els.schedule.value,
    };
  }

  function runSimulation() {
    const vals = formValues();
    const run = SimEngine.simulate(vals);
    console.log("RUN DEBUG →", run);
    UI.renderRun(run);
    UI.updateChart(run.productivity);
    UI.renderSensitivity(vals);
    UI.renderWeekPlan(run);
    return run;
  }

  // === Eventos ===
  if (els.simulateBtn) {
    els.simulateBtn.addEventListener("click", runSimulation);
  }

  if (els.saveBtn) {
    els.saveBtn.addEventListener("click", () => {
      const run = runSimulation();
      Store.add(run);
      UI.renderHistory();
    });
  }

  if (els.exportPng) {
    els.exportPng.addEventListener("click", () => {
      if (!els.chartCanvas) return;
      Exporter.exportChartPNG(els.chartCanvas);
    });
  }

  if (els.exportCsv) {
    els.exportCsv.addEventListener("click", () => Exporter.exportCSV());
  }

  if (els.importJson) {
    els.importJson.addEventListener("change", async (e) => {
      if (e.target.files && e.target.files[0]) {
        try {
          await Exporter.importJSONFromFile(e.target.files[0]);
          UI.renderHistory();
          alert("Historial importado correctamente.");
        } catch (err) {
          alert("Error al importar JSON: " + err.message);
        }
        e.target.value = "";
      }
    });
  }

  if (els.clearHistory) {
    els.clearHistory.addEventListener("click", () => {
      Store.clear();
      UI.renderHistory();
    });
  }

  if (els.darkToggle) {
    els.darkToggle.addEventListener("click", UI.toggleDark);
  }

  // Optimizador (meta de productividad)
  if (els.optimizeBtn && els.targetProd && els.optResult) {
    els.optimizeBtn.addEventListener("click", () => {
      const base = formValues();
      const target = Number(els.targetProd.value || 85);
      const { liters, productivity } = Optimizer.findOptimalWater(target, base);
      els.optResult.textContent = `Óptimo ≈ ${liters} L → productividad ${productivity.toFixed(
        1
      )}%`;
      // precargar para ejecutar simulación con el óptimo
      els.water.value = liters;
    });
  }

  // === Primer render ===
  UI.renderHistory();
  UI.renderRun(SimEngine.simulate(formValues()));
  UI.renderSensitivity(formValues());
});
