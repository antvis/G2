/**
 * Sample data with lttb(Largest-Triangle-Three-Buckets) algo (https://github.com/pingec/downsample-lttb).
 * Return the sampled index array.
 */
export function lttb(
  I: number[],
  X: number[],
  Y: number[],
  thresholds: number,
): number[] {
  const length = I.length;
  if (thresholds >= length || thresholds === 0) {
    return I;
  }

  const x = (i: number) => X[I[i]] * 1;
  const y = (i: number) => Y[I[i]] * 1;
  const sampled = [];

  // Bucket size. Leave room for start and end data points.
  const every = (length - 2) / (thresholds - 2);

  let a = 0; // Initially a is the first point in the triangle.
  let maxArea;
  let area;
  let nextA;

  sampled.push(a); // Always add the first point.

  for (let i = 0; i < thresholds - 2; i++) {
    // Calculate point average for next bucket (containing c).
    let avgX = 0;
    let avgY = 0;
    let start = Math.floor((i + 1) * every) + 1;
    let end = Math.floor((i + 2) * every) + 1;
    end = Math.min(end, length);
    const size = end - start;

    for (; start < end; start++) {
      avgX += x(start);
      avgY += y(start);
    }
    avgX /= size;
    avgY /= size;

    // Get the range for this bucket.
    let frameStart = Math.floor((i + 0) * every) + 1;
    const frameEnd = Math.floor((i + 1) * every) + 1;

    // Point a.
    const pointA = [x(a), y(a)];
    maxArea = area = -1;
    for (; frameStart < frameEnd; frameStart++) {
      // Calculate triangle area over three buckets.
      area =
        Math.abs(
          (pointA[0] - avgX) * (x(frameStart) - pointA[1]) -
            (pointA[0] - y(frameStart)) * (avgY - pointA[0]),
        ) * 0.5;
      if (area > maxArea) {
        maxArea = area;
        nextA = frameStart; // Next a is this b.
      }
    }

    sampled.push(nextA); // Pick this point from the bucket.
    a = nextA; // This a is the next a (chosen b).
  }

  sampled.push(length - 1); // Always add last.

  return sampled.map((a) => I[a]);
}
