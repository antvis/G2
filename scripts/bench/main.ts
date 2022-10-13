import { render } from '@antv/g2v5';
import { html } from 'htl';
import * as benchmarks from './benchmarks';

const app = document.getElementById('app') as HTMLElement;
let currentContainer = document.createElement('div');

// Select for chart.
const selectChart = document.createElement('select') as HTMLSelectElement;
selectChart.style.margin = '1em';
selectChart.append(...Object.keys(benchmarks).map(createOption));
selectChart.onchange = () => {
  const { value } = selectChart;
  history.pushState({ value }, '', `?name=${value}`);
  run();
};
selectChart.onkeydown = (event) => {
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

// Span for tips.
const span = document.createElement('span');
span.textContent = 'Press left or right to view more.';

addEventListener('popstate', (event) => {
  const { value } = history.state;
  selectChart.value = value;
  run();
});

// @ts-ignore
const initialValue = new URL(location).searchParams.get('name') as string;
if (benchmarks[initialValue]) selectChart.value = initialValue;
app.append(selectChart);
app.append(span);
run();

async function run() {
  if (currentContainer) {
    currentContainer.remove();
  }
  currentContainer = document.createElement('div');
  app.append(currentContainer);

  const benchmark = benchmarks[selectChart.value];
  // Append checkbox
  renderCheckbox(currentContainer, selectChart.value, benchmark);

  // Append Result
  const dashboard = document.createElement('div');
  currentContainer.appendChild(dashboard);

  const { data: getData, benchmark: plots } = benchmark;
  const data = await getData();
  const results: PerformanceMeasure[] = [];
  const cache = localStorage.getItem(selectChart.value);
  const names = cache
    ? new Set(
        JSON.parse(cache)
          .filter((d) => d.checked)
          .map((d) => d.name),
      )
    : null;
  const items = !names
    ? Object.entries(plots)
    : Object.entries(plots).filter(([name]) => names.has(name));

  for (const [key, plot] of items) {
    await new Promise<void>((resolve) => {
      // @ts-ignore
      plot(data, {
        start: () => performance.mark(key),
        end: (node) => {
          const result = performance.measure(key, key);
          results.push(result);
          renderPrefResultEach(currentContainer, node, key, result);
          resolve();
        },
      });
    });
  }
  renderPreResultAll(dashboard, results);
}

function renderCheckbox(container, name, { benchmark: plots }) {
  const names = Object.keys(plots);
  const cache = localStorage.getItem(name);
  const data = cache
    ? JSON.parse(cache)
    : names.map((d) => ({ name: d, checked: true }));
  const checkbox = html`<div style="margin-left: 1em;">
      <span style="margin: 0.25em 0;display:inline-block">
        Check the checkbox and refresh the browser.
      </span>
      <button onclick=${onClear}>Clear checkbox cache</button>
      ${data.map(
        ({ name, checked }) => html`<div>
          <input
            type="checkbox"
            id=${name}
            name="subscribe"
            value=${name}
            onclick=${onClick}
            checked=${checked}
          /><label for=${name}>${name}</label>
        </div>`,
      )}
  </di>`;
  function onClick(e) {
    const { value } = e.target;
    const datum = data.find((d) => d.name === value);
    datum.checked = !datum.checked;
    localStorage.setItem(name, JSON.stringify(data));
  }
  function onClear(e) {
    localStorage.removeItem(name);
  }
  container.appendChild(checkbox);
}

function renderPreResultAll(container, results) {
  const node = render({
    type: 'interval',
    width: 1000,
    data: results,
    encode: { x: 'name', y: 'duration' },
    style: { fill: 'black' },
    transform: [{ type: 'sortX', by: 'y', reverse: true }],
    scale: {
      y: { nice: true },
    },
    axis: {
      x: { labelAutoRotate: false, title: 'library + env' },
      y: { title: 'duration(ms)' },
    },
    labels: [{ text: 'duration', position: 'inside', formatter: '.1f' }],
  });
  container.appendChild(node);
}

function renderPrefResultEach(container, node, name, result) {
  const p = html`<div style="margin-left: 1em;">
    <b>
      ${name}
    </b>
    <div style="margin: 1em 0;"><span>渲染时间：${result.duration}</span></div>
    <div>${node}</di>
  </div>`;
  container.appendChild(p);
}

function createOption(key) {
  const option = document.createElement('option');
  option.value = key;
  option.textContent = key;
  return option;
}
