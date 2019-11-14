fetch('../data/kagi.json')
  .then(res => res.json())
  .then(data => {
    // 获取卡吉图数据点
    const kagiData = getKagiData(data, 'date', 'value');
    const chart = new G2.Chart({
      container: 'container',
      forceFit: true,
      height: 500
    });
    chart.source(kagiData, {
      date: {
        type: 'cat',
        tickCount: 10,
        range: [ 0, 1 ]
      }
    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.path({
      generatePoints: true
    })
      .position('date*value')
      .color('type', val => {
        if (val === 'pos') {
          return '#f04864';
        }
        return '#2fc25b';
      })
      .size('type', val => {
        if (val === 'pos') {
          return 2;
        }
        return 1;
      });
    chart.render();
  });
/**
 * 获取卡吉图数据点
 * @param  {Array} points 原始数据点
 * @param  {String} x x维度字段名
 * @param  {String} y y维度字段名
 * @return {Array} data 卡吉图数据点
 **/
function getKagiData(points, x, y) {
  // 初始最小值
  let min = points[0][y];
  // 初始最大值
  let max = points[0][y];
  // 初始绘制起点
  let start = points[0];
  // 阳线和阴线判断标志
  let isPos = points[1][y] >= points[0][y];
  // 初始绘制方向，1为向上，－1为向下
  let direction = isPos ? 1 : -1;
  // 阈值，默认为最大值的4%
  const maxValue = getMax(points, y);
  const threshold = maxValue * 0.04;
  // 阴线数组
  const negPath = [];
  // 阳线数组
  const posPath = [];
  const tmp1 = {};
  tmp1[x] = start[x];
  tmp1[y] = start[y];
  pushPoint(tmp1, isPos, posPath, negPath, x, y);
  if (points.length > 1) {
    for (let i = 0; i <= points.length - 1; i++) {
      // 浮动超过阈值时执行算法
      if (Math.abs(start[y] - points[i][y]) > threshold) {
        if (direction > 0) {
          if (points[i][y] >= start[y]) {
            isPos = getVerticalPoints(start, points[i], max, direction, negPath, posPath, isPos, x, y);
            start[y] = points[i][y];
          } else {
            const tmp2 = {};
            tmp2[x] = points[i][x];
            tmp2[y] = start[y];
            pushPoint(tmp2, isPos, posPath, negPath, x, y);
            start[x] = points[i][x];
            direction = -1; // 转向
            isPos = getVerticalPoints(start, points[i], min, direction, negPath, posPath, isPos, x, y);
            max = start[y]; // 更新当前最高点
            start = points[i]; // 更新当前绘制起点
          }
        } else {
          if (points[i][y] < start[y]) {
            isPos = getVerticalPoints(start, points[i], min, direction, negPath, posPath, isPos, x, y);
            start[y] = points[i][y];
          } else {
            const tmp3 = {};
            tmp3[x] = points[i][x];
            tmp3[y] = start[y];
            pushPoint(tmp3, isPos, posPath, negPath, x, y);
            start[x] = points[i][x];
            direction = 1;
            isPos = getVerticalPoints(start, points[i], max, direction, negPath, posPath, isPos, x, y);
            min = start[y]; // 更新当前最低点
            start = points[i];
          }
        }
      }
    }
  }
  return posPath.concat(negPath);
}
/**
 * 获取卡吉图垂直线数据点
 * @param  {Array} start 起点坐标
 * @param  {Array} end 终点坐标
 * @param  {Number} changePoint 转折点y坐标
 * @param  {Number} direction 绘制方向
 * @param  {Array} negPath 阴线数组
 * @param  {Array} posPath 阳线数组
 * @param  {Boolean} isPos 是否阳线标志位
 * @param  {String} x x维度字段名
 * @param  {String} y y维度字段名
 * @return  {Boolean} isPos 是否阳线标志位
 **/
function getVerticalPoints(start, end, changePoint, direction, negPath, posPath, isPos, x, y) {
  // 阳线和阴线相互转换的判断条件
  const condition = direction > 0 ? (end[y] > changePoint) && (start[y] < changePoint) && !isPos : (end[y] < changePoint) && (start[y] > changePoint) && isPos;
  const tmp1 = {};
  tmp1[x] = start[x];
  tmp1[y] = changePoint;
  const tmp2 = {};
  tmp2[x] = start[x];
  tmp2[y] = end[y];
  if (condition) {
    pushPoint(tmp1, isPos, posPath, negPath, x, y, true);
    isPos = !isPos;
    pushPoint(tmp2, isPos, posPath, negPath, x, y);
  } else {
    pushPoint(tmp2, isPos, posPath, negPath, x, y);
  }
  return isPos;
}

function pushPoint(point, isPos, posPath, negPath, x, y, isChangePoint = false) {
  const tmpPoint = {};
  tmpPoint[x] = point[x];
  tmpPoint[y] = isChangePoint ? point[y] : null; // 转折点阳线和阴线都有数据，非转折点阳线或阴线的数据点为空
  if (isPos) {
    point.type = 'pos';
    posPath.push(point);
    tmpPoint.type = 'neg';
    negPath.push(tmpPoint);
  } else {
    point.type = 'neg';
    negPath.push(point);
    tmpPoint.type = 'pos';
    posPath.push(tmpPoint);
  }
}

function getMax(points, y) {
  let max = points[points.length - 1][y];
  if (points.length > 0) {
    for (let i = points.length - 1; i >= 0; i--) {
      max = points[i][y] > max ? points[i][y] : max;
    }
  }
  return max;
}

