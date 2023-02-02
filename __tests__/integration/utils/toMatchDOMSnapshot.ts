import * as path from 'path';
import * as fs from 'fs';
import { Canvas } from '@antv/g';
import xmlserializer from 'xmlserializer';
import { format } from 'prettier';

export type ToMatchDOMSnapshotOptions = {
  selector?: string;
  fileFormat?: string;
};

// @see https://jestjs.io/docs/26.x/expect#expectextendmatchers
export async function toMatchDOMSnapshot(
  gCanvas: Canvas,
  dir: string,
  name: string,
  options: ToMatchDOMSnapshotOptions = {},
): Promise<{ message: () => string; pass: boolean }> {
  const { selector, fileFormat = 'html' } = options;
  const actualPath = path.join(dir, `${name}-actual.${fileFormat}`);
  const expectedPath = path.join(dir, `${name}.${fileFormat}`);
  const container = gCanvas.getConfig().container as HTMLElement;
  const dom = selector ? container.querySelector(selector) : container;
  if (!dom) return { pass: true, message: () => `empty ${name}` };
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  let actual;
  try {
    actual = format(
      xmlserializer.serializeToString(dom).replace(/id="[^"]*"/g, ''),
      {
        parser: 'babel',
      },
    );

    if (!fs.existsSync(expectedPath)) {
      console.warn(`! generate ${name}`);
      await fs.writeFileSync(expectedPath, actual);
      return {
        message: () => `generate ${name}`,
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
          message: () => `match ${name}`,
          pass: true,
        };
      }

      // Perverse actual file.
      if (actual) fs.writeFileSync(actualPath, actual);
      return {
        message: () => `mismatch ${name}`,
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
