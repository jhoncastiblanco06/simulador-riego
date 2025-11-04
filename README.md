# Simulador de Riego Eficiente – Colombia 🌱💧

Prototipo educativo (UNIMINUTO) para **optimizar la lámina de riego**, estimar costos y **reducir el impacto hídrico** en el sector rural colombiano.  
Basado en  **eficiencia del método de riego **.

**Demo:** https://github.com/jhoncastiblanco06/simulador-riego

**Video (YouTube):** https://www.youtube.com/watch?v=_N6mc1o2rEg

**Web (web):** https://simulador-riego.fjlgroup.site

---

## Descripción

El **Simulador de Riego Eficiente** permite a un **agricultor**:

1. **Configurar** el escenario (cultivo, etapa fenológica, suelo, región, clima, método, área y horario).  
2. **Calcular** la demanda hídrica y la **productividad** estimada.  
3. **Recomendar** litros de riego ajustando por **eficiencia del método** y **lluvia**.  
4. **Estimar** costos.  
5. **Visualizar** gráficas (productividad, sensibilidad) y un **calendario semanal** sugerido.  
6. **Guardar, comparar y exportar** escenarios (PNG/CSV) e **importar** históricos (JSON).  
7. Consultar **fuentes oficiales** integradas en una página de apoyo.

**Objetivo:** apoyar decisiones de riego **basadas en evidencia**, fomentando el **ahorro de agua** y la **reducción de costos**.

---

## Características

- 🔧 Configuración completa del escenario (cultivo/etapa/suelo/región/método/área/horario/lluvia/tarifa).  
- 🧮 Cálculo con visualización.  
- 🎯 Recomendación de litros ajustada por **η** (gravedad/aspersión/goteo) y **lluvia**.  
- 💸 Costo estimado en **COP**.  
- 📈 Gráficas de **productividad** y **análisis de sensibilidad** con exportación a **PNG**.  
- 📅 **Calendario semanal** de riego y exportación a **CSV**.  
- 🧰 **Historial** (guardar/cargar/limpiar), **comparación** de escenarios, exportar **CSV**, importar **JSON**.  
- 📚 **Fuentes oficiales** (tablas y bibliografía en APA) para transparencia.

---

## Stack técnico

- **Frontend:** HTML + **Tailwind CSS** (CDN) + **JavaScript** modular  
- **Gráficas:** Chart.js  
- **Iconos:** Feather Icons  
- **Datos locales:** LocalStorage / archivos CSV/JSON  
- **Infraestructura:** 100% **estático** (sirve en GitHub Pages / Netlify / Vercel / Nginx)

---

## Estructura del proyecto

<img width="594" height="454" alt="image" src="https://github.com/user-attachments/assets/625b1b95-0317-4e61-a634-d4f1883dab63" />


---

## Cómo ejecutar

**Local (sin instalar nada):**
1. Descarga/Clona el repo.  
2. Abre `app/index.html` en tu navegador.

---


---

## Casos de uso

<img width="1397" height="793" alt="image" src="https://github.com/user-attachments/assets/2262e4eb-3345-4d19-ac27-c263b61feb67" />


---

## Requerimientos

**Funcionales:**
- Cargar listas: cultivo, etapa, suelo, región y método.  
- Calcular **ETc** y mostrar **ET₀ / Kc / ETc**.  
- Recomendar **litros** ajustados por **η** y lluvia.  
- Estimar **costo** en **COP/m³**.  
- Gráficas de **productividad** y **sensibilidad** (agua → %).  
- **Calendario semanal** de riego.  
- **Guardar** y **comparar** escenarios.  
- **Exportar** PNG/CSV e **importar** JSON.  
- Página de **Fuentes oficiales** con tablas.

**No funcionales:**
- **Usabilidad y responsive** (Tailwind).  
- **Desempeño local** fluido (objetivo: simulación < 1 s en equipos modestos).  
- **Portabilidad:** web estática (HTML+JS).  
- **Accesibilidad:** contraste, navegación por teclado, `aria-label` en botones.  
- **Trazabilidad:** historial + export/import; fuentes visibles.

---

## Accesibilidad y rendimiento

- **Teclado:** foco visible y navegación por **Tab**.  
- **Contraste:** paleta verificada (WCAG AA).  
- **Etiquetas:** `title/aria-label` en botones clave.  
- **Rendimiento:** sin dependencias pesadas; cálculo en cliente; gráficos eficientes.  
- **Buenas prácticas:** rutas relativas, carga diferida de scripts cuando aplica.

---

## Fuentes oficiales (APA)

> Inserta aquí tus enlaces definitivos (reemplaza si es necesario).

- FAO. (1998). *Crop evapotranspiration: Guidelines for computing crop water requirements (FAO Irrigation and Drainage Paper 56).* Food and Agriculture Organization. https://www.fao.org/4/x0490e/x0490e00.htm  
- IDEAM. (2021). *Estimación de la evapotranspiración de referencia (ET₀) en Colombia.* Instituto de Hidrología, Meteorología y Estudios Ambientales. http://archivo.ideam.gov.co/  
- MADR & UPRA. (2020–2039). *Plan Nacional de Riego y Drenaje.* Ministerio de Agricultura y Desarrollo Rural; Unidad de Planificación Rural Agropecuaria. https://www.minagricultura.gov.co/  
- MinAmbiente. (2023). *Informe al Congreso – Sector Ambiente 2022–2023.* Ministerio de Ambiente y Desarrollo Sostenible. https://www.minambiente.gov.co/  
- DANE. (2014). *Censo Nacional Agropecuario 2014.* Departamento Administrativo Nacional de Estadística. https://www.dane.gov.co/

> **Nota:** El simulador es **educativo** y no reemplaza recomendaciones técnicas in situ. Se recomienda validación con asistentes técnicos/UMATAs y datos **IDEAM** locales.

---

## Licencia

Este proyecto se distribuye bajo **Licencia MIT**. Consulta el archivo `LICENSE`.




