import { Canvas, CustomEvent } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Plugin as DragAndDropPlugin } from '@antv/g-plugin-dragndrop';
import { Renderer as SVGRenderer } from '@antv/g-svg';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import {
  stdlib,
  render,
  G2Context,
  ELEMENT_CLASS_NAME,
  PLOT_CLASS_NAME,
} from '../src';
import { renderToMountedElement } from './utils/renderToMountedElement';
import * as statics from './plots/static';
import * as interactions from './plots/interaction';
import * as animations from './plots/animation';
import * as tooltips from './plots/tooltip';
import * as apis from './plots/api';
import { disableAnimation } from './integration/utils/preprocess';

const tests = {
  ...createSpecRender(namespace(statics, 'static')),
  ...createSpecRender(namespace(tooltips, 'tooltip')),
  ...createSpecRender(namespace(interactions, 'interaction')),
  ...createSpecRender(namespace(animations, 'animation')),
  ...createAPIRender(namespace(apis, 'api')),
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
const $wrapper = document.createElement('div');
$wrapper.style.height = '50px';
app.append($wrapper);
$wrapper.append(selectChart);
$wrapper.append(searchInput);
$wrapper.append(selectRenderer);
$wrapper.append(span);
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
      let options = await generate();

      if (window['DISABLE_ANIMATIONS']) {
        options = disableAnimation(options);
      }

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
      const context: G2Context = {
        canvas,
        library: stdlib(),
      };
      // @ts-ignore
      window.__g2_context__ = context;
      const renderChart = mounted ? renderToMountedElement : render;
      before?.();
      const node = renderChart(
        options,
        // @ts-ignore
        context,
        () => {
          after?.();
          window['screenshot'] && window['screenshot']();
        },
      );

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
      let options: any = { container };
      if (window['DISABLE_ANIMATIONS']) {
        options = disableAnimation(options);
      }
      const { canvas } = render(options);
      // @ts-ignore
      if (canvas instanceof Canvas) window.__g_instances__ = [canvas];
      window['screenshot'] && window['screenshot']();
    };
  };
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [key, apiRender(value)]),
  );
}

window['play'] = () => {
  const { animations = [] } = window['__g2_context__'] as G2Context;
  for (const animation of animations.filter(
    (animation) => animation !== null,
  )) {
    animation.play();
  }
};

window['pause'] = () => {
  const { animations = [] } = window['__g2_context__'] as G2Context;
  for (const animation of animations.filter(
    (animation) => animation !== null,
  )) {
    animation.pause();
  }
};

window['goto'] = (currentTime: number) => {
  const { animations = [] } = window['__g2_context__'] as G2Context;
  for (const animation of animations.filter(
    (animation) => animation !== null,
  )) {
    animation.pause();
    animation.currentTime = currentTime;
  }
};

window['finish'] = () => {
  const { animations = [] } = window['__g2_context__'] as G2Context;
  for (const animation of animations.filter(
    (animation) => animation !== null,
  )) {
    animation.finish();
  }
};

window['tooltipSteps'] = (i: number) => {
  const { canvas } = window['__g2_context__'] as G2Context;
  const document = canvas!.document!;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  elements[i].dispatchEvent(new CustomEvent('pointerover'));
};

window['seriesTooltipSteps'] = ([x, y]: [number, number]) => {
  const { canvas } = window['__g2_context__'] as G2Context;
  const document = canvas!.document!;
  const plot = document.getElementsByClassName(PLOT_CLASS_NAME)[0];
  plot.dispatchEvent(
    new CustomEvent('pointermove', {
      offsetX: x,
      offsetY: y,
    }),
  );
};

window['tooltipStepsByMarkType'] = ([markType, i]: [string, number]) => {
  const { canvas } = window['__g2_context__'] as G2Context;
  const document = canvas!.document!;
  const elements = document.findAll(
    // @ts-ignore
    (element) => element.markType === markType,
  );
  elements[i].dispatchEvent(new CustomEvent('pointerover'));
};
