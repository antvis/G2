import getColDefs from './get-col-defs';

export default (chart, field) => {
  const colDefs = getColDefs(chart);
  if (colDefs && colDefs[field]) {
    return colDefs[field];
  }
};
