module.exports = chart => {
  const scaleController = chart.get('scaleController') || {};
  return scaleController.defs;
};
