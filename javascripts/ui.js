// javascripts/ui.js
// Render de KPIs, gráficas (Chart.js), historial, comparación y calendario.
// Incluye formateo de costo en COP.

window.UI = (() => {
  let chart, sensChart;

  function initChart() {
    const el = document.getElementById("chart");
    if (!el) {
      console.error("No se encontró #chart");
      return;
    }
    const ctx = el.getContext("2d");
    chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Productividad (%)"],
        datasets: [{ label: "Resultado", data: [0], borderWidth: 2 }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // usa la altura del contenedor/canvas (ej. h-64)
        scales: { y: { beginAtZero: true, max: 120 } },
        plugins: { legend: { display: false } },
      },
    });

    const sensEl = document.getElementById("sensitivityChart");
    if (sensEl) {
      sensChart = new Chart(sensEl.getContext("2d"), {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "Productividad vs Agua (L)",
              data: [],
              borderWidth: 2,
              pointRadius: 0,
            },
          ],
        },
        options: {
          responsive: true,
          scales: { y: { beginAtZero: true, max: 120 } },
        },
      });
    }
  }

  function updateChart(value) {
    if (!chart) initChart();
    chart.data.datasets[0].data = [Number(value) || 0];
    chart.update();
  }

  function updateEtInfo(run) {
    const etInfo = document.getElementById("etInfo");
    const rec = document.getElementById("recLiters");
    if (etInfo)
      etInfo.textContent = `ET₀ ${run.ET0.toFixed(1)} · Kc ${run.Kc.toFixed(
        2
      )} · ETc ${run.ETc.toFixed(1)} mm/d`;
    if (rec) rec.textContent = `${run.recLiters} L`;
  }

  function renderRun(run) {
    // KPIs principales
    const p = document.getElementById("productivity");
    if (p) p.textContent = `${run.productivity}%`;

    const wu = document.getElementById("waterUsed");
    if (wu) wu.textContent = `${run.water} L`;

    // Resumen (si existe en tu HTML)
    const summary = document.getElementById("summary");
    if (summary) {
      summary.textContent = `Cultivo: ${run.crop} · Suelo: ${run.soil} · Clima: ${run.climate} · Área: ${run.area} m² · Método: ${run.method}`;
    }

    const ts = document.getElementById("timestamp");
    if (ts) ts.textContent = new Date(run.createdAt).toLocaleString();

    const tip = document.getElementById("tip");
    if (tip) tip.textContent = run.tip;

    // Costo formateado en COP
    const cost = document.getElementById("cost");
    if (cost) {
      const fmtCOP = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
      });
      cost.textContent =
        run.cost != null && !isNaN(run.cost) ? fmtCOP.format(run.cost) : "—";
    }

    updateEtInfo(run);
    updateChart(run.productivity);
  }

  function renderHistory() {
    const wrap = document.getElementById("history");
    if (!wrap) return;
    wrap.innerHTML = "";
    const items = Store.all();
    items.forEach((r, idx) => {
      const btn = document.createElement("button");
      btn.className =
        "text-left rounded-xl border border-slate-200 p-3 hover:border-emerald-400 focus:ring-2 focus:ring-emerald-200 outline-none transition";
      btn.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="text-sm font-semibold">${r.productivity}% · ${
        r.water
      } L</span>
          <input type="checkbox" data-compare="${idx}" class="w-4 h-4 text-emerald-600 rounded" aria-label="Seleccionar escenario ${
        idx + 1
      } para comparar" />
        </div>
        <p class="text-xs text-slate-500 mt-1">${new Date(
          r.createdAt
        ).toLocaleString()}</p>
        <p class="text-xs mt-1">${r.crop} · ${r.soil} · ${r.climate} · ${
        r.schedule
      } · ${r.area} m²</p>
      `;
      btn.addEventListener("click", (e) => {
        if (e.target && e.target.matches('input[type="checkbox"]')) return;
        // Cargar configuración desde historial (si el elemento existe en el DOM)
        [
          "crop",
          "soil",
          "climate",
          "area",
          "method",
          "water",
          "rain",
          "schedule",
          "stage",
        ].forEach((k) => {
          const el = document.getElementById(k);
          if (el && r[k] != null) el.value = r[k];
        });
        renderRun(SimEngine.simulate(r));
      });
      wrap.appendChild(btn);
    });
    bindCompare();
  }

  function bindCompare() {
    document
      .querySelectorAll('input[type="checkbox"][data-compare]')
      .forEach((cb) => cb.addEventListener("change", updateCompare));
  }

  function updateCompare() {
    const items = Store.all();
    const selected = Array.from(
      document.querySelectorAll('input[type="checkbox"][data-compare]:checked')
    )
      .map((el) => Number(el.getAttribute("data-compare")))
      .slice(0, 2);
    const body = document.getElementById("compareBody");
    if (!body) return;
    body.innerHTML = "";
    if (selected.length < 2) {
      body.innerHTML = `<tr><td class="py-2 pr-4 text-slate-500" colspan="3">Selecciona dos escenarios del historial para comparar.</td></tr>`;
      return;
    }
    const A = items[selected[0]],
      B = items[selected[1]];
    const diffProd = (A.productivity - B.productivity).toFixed(1);
    const diffWater = (A.water - B.water).toFixed(0);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="py-2 pr-4 align-top">
        <div class="font-semibold">${A.productivity}% · ${A.water} L</div>
        <div class="text-xs text-slate-500">${A.crop} · ${A.soil} · ${
      A.climate
    } · ${A.schedule} · ${A.area} m²</div>
      </td>
      <td class="py-2 pr-4 align-top">
        <div class="font-semibold">${B.productivity}% · ${B.water} L</div>
        <div class="text-xs text-slate-500">${B.crop} · ${B.soil} · ${
      B.climate
    } · ${B.schedule} · ${B.area} m²</div>
      </td>
      <td class="py-2 pr-4 align-top">
        <div class="text-sm">Δ Productividad: <span class="${
          diffProd >= 0 ? "text-emerald-700" : "text-rose-700"
        } font-semibold">${diffProd}%</span></div>
        <div class="text-sm">Δ Agua: <span class="${
          diffWater >= 0 ? "text-emerald-700" : "text-rose-700"
        } font-semibold">${diffWater} L</span></div>
      </td>
    `;
    body.appendChild(row);
  }

  // Sensibilidad (agua → productividad)
  function renderSensitivity(baseInputs) {
    if (!sensChart) return;
    const { xs, ys } = Optimizer.sensitivitySeries(baseInputs, 200, 6000);
    sensChart.data.labels = xs;
    sensChart.data.datasets[0].data = ys;
    sensChart.update();
  }

  // Calendario semanal simple
  function renderWeekPlan(run) {
    const wrap = document.getElementById("weekPlan");
    if (!wrap) return;
    const base = Math.max(0, run.recLiters);
    const daily = Math.round(base * 0.6);
    const plan = [
      daily,
      daily,
      daily,
      daily,
      daily,
      Math.round(daily * 0.8),
      Math.round(daily * 0.5),
    ];
    wrap.innerHTML = "";
    plan.forEach((v, i) => {
      const card = document.createElement("div");
      card.className = "rounded-xl border border-slate-200 p-3 text-center";
      card.innerHTML = `<div class="text-xs text-slate-500 mb-1">Día ${
        i + 1
      }</div><div class="text-lg font-semibold">${v} L</div>`;
      wrap.appendChild(card);
    });
    const btn = document.getElementById("exportWeekCsv");
    if (btn) btn.onclick = () => Exporter.exportWeekCSV(plan);
  }

  function toggleDark() {
    document.documentElement.classList.toggle("dark");
  }

  return {
    initChart,
    renderRun,
    renderHistory,
    updateChart,
    renderSensitivity,
    renderWeekPlan,
    toggleDark,
  };
})();
