const getColDefs = require('./get-col-defs');

module.exports = (chart, field) => {
  const colDefs = getColDefs(chart);
  if (colDefs && colDefs[field]) {
    return colDefs[field];
  }
};
