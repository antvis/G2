
module.exports = (chart, field) => {
  const colDefs = chart.get('colDefs');
  if (colDefs && colDefs[field]) {
    return colDefs[field];
  }
};
