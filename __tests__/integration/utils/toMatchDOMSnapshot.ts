import * as path from 'path';
import * as fs from 'fs';
import { Canvas } from '@antv/g';
import { serializeToString } from 'xmlserializer';
import { optimize } from 'svgo';

const MAX_DIFFERENCES_TO_SHOW = 3;

export type ToMatchDOMSnapshotOptions = {
  selector?: string;
  fileFormat?: string;
  keepSVGElementId?: boolean;
};

const formatSVG = (svg: SVGElement): string => {
  if (!svg) return 'null';
  return optimize(serializeToString(svg as any), {
    js2svg: {
      pretty: true,
      indent: 2,
    },
    plugins: [
      'cleanupIds',
      'cleanupAttrs',
      'sortAttrs',
      'sortDefsChildren',
      'removeUselessDefs',
      {
        name: 'convertPathData',
        params: {
          floatPrecision: 4,
          forceAbsolutePath: true,

          applyTransforms: false,
          applyTransformsStroked: false,
          straightCurves: false,
          convertToQ: false,
          lineShorthands: false,
          convertToZ: false,
          curveSmoothShorthands: false,
          smartArcRounding: false,
          removeUseless: false,
          collapseRepeated: false,
          utilizeAbsolute: false,
          negativeExtraSpace: false,
        },
      },
      {
        name: 'convertTransform',
        params: {
          floatPrecision: 4,

          convertToShorts: false,
          matrixToTransform: false,
          shortTranslate: false,
          shortScale: false,
          shortRotate: false,
          removeUseless: false,
          collapseIntoOne: false,
        },
      },
      {
        name: 'cleanupNumericValues',
        params: {
          floatPrecision: 4,
        },
      },
    ],
  }).data;
};

/**
 * Compare two SVG strings and find differences.
 */
interface SVGDifference {
  line: number;
  actual: string;
  expected: string;
}

interface SVGDifferenceResult {
  equal: boolean;
  differences: SVGDifference[];
}

function findSVGDifferences(
  actual: string,
  expected: string,
): SVGDifferenceResult {
  if (actual === expected) {
    return { equal: true, differences: [] };
  }

  // Line-by-line comparison to find differences.
  const actualLines = actual.split('\n');
  const expectedLines = expected.split('\n');
  const differences: SVGDifference[] = [];

  const maxLines = Math.max(actualLines.length, expectedLines.length);
  for (let i = 0; i < maxLines; i++) {
    if (actualLines[i] !== expectedLines[i]) {
      differences.push({
        line: i + 1,
        actual: actualLines[i] || '(missing)',
        expected: expectedLines[i] || '(missing)',
      });
    }

    // Limit to MAX_DIFFERENCES_TO_SHOW differences.
    if (differences.length >= MAX_DIFFERENCES_TO_SHOW) {
      break;
    }
  }

  return { equal: false, differences };
}

// @see https://jestjs.io/docs/26.x/expect#expectextendmatchers
export async function toMatchDOMSnapshot(
  gCanvas: Canvas,
  dir: string,
  name: string,
  options: ToMatchDOMSnapshotOptions = {},
): Promise<{ message: () => string; pass: boolean }> {
  const { selector, fileFormat = 'svg', keepSVGElementId = false } = options;
  const namePath = path.join(dir, name);
  const actualPath = path.join(dir, `${name}-actual.${fileFormat}`);
  const expectedPath = path.join(dir, `${name}.${fileFormat}`);
  const container = gCanvas.getConfig().container as HTMLElement;
  const dom = container.querySelector(selector || 'svg');

  let actual;
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    actual = formatSVG(dom as SVGElement);

    if (!fs.existsSync(expectedPath)) {
      if (process.env.CI === 'true') {
        throw new Error(`Please generate golden image for ${namePath}`);
      }
      console.warn(`! generate ${namePath}`);
      await fs.writeFileSync(expectedPath, actual);
      return {
        message: () => `generate ${namePath}`,
        pass: true,
      };
    } else {
      const expected = fs.readFileSync(expectedPath, {
        encoding: 'utf8',
        flag: 'r',
      });

      if (actual === expected) {
        if (fs.existsSync(actualPath)) fs.unlinkSync(actualPath);
        return {
          message: () => `match ${namePath}`,
          pass: true,
        };
      }

      // Find differences for detailed message.
      const result = findSVGDifferences(actual, expected);
      const totalDifferences = result.differences.length;
      let diffMessage = `mismatch ${namePath}`;

      if (totalDifferences > 0) {
        if (totalDifferences >= MAX_DIFFERENCES_TO_SHOW) {
          diffMessage += `\nThere are too many differencies, only show ${MAX_DIFFERENCES_TO_SHOW} of them.`;
        }

        // Add difference details to message.
        result.differences.forEach((diff, index) => {
          diffMessage += `\nDifference ${index + 1} at line ${diff.line}:\n`;
          diffMessage += ` Expected✅: ${diff.expected}\n`;
          diffMessage += `   Actual❌: ${diff.actual}`;
        });
      }

      // Perverse actual file.
      if (actual) fs.writeFileSync(actualPath, actual);
      return {
        message: () => diffMessage,
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
