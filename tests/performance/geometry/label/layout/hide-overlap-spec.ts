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

  function benchmark(geometry: Geometry) {
    const labels = geometry.labelsContainer.getChildren() as IGroup[];
    const dataArray = geometry.dataArray;
    // @ts-ignore
    const labelItems = geometry.geometryLabel.getLabelItems(flatten(dataArray));
    expect(labels.length).toBe(data.length);
    expect(labelItems.length).toBe(data.length);

    // start benchmark
    expect(data.length).toBe(60);
    const startTime = new Date().getTime();

    const ROUNDS = 100;
    let endTime = startTime;
    let totalTime = 0;
    for (let i = 0, ie = ROUNDS; i < ie; ++i) {
      const testLabels = labels.map((label) => label.clone()) as IGroup[];
      hideOverlap(labelItems, testLabels, [], {} as any);

      expect(testLabels.filter((l) => l.get('visible')).length).toBeLessThan(data.length);
      // 30 ~ 120ms 左右
      const duration = new Date().getTime() - endTime;
      totalTime += duration;
      endTime = new Date().getTime();
    }
    // 2550 ~ 5000ms 左右
    console.info(`performance/label/hide-overlap: ${ROUNDS} tests, ${totalTime}ms`);
    // 期待平均时长小于 80 ms (柱状图大概在 10-30ms, 饼图大概在 20-40ms)
    expect(totalTime / ROUNDS).toBeLessThan(80);
    console.info(`performance/label/hide-overlap, average: ${totalTime / ROUNDS}ms`);
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
