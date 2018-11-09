module.exports = (scale, limitRange, type) => {
  if (!scale) return [ 0, 1 ];

  let minRatio = 0;
  let maxRatio = 0;
  if (type === 'linear') {
    const { min, max } = limitRange;
    const range = max - min;
    minRatio = (scale.min - min) / range;
    maxRatio = (scale.max - min) / range;
  } else {
    const originValues = limitRange;
    const values = scale.values;
    const firstIndex = originValues.indexOf(values[0]);
    const lastIndex = originValues.indexOf(values[values.length - 1]);
    minRatio = firstIndex / (originValues.length - 1);
    maxRatio = lastIndex / (originValues.length - 1);
  }
  return [ minRatio, maxRatio ];
};
