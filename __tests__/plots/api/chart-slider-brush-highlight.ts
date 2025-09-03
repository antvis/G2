import { Chart } from '../../../src';

export function chartSliderBrushHighlight(context) {
  const { container, canvas } = context;

  // button for slider filter
  const buttonSliderX = document.createElement('button');
  buttonSliderX.innerText = 'Filter X';
  container.appendChild(buttonSliderX);

  const buttonSliderY = document.createElement('button');
  buttonSliderY.innerText = 'Filter Y';
  container.appendChild(buttonSliderY);

  // button for brush highlight
  const buttonBrush = document.createElement('button');
  buttonBrush.innerText = 'Brush Highlight';
  container.appendChild(buttonBrush);

  // wrapperDiv
  const wrapperDiv = document.createElement('div');
  container.appendChild(wrapperDiv);

  const chart = new Chart({
    container: wrapperDiv,
    width: 800,
    height: 640,
    canvas,
  });

  chart
    .cell()
    .data([
      { x: 0, y: 9, index: 0 },
      { x: 1, y: 9, index: 1 },
      { x: 2, y: 9, index: 1 },
      { x: 3, y: 9, index: 1 },
      { x: 4, y: 9, index: 1 },
      { x: 5, y: 9, index: 1 },
      { x: 6, y: 9, index: 1 },
      { x: 7, y: 9, index: 1 },
      { x: 8, y: 9, index: 1 },
      { x: 9, y: 9, index: 1 },
      { x: 0, y: 8, index: 1 },
      { x: 1, y: 8, index: 1 },
      { x: 2, y: 8, index: 1 },
      { x: 3, y: 8, index: 2 },
      { x: 4, y: 8, index: 2 },
      { x: 5, y: 8, index: 2 },
      { x: 6, y: 8, index: 2 },
      { x: 7, y: 8, index: 2 },
      { x: 8, y: 8, index: 2 },
      { x: 9, y: 8, index: 2 },
      { x: 0, y: 7, index: 2 },
      { x: 1, y: 7, index: 2 },
      { x: 2, y: 7, index: 2 },
      { x: 3, y: 7, index: 2 },
      { x: 4, y: 7, index: 2 },
      { x: 5, y: 7, index: 3 },
      { x: 6, y: 7, index: 3 },
      { x: 7, y: 7, index: 3 },
      { x: 8, y: 7, index: 3 },
      { x: 9, y: 7, index: 3 },
      { x: 0, y: 6, index: 3 },
      { x: 1, y: 6, index: 3 },
      { x: 2, y: 6, index: 3 },
      { x: 3, y: 6, index: 3 },
      { x: 4, y: 6, index: 3 },
      { x: 5, y: 6, index: 3 },
      { x: 6, y: 6, index: 3 },
      { x: 7, y: 6, index: 3 },
      { x: 8, y: 6, index: 3 },
      { x: 9, y: 6, index: 3 },
      { x: 0, y: 5, index: 4 },
      { x: 1, y: 5, index: 4 },
      { x: 2, y: 5, index: 4 },
      { x: 3, y: 5, index: 4 },
      { x: 4, y: 5, index: 5 },
      { x: 5, y: 5, index: 5 },
      { x: 6, y: 5, index: 5 },
      { x: 7, y: 5, index: 5 },
      { x: 8, y: 5, index: 5 },
      { x: 9, y: 5, index: 5 },
      { x: 0, y: 4, index: 5 },
      { x: 1, y: 4, index: 5 },
      { x: 2, y: 4, index: 5 },
      { x: 3, y: 4, index: 5 },
      { x: 4, y: 4, index: 5 },
      { x: 5, y: 4, index: 5 },
      { x: 6, y: 4, index: 5 },
      { x: 7, y: 4, index: 5 },
      { x: 8, y: 4, index: 6 },
      { x: 9, y: 4, index: 6 },
      { x: 0, y: 3, index: 6 },
      { x: 1, y: 3, index: 6 },
      { x: 2, y: 3, index: 6 },
      { x: 3, y: 3, index: 6 },
      { x: 4, y: 3, index: 7 },
      { x: 5, y: 3, index: 7 },
      { x: 6, y: 3, index: 7 },
      { x: 7, y: 3, index: 7 },
      { x: 8, y: 3, index: 7 },
      { x: 9, y: 3, index: 7 },
      { x: 0, y: 2, index: 7 },
      { x: 1, y: 2, index: 7 },
      { x: 2, y: 2, index: 7 },
      { x: 3, y: 2, index: 7 },
      { x: 4, y: 2, index: 7 },
      { x: 5, y: 2, index: 7 },
      { x: 6, y: 2, index: 7 },
      { x: 7, y: 2, index: 7 },
      { x: 8, y: 2, index: 7 },
      { x: 9, y: 2, index: 7 },
      { x: 0, y: 1, index: 7 },
      { x: 1, y: 1, index: 7 },
      { x: 2, y: 1, index: 7 },
      { x: 3, y: 1, index: 7 },
      { x: 4, y: 1, index: 7 },
      { x: 5, y: 1, index: 7 },
      { x: 6, y: 1, index: 8 },
      { x: 7, y: 1, index: 8 },
      { x: 8, y: 1, index: 8 },
      { x: 9, y: 1, index: 8 },
      { x: 0, y: 0, index: 8 },
      { x: 1, y: 0, index: 8 },
      { x: 2, y: 0, index: 8 },
      { x: 3, y: 0, index: 8 },
      { x: 4, y: 0, index: 8 },
      { x: 5, y: 0, index: 8 },
      { x: 6, y: 0, index: 8 },
      { x: 7, y: 0, index: 8 },
      { x: 8, y: 0, index: 8 },
      { x: 9, y: 0, index: 8 },
    ])
    .scale('color', { type: 'ordinal' })
    .encode('x', 'x')
    .encode('y', 'y')
    .encode('color', 'index')
    .style('stroke', '#000')
    .style('inset', 2)
    .animate('enter', { type: 'fadeIn' })
    .slider('y')
    .slider('x')
    .interaction('brushHighlight', true);

  const finished = chart.render();

  // Track slider filter events
  let sliderXFiltered = false;
  let sliderYFiltered = false;

  chart.on('sliderX:filter', (event) => {
    const { nativeEvent } = event;
    if (nativeEvent) {
      sliderXFiltered = true;
      console.log('SliderX filtered:', event.data.selection);
    }
  });

  chart.on('sliderY:filter', (event) => {
    const { nativeEvent } = event;
    if (nativeEvent) {
      sliderYFiltered = true;
      console.log('SliderY filtered:', event.data.selection);
    }
  });

  // Track brush events
  let brushSelection = null;
  chart.on('brush:end', (event) => {
    const { nativeEvent } = event;
    if (nativeEvent) {
      brushSelection = event.data.selection;
      console.log('Brush selection:', brushSelection);
    }
  });

  // Promises for async control
  let resolveSliderX;
  const sliderXComplete = new Promise((r) => (resolveSliderX = r));

  let resolveSliderY;
  const sliderYComplete = new Promise((r) => (resolveSliderY = r));

  let resolveBrush;
  const brushComplete = new Promise((r) => (resolveBrush = r));

  buttonSliderX.onclick = () => {
    chart.emit('sliderX:filter', {
      data: { selection: [[0, 1], undefined] },
    });
    resolveSliderX();
  };

  buttonSliderY.onclick = () => {
    chart.emit('sliderY:filter', {
      data: { selection: [undefined, [4, 2]] },
    });
    resolveSliderY();
  };

  // Brush highlight - should use filtered domain
  buttonBrush.onclick = () => {
    chart.emit('brush:highlight', {
      data: {
        selection: [
          [0, 1],
          [3, 2],
        ],
      },
    });
    resolveBrush();
  };

  return {
    chart,
    buttonSliderX,
    buttonSliderY,
    buttonBrush,
    finished,
    sliderXComplete,
    sliderYComplete,
    brushComplete,
    getBrushSelection: () => brushSelection,
    isSliderXFiltered: () => sliderXFiltered,
    isSliderYFiltered: () => sliderYFiltered,
  };
}
