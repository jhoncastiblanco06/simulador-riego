window.Exporter = (() => {
  function download(filename, blob) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  function exportCSV() {
    const csv = Store.toCSV();
    download(
      `historial_riego_${Date.now()}.csv`,
      new Blob([csv], { type: "text/csv;charset=utf-8" })
    );
  }

  function exportChartPNG(canvasEl) {
    const url = canvasEl.toDataURL("image/png");
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => download(`grafica_riego_${Date.now()}.png`, blob));
  }

  function importJSONFromFile(file) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => {
        try {
          Store.importJSON(fr.result);
          resolve();
        } catch (e) {
          reject(e);
        }
      };
      fr.onerror = () => reject(fr.error);
      fr.readAsText(file, "utf-8");
    });
  }

  function exportWeekCSV(week) {
    const rows = [["dia", "litros"]];
    week.forEach((v, i) => rows.push([`D${i + 1}`, v]));
    const csv = rows.map((r) => r.join(",")).join("\n");
    download(
      `calendario_riego_${Date.now()}.csv`,
      new Blob([csv], { type: "text/csv;charset=utf-8" })
    );
  }

  return { exportCSV, exportChartPNG, importJSONFromFile, exportWeekCSV };
})();
