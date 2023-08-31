import { PathStyleProps, IAnimation } from '@antv/g';

const DURATION = 5000;

/**
 * 一个线性映射的函数
 * @param min
 * @param max
 * @param factor
 */
function lerp(min: number, max: number, factor: number) {
  return min + (max - min) * factor;
}

/**
 * 用贝塞尔曲线模拟正弦波
 * Using Bezier curves to fit sine wave.
 * There is 4 control points for each curve of wave,
 * which is at 1/4 wave length of the sine wave.
 *
 * The control points for a wave from (a) to (d) are a-b-c-d:
 *          c *----* d
 *     b *
 *       |
 * ... a * ..................
 *
 * whose positions are a: (0, 0), b: (0.5, 0.5), c: (1, 1), d: (PI / 2, 1)
 *
 * @param x          x position of the left-most point (a)
 * @param stage      0-3, stating which part of the wave it is
 * @param waveLength wave length of the sine wave
 * @param amplitude  wave amplitude
 * @return 正弦片段曲线
 */
function getWaterWavePositions(
  x: number,
  stage: number,
  waveLength: number,
  amplitude: number,
) {
  if (stage === 0) {
    return [
      [x + ((1 / 2) * waveLength) / Math.PI / 2, amplitude / 2],
      [x + ((1 / 2) * waveLength) / Math.PI, amplitude],
      [x + waveLength / 4, amplitude],
    ];
  }
  if (stage === 1) {
    return [
      [x + (((1 / 2) * waveLength) / Math.PI / 2) * (Math.PI - 2), amplitude],
      [
        x + (((1 / 2) * waveLength) / Math.PI / 2) * (Math.PI - 1),
        amplitude / 2,
      ],
      [x + waveLength / 4, 0],
    ];
  }
  if (stage === 2) {
    return [
      [x + ((1 / 2) * waveLength) / Math.PI / 2, -amplitude / 2],
      [x + ((1 / 2) * waveLength) / Math.PI, -amplitude],
      [x + waveLength / 4, -amplitude],
    ];
  }
  return [
    [x + (((1 / 2) * waveLength) / Math.PI / 2) * (Math.PI - 2), -amplitude],
    [
      x + (((1 / 2) * waveLength) / Math.PI / 2) * (Math.PI - 1),
      -amplitude / 2,
    ],
    [x + waveLength / 4, 0],
  ];
}

/**
 * 获取水波路径
 * @param radius          半径
 * @param waterLevel      水位
 * @param waveLength      波长
 * @param phase           相位
 * @param amplitude       震幅
 * @param cx              圆心x
 * @param cy              圆心y
 * @return path            路径
 * @reference http://gitlab.alipay-inc.com/datavis/g6/blob/1.2.0/src/graph/utils/path.js#L135
 */
function getWaterWavePath(
  radius: number,
  waterLevel: number,
  waveLength: number,
  phase: number,
  amplitude: number,
  cx: number,
  cy: number,
) {
  const curves = Math.ceil(((2 * radius) / waveLength) * 4) * 4;
  const path = [];
  let _phase = phase;

  // map phase to [-Math.PI * 2, 0]
  while (_phase < -Math.PI * 2) {
    _phase += Math.PI * 2;
  }
  while (_phase > 0) {
    _phase -= Math.PI * 2;
  }
  _phase = (_phase / Math.PI / 2) * waveLength;

  const left = cx - radius + _phase - radius * 2;
  /**
   * top-left corner as start point
   *
   * draws this point
   *  |
   * \|/
   *  ~~~~~~~~
   *  |      |
   *  +------+
   */
  path.push(['M', left, waterLevel]);

  /**
   * top wave
   *
   * ~~~~~~~~ <- draws this sine wave
   * |      |
   * +------+
   */
  let waveRight = 0;
  for (let c = 0; c < curves; ++c) {
    const stage = c % 4;
    const pos = getWaterWavePositions(
      (c * waveLength) / 4,
      stage,
      waveLength,
      amplitude,
    );
    path.push([
      'C',
      pos[0][0] + left,
      -pos[0][1] + waterLevel,
      pos[1][0] + left,
      -pos[1][1] + waterLevel,
      pos[2][0] + left,
      -pos[2][1] + waterLevel,
    ]);

    if (c === curves - 1) {
      waveRight = pos[2][0];
    }
  }

  /**
   * top-right corner
   *
   *                       ~~~~~~~~
   * 3. draws this line -> |      | <- 1. draws this line
   *                       +------+
   *                          ^
   *                          |
   *                  2. draws this line
   */
  path.push(['L', waveRight + left, cy + radius]);
  path.push(['L', left, cy + radius]);
  path.push(['Z']);

  return path;
}

/**
 * 添加水波
 * @param x           中心x
 * @param y           中心y
 * @param level       水位等级 0～1
 * @param waveCount   水波数
 * @param waveAttrs      色值
 * @param group       图组
 * @param clip        用于剪切的图形
 * @param radius      绘制图形的高度
 * @param waveLength  波的长度
 */
export function addWaterWave(
  x: number,
  y: number,
  level: number,
  waveCount: number,
  waveAttrs: PathStyleProps,
  group: any,
  minY: number,
  radius: number,
  waveLength: number,
  animation: IAnimation | boolean,
  document: any,
) {
  // 盒子属性 颜色 宽高
  const { fill, fillOpacity, opacity } = waveAttrs;

  // 循环 waveCount 个数
  for (let idx = 0; idx < waveCount; idx++) {
    const factor = waveCount <= 1 ? 1 : idx / (waveCount - 1);

    const path = getWaterWavePath(
      radius,
      minY + radius * level,
      waveLength,
      0,
      radius / 40, // 波幅高度
      x,
      y,
    );

    // 画波
    const wave = document.createElement('path', {
      style: {
        path,
        fill,
        opacity: lerp(0.2, 0.9, factor) * Number(opacity || fillOpacity),
      },
    });

    group.appendChild(wave);

    try {
      // 默认 underfind 开启动画
      if (animation === false) return;

      const keyframes = [
        {
          transform: 'translate(0, 0)',
        },
        {
          transform: `translate(${waveLength * 2}px, 0)`,
        },
      ];

      wave.animate(keyframes, {
        duration: lerp(0.5 * DURATION, DURATION, factor) * 2,
        iterations: Infinity,
      });
    } catch (e) {
      // TODO off-screen canvas 中动画会找不到 canvas
      console.warn('off-screen group animate error!');
    }
  }
}
