// const { flatEN, flatTH } = require("./webLabelConverter");

// Accepts thLabels and enLabels as arrays of { key, value, local }
function SQLmaker(thLabels, enLabels) {
  // Create maps for quick lookup
  const thMap = new Map(thLabels.map((l) => [l.key, l]));
  const enMap = new Map(enLabels.map((l) => [l.key, l]));
  const allKeys = Array.from(new Set([...thMap.keys(), ...enMap.keys()]));

  // Arrange side-by-side: th first, then en for each key if exists
  const valueClauses = [];
  for (const key of allKeys) {
    if (thMap.has(key)) {
      const { key: k, value, local } = thMap.get(key);
      const escapedKey = k.replace(/'/g, "''");
      const escapedValue = value.replace(/'/g, "''");
      valueClauses.push(`('${escapedKey}', '${escapedValue}', '', '${local}')`);
    }
    if (enMap.has(key)) {
      const { key: k, value, local } = enMap.get(key);
      const escapedKey = k.replace(/'/g, "''");
      const escapedValue = value.replace(/'/g, "''");
      valueClauses.push(`('${escapedKey}', '${escapedValue}', '', '${local}')`);
    }
  }

  if (valueClauses.length === 0) {
    return "-- No labels to insert";
  }
  return `INSERT INTO web_labels (key, value, description, locale) VALUES\n${valueClauses.join(
    ",\n"
  )};`;
}

// function makeSingleSqlValueClause(key, value, locale) {
//   // Escape single quotes for SQL safety
//   const escapedKey = key.replace(/'/g, "''");
//   const escapedValue = value.replace(/'/g, "''");
//   return `('${escapedKey}', '${escapedValue}', '', '${locale}')`;
// }

// Example input arrays (replace with your real data)
const combinedResult = SQLmaker(flatTH, flatEN);
console.log("SCRIPT");
console.log(combinedResult);

// Example Usage:
/*
const myLabels = [
  { key: 'app.button.submit', value: 'ส่ง', local: 'th' },
  { key: 'app.page.title', value: 'หัวข้อเพจ', local: 'th' },
  { key: 'app.alert.error', value: "เกิดข้อผิดพลาด O'Neil!", local: 'th' }
];
const sqlScript = SQLmaker(myLabels, []);
console.log(sqlScript);
*/
