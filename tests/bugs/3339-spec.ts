import DIAMOND from '../../examples/data/diamond.json';
import { Chart } from '../../src';
import { createDiv } from '../util/dom';

describe('#3339', () => {
  const div = createDiv();

  const chart = new Chart({
    container: div,
    autoFit: true,
    height: 500,
    padding: 48,
  });
  chart.data(DIAMOND);

  chart.scale({
    carat: {
      sync: true,
    },
    price: {
      sync: true,
    },
    cut: {
      sync: true,
    },
  });

  chart.facet('list', {
    fields: ['cut'],
    cols: 3, // 超过3个换行
    padding: 30,
    eachView(view) {
      view.point().position('carat*price').color('cut').shape('circle').style({ opacity: 0.3 }).size(3);
    },
  });
  it('第一次设置分面后，init为false', () => {
    // @ts-ignore
    const facetInited = chart.facetInstance.isInited();
    expect(facetInited).toBe(false); 
  });

  
  it('第一次设置分面后并调用渲染后，分面实例完成初始化', () => {
    chart.render();
    // @ts-ignore
    const facetInited = chart.facetInstance.isInited();
    expect(facetInited).toBe(true); 
  });

  it('调用过facet API更新配置后，初始化状态为false', () => {
    chart.facet('rect', {
      fields: [ 'cut' ],
      eachView(view) {
        view.point()
          .position('carat*price')
          .color('clarity-dash-case')
          .shape('circle')
          .style({ fillOpacity: 0.3, stroke: null })
          .size(3);
      }
    });
    // @ts-ignore
    const facetInited = chart.facetInstance.isInited();
    expect(facetInited).toBe(false); 
  });
  
  it('调用render(true)更新图表后，facet会重新初始化，更新为正确的配置', () => {
    chart.render(true);
    // @ts-ignore
    const facetInstance = chart.facetInstance;
    const facetInited = facetInstance.isInited();
    expect(facetInited).toBe(true); 
    // @ts-ignore
    expect(facetInstance.cfg.type).toBe('rect');
  });
});
