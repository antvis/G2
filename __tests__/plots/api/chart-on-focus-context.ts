import { Chart } from '../../../src';

export function chartOnFocusContext(context) {
  const { container, canvas1, canvas2 } = context;

  // Render focus view.
  const focusContainer = document.createElement('div');
  container.appendChild(focusContainer);

  const focusView = new Chart({
    container: focusContainer,
    canvas: canvas1,
  });

  focusView.options({
    type: 'area',
    height: 360,
    data: { type: 'fetch', value: 'data/aapl.csv' },
    encode: { x: 'date', y: 'close' },
    axis: false,
    animate: false,
    interaction: { brushXFilter: true, tooltip: false },
  });

  const focused = focusView.render();

  // Render context view.
  const contextContainer = document.createElement('div');
  container.appendChild(contextContainer);

  const contextView = new Chart({
    container: contextContainer,
    canvas: canvas2,
  });

  contextView.options({
    type: 'area',
    height: 120,
    data: { type: 'fetch', value: 'data/aapl.csv' },
    encode: { x: 'date', y: 'close' },
    axis: false,
    animate: false,
    state: { active: { fill: 'red' } },
    interaction: { brushXHighlight: { series: true }, tooltip: false },
  });

  const contexted = contextView.render();

  // Add event listeners.
  focusView.on('brush:filter', (e) => {
    const { nativeEvent } = e;
    if (!nativeEvent) return;
    const { selection } = e.data;
    const { x: scaleX } = focusView.getScale();
    const [[x1, x2]] = selection;
    const domainX = scaleX.getOptions().domain;
    if (x1 === domainX[0] && x2 === domainX[1]) {
      contextView.emit('brush:remove', {});
    } else {
      contextView.emit('brush:highlight', { data: { selection } });
    }
  });

  contextView.on('brush:highlight', (e) => {
    const { nativeEvent, data } = e;
    if (!nativeEvent) return;
    const { selection } = data;
    focusView.emit('brush:filter', { data: { selection } });
  });

  contextView.on('brush:remove', (e) => {
    const { nativeEvent } = e;
    if (!nativeEvent) return;
    const { x: scaleX, y: scaleY } = contextView.getScale();
    const selection = [scaleX.getOptions().domain, scaleY.getOptions().domain];
    focusView.emit('brush:filter', { data: { selection } });
  });

  return { focusView, focused, contexted, contextView };
}
