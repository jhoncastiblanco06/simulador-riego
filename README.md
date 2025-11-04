Simulador de Riego Eficiente – Colombia 🌱💧

Prototipo educativo (UNIMINUTO) para optimizar la lámina de riego, estimar costos (COP) y reducir el impacto hídrico en el sector rural colombiano.
Basado en ET₀ (FAO Penman–Monteith), Kc (FAO-56) y eficiencia del método de riego (η).

Demo: https://TU-USUARIO.github.io/simulador-riego/

Video (YouTube): https://youtu.be/TU-ID-VIDEO

PDF de entrega: enlace-a-tu-PDF
Autor: Jhon Castiblanco Cárdenas · Systems Engineering – UNIMINUTO

Tabla de contenidos

Descripción

Características

Modelo y fórmulas

Stack técnico

Estructura del proyecto

Cómo ejecutar

Cómo desplegar (GitHub Pages / Netlify / Vercel)

Capturas

Requerimientos

Accesibilidad y rendimiento

Limitaciones y futuro

Fuentes oficiales (APA)

Licencia

Descripción

El Simulador de Riego Eficiente permite a un agricultor:

Configurar el escenario (cultivo, etapa fenológica, suelo, región/ET₀, clima, método, área y horario).

Calcular la demanda hídrica (ETc) y la productividad estimada.

Recomendar litros de riego ajustando por eficiencia del método (η) y lluvia.

Estimar costos en COP/m³.

Visualizar gráficas (productividad, sensibilidad) y un calendario semanal sugerido.

Guardar, comparar y exportar escenarios (PNG/CSV) e importar históricos (JSON).

Consultar fuentes oficiales (FAO/IDEAM/MADR/UPRA) integradas en una página de apoyo.

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

Modelo y fórmulas

ETc (demanda del cultivo)

ETc
=
ET₀
×
Kc
ETc=ET₀×Kc

Donde ET₀ es la evapotranspiración de referencia (FAO Penman–Monteith) y Kc el coeficiente de cultivo por etapa (FAO-56).

Eficiencia (η) del método de riego (valores típicos de referencia):

Gravedad (surcos): ~0.60

Aspersión: ~0.75

Goteo (microirrigación): ~0.90

Conversión de unidades

1
 
mm
≡
1
 
L/m²
1 mm≡1 L/m²

Costo (COP)

COP
=
(
Litros
1000
)
×
Tarifa (COP/m³)
COP=(
1000
Litros
	​

)×Tarifa (COP/m³)

Presets de ET₀ regional (Altiplano, Valles/Llanos, Trópico) y Kc por cultivo/etapa están integrados como referencia educativa. Recomendado contrastar con series IDEAM locales y ajustar a campo.

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

¡Listo!

Si tu navegador bloquea archivos locales, levanta un servidor estático (opcional):
VS Code Live Server o python -m http.server 8080 (y abre http://localhost:8080/app/).

Cómo desplegar (GitHub Pages / Netlify / Vercel)
GitHub Pages

Repo → Settings → Pages.

Source: Deploy from a branch, main y /root.

Guarda y espera 1–2 min.

Tu demo quedará en: https://TU-USUARIO.github.io/simulador-riego/.

Netlify (drag & drop)

En Netlify → Add new site → Deploy manually.

Arrastra la carpeta app/.

Obtendrás una URL https://tu-sitio.netlify.app.

Vercel (desde GitHub)

En Vercel → New Project → Importa este repo.

Framework: Other (estático).

Deploy y listo: https://simulador-riego.vercel.app.

Capturas

Reemplaza por tus imágenes reales.

Inicio	Resultados	Sensibilidad

	
	
Calendario	Comparador	Fuentes oficiales

	
	
Requerimientos

Funcionales

Cargar listas: cultivo, etapa, suelo, región y método.

Calcular ETc y mostrar ET₀ / Kc / ETc.

Recomendar litros ajustados por η y lluvia.

Estimar costo en COP/m³.

Gráficas de productividad y sensibilidad (agua → %).

Calendario semanal de riego.

Guardar y comparar escenarios.

Exportar PNG/CSV e importar JSON.

Página de Fuentes oficiales con tablas.

No funcionales

Usabilidad y responsive (Tailwind).

Desempeño local fluido (objetivo: simulación <1 s en equipos modestos).

Portabilidad: web estática (HTML+JS).

Accesibilidad: contraste, navegación por teclado, aria-label en botones.

Trazabilidad: historial + export/import; fuentes visibles.

Accesibilidad y rendimiento

Teclado: foco visible y navegación por Tab.

Contraste: paleta verificada (WCAG AA).

Etiquetas: title/aria-label en botones clave.

Rendimiento: sin dependencias pesadas; cálculo en cliente; gráficos eficientes.

Buenas prácticas: rutas relativas, carga diferida de scripts cuando aplica.

Limitaciones y futuro

ET₀ regional son presets educativos; para uso operativo se sugiere consumir series locales IDEAM.

Kc por cultivo/etapa son valores guía; ajustar a manejo local.

No hay integración con costos energéticos (kWh/m³) ni con sensores.

Roadmap

 Integrar consulta de clima (IDEAM/API).

 Módulo de energía (bombeo) y costo total (COP + kWh).

 Casos de ejemplo precargados por región/cultivo.

 Exportación a PDF (reporte).

 Internacionalización (ES/EN).

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

Contacto

Autor: Jhon Castiblanco Cárdenas
Email: tu-correo@ejemplo.com

LinkedIn/GitHub: https://github.com/TU-USUARIO
