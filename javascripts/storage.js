// Persistencia en localStorage y utilidades
window.Store = (() => {
  const KEY = "riego_history";

  function _get() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
      return [];
    }
  }
  function _set(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
  }

  function add(run) {
    const items = _get();
    items.unshift(run);
    _set(items.slice(0, 50)); // máximo 50
  }
  function all() {
    return _get();
  }
  function clear() {
    _set([]);
  }

  // Export/Import
  function toCSV() {
    const rows = [
      [
        "fecha",
        "cultivo",
        "etapa",
        "suelo",
        "clima",
        "horario",
        "area_m2",
        "metodo",
        "agua_L",
        "lluvia_mm",
        "productividad_%",
        "ET0",
        "Kc",
        "ETc",
        "sugerencia",
      ],
    ];
    for (const r of all()) {
      rows.push([
        new Date(r.createdAt).toISOString(),
        r.crop,
        r.stage,
        r.soil,
        r.climate,
        r.schedule,
        r.area,
        r.method,
        r.water,
        r.rain,
        r.productivity,
        r.ET0,
        r.Kc,
        r.ETc,
        (r.tip || "").replace(/,/g, ";"),
      ]);
    }
    return rows.map((row) => row.join(",")).join("\n");
  }

  function importJSON(jsonText) {
    const arr = JSON.parse(jsonText);
    if (!Array.isArray(arr)) throw new Error("Formato inválido");
    const safe = arr.filter(
      (x) => x && typeof x === "object" && "productivity" in x
    );
    localStorage.setItem(KEY, JSON.stringify(safe.slice(0, 50)));
  }

  return { add, all, clear, toCSV, importJSON };
})();
