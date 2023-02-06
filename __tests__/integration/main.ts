import { Canvas } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Plugin as DragAndDropPlugin } from '@antv/g-plugin-dragndrop';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { render } from '../../src';
import { renderToMountedElement } from './utils/renderToMountedElement';
import * as charts from './charts';
import * as interactions from './interactions';
import * as animations from './animations';
import * as tooltips from './tooltips';
import * as apis from './apis';

const tests = {
  ...createSpecRender(charts),
  ...createSpecRender(namespace(tooltips, 'tooltip')),
  ...createSpecRender(namespace(interactions, 'interaction')),
  ...createSpecRender(namespace(animations, 'animation')),
  ...createAPIRender(namespace(apis, 'api')),
};

const renderers = {
  canvas: CanvasRenderer,
  svg: SVGRenderer,
};
const app = document.getElementById('app') as HTMLElement;
let currentContainer = document.createElement('div');
let canvas;
let prevAfter;

// Select for chart.
const selectChart = document.createElement('select') as HTMLSelectElement;
selectChart.style.margin = '1em';
selectChart.append(...Object.keys(tests).map(createOption));
selectChart.onchange = () => {
  const { value } = selectChart;
  history.pushState({ value }, '', `?name=${value}`);
  plot();
};
document.onkeydown = (event) => {
  if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
  switch (event.key) {
    case 'ArrowLeft': {
      if (selectChart.selectedIndex > 0) {
        selectChart.selectedIndex--;
        // @ts-ignore
        selectChart.onchange();
      } else {
        alert('This is the first test case.');
      }
      break;
    }
    case 'ArrowRight': {
      if (selectChart.selectedIndex < selectChart.options.length - 1) {
        selectChart.selectedIndex++;
        // @ts-ignore
        selectChart.onchange();
      } else {
        alert('This is the last test case.');
      }
      break;
    }
  }
};

// Select for renderer.
const selectRenderer = document.createElement('select');
selectRenderer.style.margin = '1em';
selectRenderer.append(...Object.keys(renderers).map(createOption));
selectRenderer.onchange = () => {
  plot();
};

// Span for tips.
const span = document.createElement('span');
span.textContent = 'Press left or right to view more.';
span.style.fontSize = '10px';

addEventListener('popstate', (event) => {
  const { value } = history.state;
  selectChart.value = value;
  plot();
});

// @ts-ignore
const initialValue = new URL(location).searchParams.get('name') as string;
if (tests[initialValue]) selectChart.value = initialValue;
app.append(selectChart);
app.append(selectRenderer);
app.append(span);
plot();

async function plot() {
  if (currentContainer) {
    currentContainer.remove();
    if (canvas) canvas.destroy();
    if (prevAfter) prevAfter();
  }
  currentContainer = document.createElement('div');
  app.append(currentContainer);
  const render = tests[selectChart.value];
  render(currentContainer);
}

function createOption(key) {
  const option = document.createElement('option');
  option.value = key;
  option.textContent = key;
  return option;
}

function namespace(object, name) {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [`${name}-${key}`, value]),
  );
}

function createSpecRender(object) {
  const specRender = (generate) => {
    return async (container) => {
      // Select render is necessary for spec tests.
      selectRenderer.style.display = 'inline';

      const { mounted = false, before, after } = generate;
      prevAfter = after;
      const options = await generate();
      const { width = 640, height = 480 } = options;
      const dom = generate.dom?.();
      const renderer = new renderers[selectRenderer.value]();
      renderer.registerPlugin(
        new DragAndDropPlugin({ dragstartDistanceThreshold: 1 }),
      );
      canvas = new Canvas({
        container: document.createElement('div'),
        width,
        height,
        renderer,
      });

      // @ts-ignore
      window.__g_instances__ = [canvas];
      const renderChart = mounted ? renderToMountedElement : render;
      before?.();
      const node = renderChart(options, { canvas }, () => after?.());

      // Append nodes.
      if (node instanceof HTMLElement) container.append(node);
      if (dom instanceof HTMLElement) container.append(dom);
    };
  };
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [key, specRender(value)]),
  );
}

function createAPIRender(object) {
  const apiRender = (render) => {
    return (container) => {
      // Select render is unnecessary for api tests.
      selectRenderer.style.display = 'none';
      render({ container });
    };
  };
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [key, apiRender(value)]),
  );
}
