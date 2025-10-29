import { Chart } from '../../src';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import { dispatchPlotEvent } from './utils/event';
import { sleep } from './utils/sleep';
import './utils/useCustomFetch';
import './utils/useSnapshotMatchers';

describe('chart.tooltip with disableAutoHide', () => {
  let canvas;

  beforeEach(() => {
    canvas = createNodeGCanvas(640, 480);
  });

  afterEach(() => {
    canvas?.destroy();
  });

  // Render a line chart with disableAutoHide configuration (series tooltip)
  function renderLineChart(disableAutoHide = true) {
    const chart = new Chart({
      canvas,
    });

    chart
      .line()
      .data({
        type: 'fetch',
        value: 'data/aapl.csv',
      })
      .encode('x', 'date')
      .encode('y', 'close')
      .interaction('tooltip', {
        disableAutoHide,
      });

    return chart;
  }

  // Render an interval chart with disableAutoHide configuration (non-series tooltip)
  function renderIntervalChart(disableAutoHide = true) {
    const chart = new Chart({
      canvas,
    });

    chart
      .interval()
      .data([
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ])
      .encode('x', 'genre')
      .encode('y', 'sold')
      .interaction('tooltip', {
        disableAutoHide,
      });

    return chart;
  }

  it('should NOT hide tooltip automatically on pointerleave when disableAutoHide is true', async () => {
    const chart = renderLineChart();
    await chart.render();

    let hideEventCount = 0;
    const hideCallback = () => {
      hideEventCount++;
    };

    chart.on('tooltip:hide', hideCallback);

    // Step 1: Trigger pointermove to show tooltip
    dispatchPlotEvent(canvas, 'pointermove', {
      offsetX: 100,
      offsetY: 100,
    });

    await sleep(100);

    // Step 2: Trigger pointerleave event
    dispatchPlotEvent(canvas, 'pointerleave', {
      offsetX: -20,
      offsetY: -20,
    });

    await sleep(100);

    // Verify that hide event was NOT triggered
    expect(hideEventCount).toBe(0);

    // Step 3: Manually hide tooltip (should trigger hide event)
    chart.emit('tooltip:hide');

    await sleep(100);

    // Verify that hide event was triggered
    expect(hideEventCount).toBe(1);

    chart.off('tooltip:hide', hideCallback);
    chart.destroy();
  });

  it('should NOT hide tooltip on pointerup when disableAutoHide is true (series tooltip)', async () => {
    const chart = renderLineChart();
    await chart.render();

    let hideEventCount = 0;
    const hideCallback = () => {
      hideEventCount++;
    };

    chart.on('tooltip:hide', hideCallback);

    // Step 1: Trigger pointermove to show tooltip
    dispatchPlotEvent(canvas, 'pointermove', {
      offsetX: 100,
      offsetY: 100,
    });

    await sleep(100);

    // Step 2: Trigger pointerup event
    dispatchPlotEvent(canvas, 'pointerup', {
      offsetX: 100,
      offsetY: 100,
    });

    await sleep(100);

    // Verify that hide event was NOT triggered
    expect(hideEventCount).toBe(0);

    chart.off('tooltip:hide', hideCallback);
    chart.destroy();
  });

  it('should NOT hide tooltip on pointerleave for interval chart when disableAutoHide is true', async () => {
    const chart = renderIntervalChart();
    await chart.render();

    let hideEventCount = 0;
    const hideCallback = () => {
      hideEventCount++;
    };

    chart.on('tooltip:hide', hideCallback);

    // Step 1: Trigger pointermove to show tooltip on a bar
    dispatchPlotEvent(canvas, 'pointermove', {
      offsetX: 100,
      offsetY: 200,
    });

    await sleep(100);

    // Step 2: Trigger pointerleave event
    dispatchPlotEvent(canvas, 'pointerleave', {
      offsetX: -20,
      offsetY: -20,
    });

    await sleep(100);

    // Verify that hide event was NOT triggered
    expect(hideEventCount).toBe(0);

    chart.off('tooltip:hide', hideCallback);
    chart.destroy();
  });

  it('should NOT hide tooltip on pointerup for interval chart when disableAutoHide is true', async () => {
    const chart = renderIntervalChart();
    await chart.render();

    let hideEventCount = 0;
    const hideCallback = () => {
      hideEventCount++;
    };

    chart.on('tooltip:hide', hideCallback);

    // Step 1: Trigger pointermove to show tooltip
    dispatchPlotEvent(canvas, 'pointermove', {
      offsetX: 100,
      offsetY: 200,
    });

    await sleep(100);

    // Step 2: Trigger pointerup event
    dispatchPlotEvent(canvas, 'pointerup', {
      offsetX: 100,
      offsetY: 200,
    });

    await sleep(100);

    // Verify that hide event was NOT triggered
    expect(hideEventCount).toBe(0);

    chart.off('tooltip:hide', hideCallback);
    chart.destroy();
  });

  it('should hide tooltip on pointerleave when disableAutoHide is false (default behavior)', async () => {
    const chart = renderLineChart(false);
    await chart.render();

    let hideEventCount = 0;
    const hideCallback = () => {
      hideEventCount++;
    };

    chart.on('tooltip:hide', hideCallback);

    // Step 1: Trigger pointermove to show tooltip
    dispatchPlotEvent(canvas, 'pointermove', {
      offsetX: 100,
      offsetY: 100,
    });

    await sleep(100);

    // Step 2: Trigger pointerleave event
    dispatchPlotEvent(canvas, 'pointerleave', {
      offsetX: -20,
      offsetY: -20,
    });

    await sleep(100);

    // Verify that hide event WAS triggered (default behavior)
    expect(hideEventCount).toBe(1);

    chart.off('tooltip:hide', hideCallback);
    chart.destroy();
  });

  it('should still emit tooltip:show events when disableAutoHide is true', async () => {
    const chart = renderLineChart();
    await chart.render();

    let showEventCount = 0;
    const showCallback = () => {
      showEventCount++;
    };

    chart.on('tooltip:show', showCallback);

    // Trigger multiple pointermove events
    dispatchPlotEvent(canvas, 'pointermove', {
      offsetX: 100,
      offsetY: 100,
    });

    await sleep(100);

    dispatchPlotEvent(canvas, 'pointermove', {
      offsetX: 150,
      offsetY: 100,
    });

    await sleep(100);

    // Verify that show events were triggered
    expect(showEventCount).toBeGreaterThan(0);

    chart.off('tooltip:show', showCallback);
    chart.destroy();
  });

  it('should allow manual hide with chart.emit even when disableAutoHide is true', async () => {
    const chart = renderLineChart();
    await chart.render();

    let hideEventCount = 0;
    let showEventCount = 0;

    chart.on('tooltip:hide', () => hideEventCount++);
    chart.on('tooltip:show', () => showEventCount++);

    // Step 1: Show tooltip
    dispatchPlotEvent(canvas, 'pointermove', {
      offsetX: 100,
      offsetY: 100,
    });

    await sleep(100);

    // Step 2: Manually hide
    chart.emit('tooltip:hide');

    await sleep(100);

    expect(hideEventCount).toBe(1);

    // Step 3: Show again
    dispatchPlotEvent(canvas, 'pointermove', {
      offsetX: 150,
      offsetY: 100,
    });

    await sleep(100);

    // Step 4: Manually hide again
    chart.emit('tooltip:hide');

    await sleep(100);

    expect(hideEventCount).toBe(2);
    expect(showEventCount).toBeGreaterThan(0);

    chart.destroy();
  });
});
