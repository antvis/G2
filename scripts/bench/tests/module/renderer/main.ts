import { canvas } from './canvas';
import { g } from './g';
import { gOld } from './g-4.0';
import { svg } from './svg';

let selectShape: HTMLSelectElement;
let selectRenderer: HTMLSelectElement;
const renderers = ['canvas', 'svg', 'g', 'g-4.0'];
const shapes = ['Circle', 'Rect', 'Text'];
const api = {
  report: 'http://localhost:3000/report',
};

function createSelect(id: string, options: string[]) {
  const select = document.createElement('select');
  select.id = id;
  options.forEach((option) => {
    const opt = document.createElement('option');
    opt.value = option;
    opt.text = option;
    select.appendChild(opt);
  });
  select.value = options[0];
  document.body.prepend(select);
  return select;
}

function createButton() {
  const button = document.createElement('button');
  button.innerText = 'Start';
  document.body.appendChild(button);
  button.onclick = () => {
    runner();
  };
  return button;
}

function bindEvents() {
  document.addEventListener('keydown', (e) => {
    const renderer = selectRenderer.options;
    const shape = selectShape.options;
    const rendererIndex = Array.from(renderer).findIndex(
      (option) => option.value === selectRenderer.value,
    );
    const shapeIndex = Array.from(shape).findIndex(
      (option) => option.value === selectShape.value,
    );

    const acceptKeys = [
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Enter',
    ];
    if (!acceptKeys.includes(e.key)) return;

    if (e.key === 'ArrowLeft') {
      selectRenderer.value =
        renderer[(rendererIndex - 1 + renderer.length) % renderer.length].value;
    } else if (e.key === 'ArrowRight') {
      selectRenderer.value =
        renderer[(rendererIndex + 1) % renderer.length].value;
    } else if (e.key === 'ArrowUp') {
      selectShape.value =
        shape[(shapeIndex - 1 + shape.length) % shape.length].value;
    } else if (e.key === 'ArrowDown') {
      selectShape.value = shape[(shapeIndex + 1) % shape.length].value;
    }
    // Enter
    render();
  });

  document.addEventListener('keydown', (e) => {});
}

const render = async (count: number = 1000) => {
  const container = document.getElementById('container');
  if (container) {
    container.innerHTML = '';
  }
  const map = { canvas, svg, g, 'g-4.0': gOld };
  const key = selectRenderer.value + selectShape.value;
  performance.mark(key);
  await creator(
    map[selectRenderer.value as keyof typeof map],
    selectShape.value,
    count,
  );
  const measure = performance.measure(key, key);
  return measure.duration;
};

function init() {
  selectRenderer = createSelect('select-renderer', renderers);
  selectShape = createSelect('select-shape', shapes);
  createButton();
  bindEvents();

  selectRenderer.onchange = () => render();
  selectShape.onchange = () => render();
}

export async function creator(ctor: any, type: any, count: number) {
  const Shape = ctor(document.getElementById('container'));
  const limit = type === 'Text' ? Math.min(count, 1000) : count;

  let counter = 0;
  const draw: () => Promise<any> = async () => {
    if (counter === limit) return Promise.resolve();
    counter++;
    await Shape[type](
      Math.random() * 800,
      Math.random() * 600,
      Math.random() * 50,
      Math.random() * 50,
    );
    draw();
  };
  await draw();
  return Promise.resolve();
}

const wait = (time = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
};

type PerfRecord = {
  renderer: string;
  shape: string;
  duration: number;
  count: number;
}[];

async function runner() {
  const record = [];
  const magnitude = new Array(5).fill(0).map((d, i) => Math.pow(10, i + 1));
  for (const count of magnitude) {
    for (const renderer of renderers) {
      selectRenderer.value = renderer;
      for (const shape of shapes) {
        selectShape.value = shape;
        const duration = await render(count);
        record.push({ renderer, shape, duration, count });
        await wait(count / 100);
      }
    }
  }
  exportReport(record);
}

function exportReport(record: PerfRecord) {
  const button = document.createElement('button');
  button.innerText = 'Upload';
  button.onclick = () => {
    fetch(api.report, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'renderer',
        data: record,
      }),
    })
      .then((res) => res.json())
      .then((d) => {
        if (d.success) window.alert('Upload success!');
      });
  };
  document.body.appendChild(button);
}

window.onload = () => init();
