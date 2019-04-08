const expect = require('chai').expect;
const G2 = require('../../src/index');

describe('#1221', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  it('tooltip throws error when mousemove on the first time', () => {
    const data = [
      { type: 'Sports', count1: 275, count2: 100 },
      { type: 'Strategy', count1: 115, count2: 87 },
      { type: 'Action', count1: 120, count2: 126 },
      { type: 'Shooter', count1: 350, count2: 35 },
      { type: 'Other', count1: 150, count2: 95 }
    ];

    const chart = new G2.Chart({
      container: div,
      width: 500,
      height: 540
    });

    chart.source(data, {
      count1: {
        alias: '销售额'
      },
      count2: {
        alias: '销售量'
      }
    });

    chart.tooltip({
      useHtml: true,
      htmlContent: (title, items) => {
        return `<div class="g2-tooltip" style="padding: 12px;position: absolute; visibility: hidden; z-index: 8; transition: visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(255, 255, 255, 0.9); box-shadow: rgb(174, 174, 174) 0px 0px 10px; border-radius: 3px; color: rgb(87, 87, 87); font-size: 12px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif; line-height: 20px; padding: 10px 10px 6px; display: none; left: ${items[0].x}px; top: ${items[0].y}px;">
        </div>`;
      }
    });

    chart.point().position('type*count1');
    chart.point().position('type*count2');
    chart.render();

    expect(() => {
      const canvas = chart.get('canvas');
      canvas.emit('mousemove', {
        type: 'mousemove',
        x: 479 * 2,
        y: 150 * 2,
        event: {
          toElement: canvas.get('el')
        }
      });
    }).to.not.throw();
  });
});
