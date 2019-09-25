const Util = require('../../util');
const TimeUtil = require('@antv/scale/lib/time-util');
const getColDefs = require('./get-col-defs');

module.exports = chart => {
  chart.on('beforeinitgeoms', () => {
    chart.set('limitInPlot', true);
    const data = chart.get('data');
    const colDefs = getColDefs(chart);
    if (!colDefs) return data;

    const geoms = chart.get('geoms');
    let isSpecialGeom = false;
    Util.each(geoms, geom => {
      if ([ 'area', 'line', 'path' ].includes(geom.get('type'))) {
        isSpecialGeom = true;
        return false;
      }
    });

    const fields = [];
    Util.each(colDefs, (def, key) => {
      if (!isSpecialGeom && def && (def.values || def.min || def.max)) {
        fields.push(key);
      }
    });

    if (fields.length === 0) {
      return data;
    }

    const geomData = [];
    Util.each(data, obj => {
      let flag = true;
      Util.each(fields, field => {
        let value = obj[field];
        if (value) {
          const colDef = colDefs[field];
          if (colDef.type === 'timeCat') {
            const values = colDef.values;
            if (Util.isNumber(values[0])) {
              value = TimeUtil.toTimeStamp(value);
            }
          }

          if ((colDef.values && !colDef.values.includes(value))
            || (colDef.min && (value < colDef.min))
            || (colDef.max && (value > colDef.max))) {
            flag = false;
          }
        }
      });
      if (flag) {
        geomData.push(obj);
      }
    });

    chart.set('filteredData', geomData);
  });
};
