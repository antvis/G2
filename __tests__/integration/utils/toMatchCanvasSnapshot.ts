import * as fs from 'fs';
import * as path from 'path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

export type ToMatchCanvasSnapshotOptions = {
  maxError?: number;
};

function writePNG(buffer: Buffer, path: string) {
  const png = PNG.sync.read(buffer);
  fs.writeFileSync(path, PNG.sync.write(png));
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
  buffer: Buffer,
  dir: string,
  name: string,
  options: ToMatchCanvasSnapshotOptions = {},
): Promise<{ message: () => string; pass: boolean }> {
  const { maxError = 0 } = options;
  const namePath = path.join(dir, name);
  const actualPath = path.join(dir, `${name}-actual.png`);
  const expectedPath = path.join(dir, `${name}.png`);
  const diffPath = path.join(dir, `${name}-diff.png`);

  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(expectedPath)) {
      if (process.env.CI === 'true') {
        throw new Error(`Please generate golden image for ${namePath}`);
      }
      console.warn(`! generate ${namePath}`);
      writePNG(buffer, expectedPath);
      return {
        message: () => `generate ${namePath}`,
        pass: true,
      };
    } else {
      writePNG(buffer, actualPath);
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
        message: () => `mismatch ${namePath} (error: ${error}) `,
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
