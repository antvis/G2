import { Chart } from '../../src';
import { createDiv } from '../util/dom';
import { delay } from '../util/delay';

/**
 * 增加 label -->> layout 特定情况报错
 * 报错详情具体查看 https://github.com/antvis/G2/issues/6114
 * 此问题在G代码中修复掉了
 * 
 */
describe('#6114', () => {
  it('dual-axes-label-layout.spec', async () => {

    const group = Array.from({ length: 500 }, (value, index) => {
      return {
        time: index,
        waiting: index * (Math.random() * 10),
        people: index * (Math.random() * 10),
      }
    })

    const chart = new Chart({
      container: createDiv(),
      autoFit: true,
      height: 500
    });
    chart.data(group);
    chart.interval()
      .position('time*waiting')
      .color('#3182bd')
      .label('waiting', {
        layout: [{ type: 'limit-in-plot', }],
      })
    chart.line()
      .position('time*people')
      .color('#fdae6b')
      .size(3)
      .shape('smooth')
      .label('people', {
        layout: [{ type: 'overlap' }, { type: 'limit-in-plot', cfg: { action: 'translate' } },],
      })


    chart.render();
    // await delay(20)

  })
})
