import { Canvas } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Plugin as DragAndDropPlugin } from '@antv/g-plugin-dragndrop';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { stdlib, render, Chart } from '../src';
import { renderToMountedElement } from './utils/renderToMountedElement';
import * as statics from './plots/static';
import * as interactions from './plots/interaction';
import * as animations from './plots/animation';
import * as tooltips from './plots/tooltip';
import * as apis from './plots/api';
import * as bugfix from './plots/bugfix';

const tests = {
  ...createSpecRender(namespace(statics, 'static')),
  ...createSpecRender(namespace(tooltips, 'tooltip')),
  ...createSpecRender(namespace(interactions, 'interaction')),
  ...createSpecRender(namespace(animations, 'animation')),
  ...createAPIRender(namespace(apis, 'api')),
  ...createAPIRender(namespace(bugfix, 'bugfix')),
};

const renderers = {
  canvas: CanvasRenderer,
  svg: SVGRenderer,
  webgl: WebGLRenderer,
};
const app = document.getElementById('app') as HTMLElement;
let currentContainer = document.createElement('div');
let canvas;
let prevAfter;
const normalizeName = (name: string) => name.replace(/-/g, '').toLowerCase();
const renderOptions = (keyword = '') => {
  const matched = Object.keys(tests)
    .filter((key) => normalizeName(key).includes(normalizeName(keyword)))
    .map(createOption);
  selectChart.replaceChildren(...matched);
  selectChart.value = '';
};

// Select for chart.
const selectChart = document.createElement('select') as HTMLSelectElement;
selectChart.style.margin = '1em';
renderOptions();
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

// Select for renderer mode(Spec | API).
const selectMode = document.createElement('select');
selectMode.style.margin = '1em';
selectMode.append(...['Spec', 'API'].map(createOption));
selectMode.onchange = () => {
  plot();
};

// Search input
const searchInput = document.createElement('input');
searchInput.style.margin = '1em';
searchInput.placeholder = 'Search test case';
searchInput.onkeyup = () => {
  const { value } = searchInput;
  renderOptions(value);
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
app.append(searchInput);
app.append(selectRenderer);
app.append(selectMode);
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
  render && render(currentContainer);
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
      const mode = selectMode.value;
      if (mode === 'API') {
        const div = document.createElement('div');
        const chart = new Chart({
          container: div,
          width,
          height,
          autoFit: false,
          renderer,
        });
        chart.options(options);
        chart.render();
        container.append(div);
      } else {
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
        const node = renderChart(
          options,
          // @ts-ignore
          { canvas, library: stdlib() },
          () => after?.(),
        );

        // Append nodes.
        if (node instanceof HTMLElement) container.append(node);
        if (dom instanceof HTMLElement) container.append(dom);
      }
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
      const { canvas } = render({ container });
      // @ts-ignore
      if (canvas instanceof Canvas) window.__g_instances__ = [canvas];
    };
  };
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [key, apiRender(value)]),
  );
}
