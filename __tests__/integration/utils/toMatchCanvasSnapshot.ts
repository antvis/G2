import * as fs from 'fs';
import * as path from 'path';
import { Canvas } from '@antv/g';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

export type ToMatchCanvasSnapshotOptions = {
  maxError?: number;
};

function writePNG(nodeCanvas, path) {
  return new Promise<void>((resolve, reject) => {
    const out = fs.createWriteStream(path);
    const stream = nodeCanvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', resolve).on('error', reject);
  });
}

/**
 * diff between PNGs
 */
function diff(
  src: string,
  target: string,
  diff: string,
  maxError = 0,
  showMismatchedPixels = true,
) {
  const img1 = PNG.sync.read(fs.readFileSync(src));
  const img2 = PNG.sync.read(fs.readFileSync(target));
  const { width, height } = img1;

  let diffPNG: PNG | null = null;
  let output: Buffer | null = null;
  if (showMismatchedPixels) {
    diffPNG = new PNG({ width, height });
    output = diffPNG.data;
  }

  // @see https://github.com/mapbox/pixelmatch#pixelmatchimg1-img2-output-width-height-options
  const mismatch = pixelmatch(img1.data, img2.data, output, width, height, {
    threshold: 0.1,
  });

  if (showMismatchedPixels && mismatch > maxError && diffPNG) {
    fs.writeFileSync(diff, PNG.sync.write(diffPNG));
  }

  return mismatch;
}

// @see https://jestjs.io/docs/26.x/expect#expectextendmatchers
export async function toMatchCanvasSnapshot(
  gCanvas: Canvas,
  dir: string,
  name: string,
  options: ToMatchCanvasSnapshotOptions = {},
): Promise<{ message: () => string; pass: boolean }> {
  const { maxError = 0 } = options;
  const namePath = path.join(dir, name);
  const actualPath = path.join(dir, `${name}-actual.png`);
  const expectedPath = path.join(dir, `${name}.png`);
  const diffPath = path.join(dir, `${name}-diff.png`);
  const canvas = gCanvas.getConfig().canvas;
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(expectedPath)) {
      console.warn(`! generate ${namePath}`);
      await writePNG(canvas, expectedPath);
      return {
        message: () => `generate ${namePath}`,
        pass: true,
      };
    } else {
      await writePNG(canvas, actualPath);
      const error = diff(actualPath, expectedPath, diffPath, maxError);
      if (error <= maxError) {
        if (fs.existsSync(diffPath)) fs.unlinkSync(diffPath);
        fs.unlinkSync(actualPath);
        return {
          message: () => `match ${namePath}`,
          pass: true,
        };
      }
      return {
        message: () => `mismatch ${namePath}`,
        pass: false,
      };
    }
  } catch (e) {
    return {
      message: () => `${e}`,
      pass: false,
    };
  }
}
