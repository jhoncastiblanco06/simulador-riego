Simulador de Riego Eficiente – Colombia 🌱💧

Prototipo educativo (UNIMINUTO) para optimizar la lámina de riego, estimar costos (COP) y reducir el impacto hídrico en el sector rural colombiano.
Basado en ET₀ (FAO Penman–Monteith), Kc (FAO-56) y eficiencia del método de riego (η).

Demo: https://jhoncastiblanco06.github.io/simulador-riego/

Video (YouTube): https://www.youtube.com/watch?v=_N6mc1o2rEg



Descripción

El Simulador de Riego Eficiente permite a un agricultor:

1- Configurar el escenario (cultivo, etapa fenológica, suelo, región/ET₀, clima, método, área y horario).

2- Calcular la demanda hídrica (ETc) y la productividad estimada.

3- Recomendar litros de riego ajustando por eficiencia del método (η) y lluvia.

4 -Estimar costos en COP/m³.

5 -Visualizar gráficas (productividad, sensibilidad) y un calendario semanal sugerido.

6 -Guardar, comparar y exportar escenarios (PNG/CSV) e importar históricos (JSON).

7- Consultar fuentes oficiales (FAO/IDEAM/MADR/UPRA) integradas en una página de apoyo.

Objetivo: apoyar decisiones de riego basadas en evidencia, fomentando el ahorro de agua y la reducción de costos.

Características

🔧 Configuración completa del escenario (cultivo/etapa/suelo/región/método/área/horario/lluvia/tarifa).

🧮 Cálculo ETc con visualización de ET₀/Kc/ETc.

🎯 Recomendación de litros ajustada por η (gravedad/aspersión/goteo) y lluvia.

💸 Costo estimado en COP ((L / 1000) × tarifa (COP/m³)).

📈 Gráficas de productividad y análisis de sensibilidad (agua → %), con exportación a PNG.

📅 Calendario semanal de riego y exportación a CSV.

🧰 Historial (guardar/cargar/limpiar), comparación de escenarios, exportar CSV, importar JSON.

📚 Fuentes oficiales (tablas y bibliografía en APA) para transparencia.


Stack técnico

Frontend: HTML + Tailwind CSS (CDN) + JavaScript modular

Gráficas: Chart.js

Iconos: Feather Icons

Datos locales: LocalStorage / archivos CSV/JSON

Infraestructura: 100% estático (sirve en GitHub Pages / Netlify / Vercel / Nginx)

Estructura del proyecto
app/
├─ index.html
├─ css/
│  └─ styles.css
├─ htmls/
│  ├─ about.html
│  ├─ guide.html
│  └─ sources.html
└─ javascripts/
   ├─ data.js         # Presets (ET0 regional, Kc, η, catálogos)
   ├─ simulate.js     # Cálculos (ETc, recomendación, costo, productividad)
   ├─ optimizer.js    # Análisis de sensibilidad y meta de productividad
   ├─ export.js       # Exportación PNG/CSV e importación JSON
   ├─ storage.js      # Historial (guardar/cargar/limpiar)
   ├─ ui.js           # Render UI (charts, tablas, calendario, tooltips)
   └─ main.js         # Orquestación de eventos e inicialización

Cómo ejecutar

Local (sin instalar nada):

Descarga/Clona el repo.

Abre app/index.html en tu navegador.


Requerimientos

Funcionales:

-Cargar listas: cultivo, etapa, suelo, región y método.

-Calcular ETc y mostrar ET₀ / Kc / ETc.

-Recomendar litros ajustados por η y lluvia.

-Estimar costo en COP/m³.

-Gráficas de productividad y sensibilidad (agua → %).

-Calendario semanal de riego.

-Guardar y comparar escenarios.

-Exportar PNG/CSV e importar JSON.

-Página de Fuentes oficiales con tablas.

No funcionales:

-Usabilidad y responsive (Tailwind).

-Desempeño local fluido (objetivo: simulación <1 s en equipos modestos).

-Portabilidad: web estática (HTML+JS).

-Accesibilidad: contraste, navegación por teclado, aria-label en botones.

-Trazabilidad: historial + export/import; fuentes visibles.

-Accesibilidad y rendimiento

-Teclado: foco visible y navegación por Tab.

-Contraste: paleta verificada (WCAG AA).

-Etiquetas: title/aria-label en botones clave.

-Rendimiento: sin dependencias pesadas; cálculo en cliente; gráficos eficientes.

-Buenas prácticas: rutas relativas, carga diferida de scripts cuando aplica.





Fuentes oficiales (APA)

Inserta aquí tus enlaces definitivos (reemplaza si es necesario).

FAO. (1998). Crop evapotranspiration: Guidelines for computing crop water requirements (FAO Irrigation and Drainage Paper 56). Food and Agriculture Organization. https://www.fao.org/4/x0490e/x0490e00.htm

IDEAM. (2021). Estimación de la evapotranspiración de referencia (ET₀) en Colombia. Instituto de Hidrología, Meteorología y Estudios Ambientales. http://archivo.ideam.gov.co/
...

MADR & UPRA. (2020–2039). Plan Nacional de Riego y Drenaje. Ministerio de Agricultura y Desarrollo Rural; Unidad de Planificación Rural Agropecuaria. https://www.minagricultura.gov.co/
...

MinAmbiente. (2023). Informe al Congreso – Sector Ambiente 2022–2023. Ministerio de Ambiente y Desarrollo Sostenible. https://www.minambiente.gov.co/
...

DANE. (2014). Censo Nacional Agropecuario 2014. Departamento Administrativo Nacional de Estadística. https://www.dane.gov.co/
...

Nota: El simulador es educativo y no reemplaza recomendaciones técnicas in situ. Se recomienda validación con asistentes técnicos/UMATAs y datos IDEAM locales.

Licencia

Este proyecto se distribuye bajo Licencia MIT. Consulta el archivo LICENSE.

