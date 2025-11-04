// javascripts/data.js
// Datos base del simulador + presets por región (Colombia) y utilidades.

window.AgroData = (() => {
  const crops = {
    maiz: {
      name: "Maíz",
      kc: { inicial: 0.45, desarrollo: 0.8, medio: 1.15, final: 0.6 },
    },
    papa: {
      name: "Papa",
      kc: { inicial: 0.5, desarrollo: 0.85, medio: 1.1, final: 0.65 },
    },
    cafe: {
      name: "Café",
      kc: { inicial: 0.6, desarrollo: 0.9, medio: 1.05, final: 0.8 },
    },
  };
  const stages = ["inicial", "desarrollo", "medio", "final"];

  // mm/día (aprox) por clima genérico
  const etoByClimate = { seco: 6.0, templado: 4.0, lluvioso: 3.0 };

  // Presets por región colombiana (valores representativos para un simulador educativo)
  // Altiplano: 3–4 mm/d | Valles cálidos/Llanos: 5–6 mm/d | Trópico húmedo: ~3 mm/d
  const regionEt0 = {
    altiplano: { name: "Altiplano Andino (3–4 mm/d)", eto: 3.5 },
    valles: { name: "Valles cálidos / Llanos (5–6 mm/d)", eto: 5.5 },
    tropical: { name: "Trópico húmedo (≈3 mm/d)", eto: 3.0 },
    custom: { name: "Personalizado (usar 'Clima')", eto: null }, // delega al selector Clima
  };

  // Propiedades de suelo (referenciales para futuras versiones multi-día)
  const soils = {
    arenoso: { name: "Arenoso", whc: 80, fc: 0.2 },
    arcilloso: { name: "Arcilloso", whc: 130, fc: 0.35 },
    mixto: { name: "Mixto", whc: 100, fc: 0.27 },
  };

  // Eficiencia del sistema (η)
  const methodEff = { goteo: 0.9, aspersion: 0.75, gravedad: 0.6 };

  // Devuelve ET0 usando región (si aplica) o clima
  function getET0({ region, climate }) {
    if (region && regionEt0[region] && regionEt0[region].eto != null) {
      return Number(regionEt0[region].eto);
    }
    return etoByClimate[climate] ?? 4.0;
  }

  return { crops, stages, etoByClimate, regionEt0, soils, methodEff, getET0 };
})();
