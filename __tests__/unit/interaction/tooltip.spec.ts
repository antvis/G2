import { Canvas } from '@antv/g';
import { Chart } from '../../../src';
import { createNodeGCanvas } from '../../integration/utils/createNodeGCanvas';
import { dispatchFirstElementPointerMoveEvent } from '../../integration/utils/event';

type TooltipContent = {
  title: string;
  name: string;
  value: string;
  color?: string;
};

async function renderTooltip(
  content: TooltipContent,
  render?: (event: any, data: any) => HTMLElement,
) {
  const canvas = createNodeGCanvas(640, 480);
  const container = canvas.getConfig().container as HTMLDivElement;
  const chart = new Chart({ container, canvas });

  chart
    .interval()
    .data([{ category: 'A', amount: 1 }])
    .encode('x', 'category')
    .encode('y', 'amount')
    .tooltip({
      title: () => content.title,
      items: [
        () => ({
          name: content.name,
          value: content.value,
          color: content.color,
        }),
      ],
    })
    .interaction('tooltip', { wait: 0, render });

  await chart.render();
  dispatchFirstElementPointerMoveEvent(canvas);

  return {
    canvas,
    chart,
    tooltip: container.querySelector('.g2-tooltip') as HTMLElement,
  };
}

function destroy(chart: Chart, canvas: Canvas) {
  chart.destroy();
  canvas.destroy();
}

describe('Tooltip security', () => {
  it('escapes default tooltip title, item name, item value and attributes', async () => {
    const content = {
      title: '<img src=x onerror="alert(1)">',
      name: '<svg onload="alert(2)"></svg>',
      value: '"><script>alert(3)</script>\'',
      color: 'red; background-image: url(javascript:alert(4))',
    };
    const { canvas, chart, tooltip } = await renderTooltip(content);

    try {
      const title = tooltip.querySelector('.g2-tooltip-title') as HTMLElement;
      const name = tooltip.querySelector(
        '.g2-tooltip-list-item-name-label',
      ) as HTMLElement;
      const value = tooltip.querySelector(
        '.g2-tooltip-list-item-value',
      ) as HTMLElement;
      const marker = tooltip.querySelector(
        '.g2-tooltip-list-item-marker',
      ) as HTMLElement;

      expect(title.textContent).toBe(content.title);
      expect(name.textContent).toBe(content.name);
      expect(value.textContent).toBe(content.value);
      expect(name.getAttribute('title')).toBe(content.name);
      expect(value.getAttribute('title')).toBe(content.value);
      expect(marker.style.background).toBe('black');
      expect(tooltip.querySelector('img, svg, script')).toBeNull();
      expect(tooltip.querySelector('[onerror], [onload]')).toBeNull();

      // Re-rendering the same data should not escape an already escaped value.
      dispatchFirstElementPointerMoveEvent(canvas);
      expect(title.textContent).toBe(content.title);
      expect(title.innerHTML).not.toContain('&amp;lt;');
    } finally {
      destroy(chart, canvas);
    }
  });

  it('keeps the default tooltip structure and normal text unchanged', async () => {
    const content = {
      title: 'Category A',
      name: 'Sales',
      value: '275',
      color: '#5b8ff9',
    };
    const { canvas, chart, tooltip } = await renderTooltip(content);

    try {
      expect(tooltip.querySelector('.g2-tooltip-title')?.textContent).toBe(
        content.title,
      );
      expect(
        tooltip.querySelector('.g2-tooltip-list-item-name-label')?.textContent,
      ).toBe(content.name);
      expect(
        tooltip.querySelector('.g2-tooltip-list-item-value')?.textContent,
      ).toBe(content.value);
      expect(tooltip.querySelectorAll('ul > li')).toHaveLength(1);
    } finally {
      destroy(chart, canvas);
    }
  });

  it('preserves an explicitly returned HTMLElement custom content', async () => {
    const content = {
      title: '<custom-title>',
      name: '<custom-name>',
      value: '<custom-value>',
    };
    const render = (_, { title, items }) => {
      const element = document.createElement('strong');
      element.className = 'custom-tooltip-content';
      element.textContent = `${title}|${items[0].name}|${items[0].value}`;
      return element;
    };
    const { canvas, chart, tooltip } = await renderTooltip(content, render);

    try {
      expect(
        tooltip.querySelector('.custom-tooltip-content')?.textContent,
      ).toBe(`${content.title}|${content.name}|${content.value}`);
    } finally {
      destroy(chart, canvas);
    }
  });
});
