import * as path from 'path';
import * as fs from 'fs';
import { Canvas } from '@antv/g';
import xmlserializer from 'xmlserializer';
import { format } from 'prettier';

const MAX_DIFFERENCES_TO_SHOW = 3;

export type ToMatchDOMSnapshotOptions = {
  selector?: string;
  fileFormat?: string;
  keepSVGElementId?: boolean;
};
function formatSVG(svg: string, keepSVGElementId: boolean) {
  return keepSVGElementId
    ? svg
    : svg
        .replace(/id="[^"]*"/g, '')
        .replace(/clip-path="[^"]*"/g, '')
        .replace(/<use href="[^"]*"/g, '<use');
}

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
  keepSVGElementId = false,
): SVGDifferenceResult {
  const formattedActual = formatSVG(actual, keepSVGElementId);
  const formattedExpected = formatSVG(expected, keepSVGElementId);

  if (formattedActual === formattedExpected) {
    return { equal: true, differences: [] };
  }

  // Line-by-line comparison to find differences.
  const actualLines = formattedActual.split('\n');
  const expectedLines = formattedExpected.split('\n');
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

/**
 * Compare two SVG strings, should isgnore some attributes.
 */
function isSVGEqual(
  actual: string,
  expected: string,
  keepSVGElementId = false,
) {
  return keepSVGElementId
    ? actual === expected
    : formatSVG(actual, keepSVGElementId) ===
        formatSVG(expected, keepSVGElementId);
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

    actual = dom
      ? format(xmlserializer.serializeToString(dom), {
          parser: 'babel',
        })
      : 'null';

    // Remove ';' after format by babel.
    if (actual !== 'null') actual = actual.slice(0, -2);

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

      if (isSVGEqual(actual, expected, keepSVGElementId)) {
        if (fs.existsSync(actualPath)) fs.unlinkSync(actualPath);
        return {
          message: () => `match ${namePath}`,
          pass: true,
        };
      }

      // Find differences for detailed message.
      const result = findSVGDifferences(actual, expected, keepSVGElementId);
      const totalDifferences = result.differences.length;
      let diffMessage = `mismatch ${namePath}`;

      if (totalDifferences > 0) {
        if (totalDifferences >= MAX_DIFFERENCES_TO_SHOW) {
          diffMessage += `\nThere are too many differencies, only show ${MAX_DIFFERENCES_TO_SHOW} of them.`;
        }

        // Add difference details to message.
        result.differences.forEach((diff, index) => {
          diffMessage += `\nDifference ${index + 1} at line ${diff.line}:\n`;
          diffMessage += `  Expected: ${diff.expected}\n`;
          diffMessage += `  ❌Actual: ${diff.actual}`;
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
