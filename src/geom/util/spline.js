const MatrixUtil = require('@antv/g').MatrixUtil;
const Vector2 = MatrixUtil.vec2;

function smoothBezier(points, smooth, isLoop, constraint) {
  const cps = [];

  let prevPoint;
  let nextPoint;
  const hasConstraint = !!constraint;
  let min,
    max;
  if (hasConstraint) {
    min = [ Infinity, Infinity ];
    max = [ -Infinity, -Infinity ];

    for (let i = 0, l = points.length; i < l; i++) {
      const point = points[i];
      min = Vector2.min([], min, point);
      max = Vector2.max([], max, point);
    }
    min = Vector2.min([], min, constraint[0]);
    max = Vector2.max([], max, constraint[1]);
  }

  for (let i = 0, len = points.length; i < len; i++) {
    const point = points[i];
    if (isLoop) {
      prevPoint = points[i ? i - 1 : len - 1];
      nextPoint = points[(i + 1) % len];
    } else {
      if (i === 0 || i === len - 1) {
        cps.push(point);
        continue;
      } else {
        prevPoint = points[i - 1];
        nextPoint = points[i + 1];
      }
    }
    let v = [];
    v = Vector2.sub(v, nextPoint, prevPoint);
    v = Vector2.scale(v, v, smooth);

    let d0 = Vector2.distance(point, prevPoint);
    let d1 = Vector2.distance(point, nextPoint);

    const sum = d0 + d1;
    if (sum !== 0) {
      d0 /= sum;
      d1 /= sum;
    }

    const v1 = Vector2.scale([], v, -d0);
    const v2 = Vector2.scale([], v, d1);

    let cp0 = Vector2.add([], point, v1);
    let cp1 = Vector2.add([], point, v2);

    if (hasConstraint) {
      cp0 = Vector2.max([], cp0, min);
      cp0 = Vector2.min([], cp0, max);
      cp1 = Vector2.max([], cp1, min);
      cp1 = Vector2.min([], cp1, max);
    }

    cps.push(cp0);
    cps.push(cp1);
  }

  if (isLoop) {
    cps.push(cps.shift());
  }
  return cps;

}

function catmullRom2bezier(crp, z, constraint) {
  const isLoop = !!z;

  const pointList = [];

  for (let i = 0, l = crp.length; i < l; i += 2) {
    pointList.push([ crp[i], crp[i + 1] ]);
  }

  const controlPointList = smoothBezier(pointList, 0.4, isLoop, constraint);
  const len = pointList.length;
  const d1 = [];

  let cp1;
  let cp2;
  let p;

  for (let i = 0; i < len - 1; i++) {
    cp1 = controlPointList[i * 2];
    cp2 = controlPointList[i * 2 + 1];
    p = pointList[i + 1];

    d1.push([ 'C',
      cp1[0],
      cp1[1],
      cp2[0],
      cp2[1],
      p[0],
      p[1]
    ]);
  }

  if (isLoop) {
    cp1 = controlPointList[len];
    cp2 = controlPointList[len + 1];
    p = pointList[0];

    d1.push([ 'C',
      cp1[0],
      cp1[1],
      cp2[0],
      cp2[1],
      p[0],
      p[1]
    ]);
  }
  return d1;
}

module.exports = {
  catmullRom2bezier
};
