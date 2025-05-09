let dataset = [];

async function loadData() {
  const res = await fetch('data.json');
  dataset = await res.json();

  const biomassSet = new Set();
  const analyteSet = new Set();

  dataset.forEach(row => {
    biomassSet.add(row["Biomass Source"]);
    row["Analyte Detected"].split(",").forEach(a => analyteSet.add(a.trim()));
  });

  for (let value of biomassSet) {
    document.getElementById("biomassFilter").innerHTML += `<option value="${value}">${value}</option>`;
  }
  for (let value of analyteSet) {
    document.getElementById("analyteFilter").innerHTML += `<option value="${value}">${value}</option>`;
  }

  filterData(); // initial render
}

function filterData() {
  const biomass = document.getElementById("biomassFilter").value;
  const analyte = document.getElementById("analyteFilter").value;

  const filtered = dataset.filter(row => {
    return (!biomass || row["Biomass Source"] === biomass) &&
           (!analyte || row["Analyte Detected"].includes(analyte));
  });

  const table = document.getElementById("resultsTable");
  table.innerHTML = "";

  filtered.forEach(row => {
    table.innerHTML += `
      <tr class="border-b">
        <td class="px-2 py-1 border">${row["Biomass Source"]}</td>
        <td class="px-2 py-1 border">${row["Analyte Detected"]}</td>
        <td class="px-2 py-1 border">${row["Synthesis Method"]}</td>
        <td class="px-2 py-1 border">${row["LOD (µM or nM)"]}</td>
        <td class="px-2 py-1 border">${row["Reference"]}</td>
      </tr>`;
  });
}

function resetFilters() {
    document.getElementById("biomassFilter").value = "";
    document.getElementById("analyteFilter").value = "";
    filterData();
  }
  
loadData();
