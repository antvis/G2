export type Color = {
  r: number;
  g: number;
  b: number;
};

const RGB_REG = /rgba?\(([\s.,0-9]+)\)/;

/**
 * 创建辅助 tag 取颜色
 * @returns
 */
function createTmp(): HTMLElement {
  const i = document.createElement('i');
  i.title = '';
  i.style.display = 'none';
  document.body.appendChild(i);
  return i;
}

let iEl: HTMLElement;

export function parseColor(color: string | Color): Color {
  if (typeof color === 'object') return color;
  if (color[0] === '#' && color.length === 7) {
    return {
      r: parseInt(color.slice(1, 3), 16),
      g: parseInt(color.slice(3, 5), 16),
      b: parseInt(color.slice(5, 7), 16),
    };
  }

  if (!iEl) iEl = createTmp();
  iEl.style.color = color;
  const rst = document.defaultView
    .getComputedStyle(iEl, '')
    .getPropertyValue('color');
  const matches = RGB_REG.exec(rst) as string[];
  const [r, g, b]: number[] = matches[1].split(/\s*,\s*/).map((s) => Number(s));

  return { r, g, b };
}
