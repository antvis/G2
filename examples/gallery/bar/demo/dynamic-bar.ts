import { Chart, registerAnimation } from '@antv/g2';

function delay(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

registerAnimation('label-appear', (element, animateCfg, cfg) => {
  const label = element.getChildren()[0];
  const coordinate = cfg.coordinate;
  const startX = coordinate.start.x;
  const finalX = label.attr('x');
  const labelContent = label.attr('text');

  label.attr('x', startX);
  label.attr('text', 0);

  const distance = finalX - startX;
  label.animate((ratio) => {
    const position = startX + distance * ratio;
    const text = (labelContent * ratio).toFixed(0);

    return {
      x: position,
      text,
    };
  }, animateCfg);
});

registerAnimation('label-update', (element, animateCfg, cfg) => {
  const startX = element.attr('x');
  const startY = element.attr('y');
  // @ts-ignore
  const finalX = cfg.toAttrs.x;
  // @ts-ignore
  const finalY = cfg.toAttrs.y;
  const labelContent = element.attr('text');
  // @ts-ignore
  const finalContent = cfg.toAttrs.text;

  const distanceX = finalX - startX;
  const distanceY = finalY - startY;
  const numberDiff = +finalContent - +labelContent;

  element.animate((ratio) => {
    const positionX = startX + distanceX * ratio;
    const positionY = startY + distanceY * ratio;
    const text = (+labelContent + numberDiff * ratio).toFixed(0);

    return {
      x: positionX,
      y: positionY,
      text,
    };
  }, animateCfg);


});

function sortDataDesc(source) {
  source.sort((a, b) => {
    return a.value - b.value;
  });

  return source;
}

fetch('../data/china-gdp.json')
  .then(res => res.json())
  .then(async data => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500
    });
    chart.data([]);
    chart.coordinate('rect').transpose();
    chart.legend(false);
    // chart.axis('value', false);
    chart.axis('city', {
      animateOption: {
        update: {
          duration: 1000,
          easing: 'easeLinear'
        }
      }
    });
    chart
      .interval()
      .position('city*value')
      .color('city')
      .label('value', (value) => {
        // if (value !== 0) {
        return {
          animate: {
            appear: {
              animation: 'label-appear',
              delay: 0,
              duration: 1000,
              easing: 'easeLinear'
            },
            update: {
              animation: 'label-update',
              duration: 1000,
              easing: 'easeLinear'
            }
          },
          offset: 5,
        };
        // }
      }).animate({
      appear: {
        duration: 1000,
        easing: 'easeLinear'
      },
      update: {
        duration: 1000,
        easing: 'easeLinear'
      }
    });

    // 1949 ~ 2017 的数据动态播放
    const years = Array(2017-1949 + 1).fill(0).map((o, idx) => idx + 1949);

    for (const year of years) {
      chart.data(sortDataDesc(data[year]));

      chart.annotation().clear(true);
      chart.annotation().text({
        position: ['95%', '90%'],
        content: year,
        style: {
          fontSize: 40,
          fontWeight: 'bold',
          fill: '#ddd',
          textAlign: 'end'
        },
      });

      chart.render();

      // 下一个数据，延迟 1200ms
      await delay(1200);
    }
  });
