import * as path from 'path';
import * as fs from 'fs';
import { Canvas } from '@antv/g';
import xmlserializer from 'xmlserializer';
import { format } from 'prettier';

function createUpdateId() {
  const defined = (d) => d !== undefined && d !== null;

  // Index new id by old id.
  const oldNew = new Map();

  // Create or return new id.
  const getNewId = (id) => {
    if (oldNew.has(id)) return oldNew.get(id);
    const newId = oldNew.has(id) ? oldNew.get(id) : `_id-${++index}`;
    oldNew.set(id, newId);
    return newId;
  };

  // Init Id counter.
  let index = -1;

  const updateId = (dom: HTMLElement | SVGElement) => {
    if (!dom.getAttribute) return;
    const id = dom.getAttribute('id');
    const nodeName = dom.nodeName;

    const maybeURL = (key) => {
      const attribute = dom.getAttribute(key);
      if (!defined(attribute)) return;
      const match = /url\(#(.+)\)/g.exec(attribute!);
      if (match) {
        const oldId = match[1];
        const newId = getNewId(oldId);
        dom.setAttribute(key, `url(#${newId})`);
      }
    };

    // Update use element: <use href="#aaa" />
    if (nodeName === 'use') {
      const href = dom.getAttribute('href');
      const match = /#(.+)/g.exec(href!);
      if (match) {
        const oldId = match[1];
        const newId = getNewId(oldId);
        dom.setAttribute('href', `#${newId}`);
      }
    }

    // Update id.
    if (defined(id)) {
      const newId = getNewId(id);
      dom.setAttribute('id', newId);
    }

    // Update attribute like clip-path: <g clip-path="url(#aaa)"/>
    const urlAttributes = ['clip-path', 'fill', 'stroke'];
    urlAttributes.forEach(maybeURL);

    // Update id recursively.
    dom.childNodes.forEach((child) =>
      updateId(child as HTMLElement | SVGElement),
    );

    return dom;
  };

  return updateId;
}

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
  const { selector = 'svg', fileFormat = 'svg' } = options;
  const namePath = path.join(dir, name);
  const actualPath = path.join(dir, `${name}-actual.${fileFormat}`);
  const expectedPath = path.join(dir, `${name}.${fileFormat}`);
  const container = gCanvas.getConfig().container as HTMLElement;
  const dom = selector ? document.body.querySelector(selector) : container;

  let actual;
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const updateId = createUpdateId();

    actual = dom
      ? format(xmlserializer.serializeToString(updateId(dom as HTMLElement)), {
          parser: 'babel',
        })
      : 'null';

    if (actual !== 'null') actual = actual.slice(0, -2); // Remove ';' after format by babel.

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

      // Perverse actual file.
      if (actual) fs.writeFileSync(actualPath, actual);
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
