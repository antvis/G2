import { flatten } from '@antv/util';
import { Chart, Geometry } from '../../../../../src';
import { IGroup } from '../../../../../src/dependents';
import { hideOverlap } from '../../../../../src/geometry/label/layout/hide-overlap';
import { CountryEconomy as data } from '../../../../data/country-economy';
import { createDiv, removeDom } from '../../../../util/dom';

// Skipped, this test pollutes the output and is probably not needed for
// day-to-day testing. Performance can be monitored through the total test time.
describe.skip('Benchmarks of hide-overlap', () => {
  const div = createDiv();
  const chart = new Chart({
    container: div,
    autoFit: false,
    width: 500,
    height: 500,
    padding: 100,
  });

  it('data counts', () => {
    expect(data.length).toBe(60);
  });

  function benchmark(geometry: Geometry) {
    const labels = geometry.labelsContainer.getChildren() as IGroup[];
    const dataArray = geometry.dataArray;
    // @ts-ignore
    const labelItems = geometry.geometryLabel.getLabelItems(flatten(dataArray));
    expect(labels.length).toBe(data.length);
    expect(labelItems.length).toBe(data.length);

    // start benchmark
    const startTime = new Date().getTime();

    const ROUNDS = 10;
    const REPEAT_COUNTS = 10;
    let endTime = startTime;
    let totalTime = 0;
    for (let i = 0, ie = ROUNDS; i < ie; ++i) {
      const testLabels = [];
      const items = [];
      labels.forEach((label, idx) => {
        const cloneLabel = label.clone();
        for (let j = 0; j < REPEAT_COUNTS; j++) {
          testLabels.push(cloneLabel);
          items.push(labelItems[idx]);
        }
      });
      hideOverlap(items, testLabels, [], {} as any);

      expect(testLabels.filter((l) => l.get('visible')).length).toBeLessThan(data.length * REPEAT_COUNTS);
      // 30 ~ 120ms 左右
      const duration = new Date().getTime() - endTime;
      totalTime += duration;
      endTime = new Date().getTime();
    }
    // 13635ms 左右
    console.info(`performance/label/hide-overlap: ${ROUNDS} tests, ${totalTime}ms`);
    // 期待 600 个 labels 平均时长小于 5s (60 个 labels，柱状图大概在 10-30ms, 饼图大概在 20-40ms)
    expect(totalTime / ROUNDS).toBeLessThan(5 * 1000);
    console.info(`performance/label/hide-overlap, ${data.length * REPEAT_COUNTS} labels, average: ${totalTime / ROUNDS}ms`);
  }

  it('column labels', () => {
    chart.data(data);

    const column = chart.interval().position('continent*Population').color('Country').adjust('stack').label('Country');
    chart.render();

    benchmark(column);
  });

  it('pie labels', () => {
    chart.clear();
    chart.coordinate('theta', {
      radius: 0.8,
    });

    chart.data(data);

    const pie = chart
      .interval()
      .position('Population')
      .color('Country')
      .adjust('stack')
      .label('Country', {
        layout: { type: '' },
      });
    chart.render();

    benchmark(pie);
  });

  it('pie inner labels', () => {
    chart.clear();
    chart.coordinate('theta', {
      radius: 0.8,
    });

    chart.data(data);

    const pie = chart.interval().position('Population').color('Country').adjust('stack').label('Country', {
      offset: -10,
    });
    chart.render();

    benchmark(pie);
  });

  afterAll(() => {
    chart.destroy();
    removeDom(div);
  });
});
