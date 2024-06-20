import { PathStyleProps, IAnimation } from '@antv/g';

const DURATION = 5000;

/**
 * A function of linear mapping.
 * @param min
 * @param max
 * @param factor
 */
function lerp(min: number, max: number, factor: number) {
  return min + (max - min) * factor;
}

/**
 * Using Bessel curve to simulate sine wave.
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
 * Whose positions are a: (0, 0), b: (0.5, 0.5), c: (1, 1), d: (PI / 2, 1).
 *
 * @param x          x position of the left-most point (a).
 * @param stage      0-3, stating which part of the wave it is.
 * @param waveLength wave length of the sine wave.
 * @param amplitude  wave amplitude.
 * @return Sinusoidal segment curve.
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
 * Get wave path.
 * @param radius
 * @param waterLevel      water level
 * @param waveLength      wave length
 * @param phase
 * @param amplitude
 * @param cx              center x
 * @param cy              center y
 * @return path           path
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

  // Map phase to [-Math.PI * 2, 0].
  while (_phase < -Math.PI * 2) {
    _phase += Math.PI * 2;
  }
  while (_phase > 0) {
    _phase -= Math.PI * 2;
  }
  _phase = (_phase / Math.PI / 2) * waveLength;

  const left = cx - radius + _phase - radius * 2;
  /**
   * Top-left corner as start point.
   *
   * Draws this point.
   *  |
   * \|/
   *  ~~~~~~~~
   *  |      |
   *  +------+
   */
  path.push(['M', left, waterLevel]);

  /**
   * Top wave.
   *
   * ~~~~~~~~ <- Draws this sine wave.
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
   * Top-right corner.
   *
   *                       ~~~~~~~~
   * 3. Draws this line. -> |      | <- 1. Draws this line.
   *                       +------+
   *                          ^
   *                          |
   *                  2. Draws this line.
   */
  path.push(['L', waveRight + left, cy + radius]);
  path.push(['L', left, cy + radius]);
  path.push(['Z']);

  return path;
}

/**
 * Add wave.
 * @param x           center x
 * @param y           center y
 * @param level       wave level 0～1
 * @param waveCount   wave count
 * @param waveAttrs   style
 * @param group       g
 * @param minY        Minimum height
 * @param radius      radius
 * @param waveLength  wave length
 * @param animation  animation config
 * @param document
 */
export function addWave(
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
  // Box property Color width height.
  const { fill, fillOpacity, opacity } = waveAttrs;

  // Number of cyclic waveCount.
  for (let idx = 0; idx < waveCount; idx++) {
    const factor = waveCount <= 1 ? 1 : idx / (waveCount - 1);

    const path = getWaterWavePath(
      radius,
      minY + radius * level,
      waveLength,
      0,
      // Amplitude height.
      radius / 40,
      x,
      y,
    );

    // Create wave path.
    const wave = document.createElement('path', {
      style: {
        d: path,
        fill,
        opacity: lerp(0.2, 0.9, factor) * Number(opacity || fillOpacity),
      },
    });

    group.appendChild(wave);

    try {
      if (animation === false) return;

      const keyframes = [
        {
          transform: 'translate(0, 0)',
        },
        {
          transform: `translate(${waveLength * 2}, 0)`,
        },
      ];

      wave.animate(keyframes, {
        duration: lerp(0.5 * DURATION, DURATION, factor) * 2,
        iterations: Infinity,
      });
    } catch (e) {
      console.warn('off-screen group animate error!');
    }
  }
}
