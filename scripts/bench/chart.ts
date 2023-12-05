import { render, stdlib } from '@antv/g2v5';
import { html } from 'htl';
import * as _cases from './tests/chart';

type Cases = Record<
  string,
  {
    data: () => Promise<any>;
    benchmark: {
      [key: string]: (
        data: any,
        { start, end }: { start: any; end: any },
      ) => Promise<any>;
    };
  }
>;

const cases = _cases as unknown as Cases;

const api = {
  report: 'http://localhost:3000/report',
};

const app = document.getElementById('app') as HTMLElement;
let currentContainer = document.createElement('div');

// Select for chart.
const selectChart = document.createElement('select') as HTMLSelectElement;
selectChart.style.margin = '1em';
selectChart.append(...Object.keys(cases).map(createOption));
selectChart.onchange = () => {
  const { value } = selectChart;
  history.pushState({ value }, '', `?name=${value}`);
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
});

// @ts-ignore
const initialValue = new URL(location).searchParams.get('name') as string;
if (cases[initialValue]) selectChart.value = initialValue;
app.append(selectChart);
app.append(span);
init();

async function init() {
  if (currentContainer) {
    currentContainer.remove();
  }
  currentContainer = document.createElement('div');
  app.append(currentContainer);

  const benchmark = cases[selectChart.value];
  // Append checkbox
  renderCheckbox(currentContainer, selectChart.value, benchmark);

  renderStartButton(currentContainer);
}

function renderCheckbox(
  container: HTMLDivElement,
  name: string,
  { benchmark: plots }: any,
) {
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
        ({ name, checked }: any) => html`<div>
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
  function onClick(e: any) {
    const { value } = e.target;
    const datum = data.find((d: any) => d.name === value);
    datum.checked = !datum.checked;
    localStorage.setItem(name, JSON.stringify(data));
  }
  function onClear() {
    localStorage.removeItem(name);
  }
  container.appendChild(checkbox);
}

function renderStartButton(container: HTMLDivElement) {
  const button = document.createElement('button');
  button.textContent = 'Start';
  button.onclick = () => {
    clearNodes();
    launch(currentContainer);
  };
  container.appendChild(button);
}

async function launch(container: HTMLDivElement) {
  const benchmark = cases[selectChart.value];
  const { data: getData, benchmark: plots } = benchmark;
  const data = await getData();
  const results: PerformanceMeasure[] = [];
  const cache = localStorage.getItem(selectChart.value);
  const names = cache
    ? new Set(
        JSON.parse(cache)
          .filter((d: any) => d.checked)
          .map((d: any) => d.name),
      )
    : null;
  const items = !names
    ? Object.entries(plots)
    : Object.entries(plots).filter(([name]) => names.has(name));

  for (const [key, plot] of items) {
    await new Promise<void>((resolve) => {
      plot(data, {
        start: () => performance.mark(key),
        end: (node: any) => {
          const result = performance.measure(key, key);
          results.push(result);
          renderPrefResultEach(container, node, key, result, true);
          resolve();
        },
      });
    });
  }

  // renderPreResultAll(container, results);

  renderReportUpload(container, results);

  return results;
}

function renderReportUpload(
  container: HTMLDivElement,
  result: PerformanceMeasure[],
) {
  const id = 'upload';
  document.getElementById(id)?.remove();
  const upload = document.createElement('button');
  upload.id = id;
  upload.textContent = 'Upload';
  container.append(upload);

  upload.onclick = () => {
    fetch(api.report, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: selectChart.value,
        data: result,
      }),
    })
      .then((res) => res.json())
      .then((d) => {
        if (d.success) window.alert('Upload success!');
      });
  };
}

function renderPreResultAll(
  container: HTMLDivElement,
  results: PerformanceMeasure[],
) {
  const id = 'result';
  document.getElementById(id)?.remove();
  const dashboard = document.createElement('div');
  dashboard.id = id;
  container.appendChild(dashboard);
  const node = render(
    {
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
    },
    { library: stdlib() },
  );
  dashboard.appendChild(node);
}

function clearNodes(className = 'chart') {
  const charts = document.getElementsByClassName(className);
  Array.from(charts).forEach((d) => d.remove());
}

function renderPrefResultEach(
  container: HTMLDivElement,
  node: any,
  name: string,
  result: PerformanceMeasure,
  display?: boolean,
) {
  const className = 'chart';
  const p = html`<div style="margin-left: 1em;" class="${className}">
    <b>
      ${name}
    </b>
    <div style="margin: 1em 0;"><span>渲染时间：${result.duration}</span></div>
    <div>${node}</di>
  </div>`;
  container.appendChild(p);
  if (!display) clearNodes(className);
}

function createOption(key: string) {
  const option = document.createElement('option');
  option.value = key;
  option.textContent = key;
  return option;
}
