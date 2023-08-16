import { G2Spec } from '../../../src';

export function bodyPointScatterPlot3D(): G2Spec {
  return {
    type: 'point3D',
    padding: 'auto',
    data: {
      type: 'fetch',
      value: 'data/cars2.csv',
    },
    encode: {
      x: 'Horsepower',
      y: 'Miles_per_Gallon',
      z: 'Weight_in_lbs',
      size: 'Origin',
      color: 'Cylinders',
      shape: 'cube',
    },
    scale: {
      x: { nice: true },
      y: { nice: true },
      z: { nice: true },
    },
    coordinate: { type: 'cartesian3D', depth: 300 },
    axis: {
      x: { gridLineWidth: 3 },
      y: { gridLineWidth: 3, titleBillboardRotation: -Math.PI / 2 },
      z: { gridLineWidth: 3 },
    },
    legend: false,
  };
}

bodyPointScatterPlot3D.skip = true;
