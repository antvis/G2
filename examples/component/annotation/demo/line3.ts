import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/income.json')
  .then((res) => res.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });
    chart.data(data);
    chart.scale('rate', {
      nice: true,
    });
    chart.line().position('time*rate');

    // 开始添加辅助标记
    chart.annotation().dataMarker({
      position: ['2014-01-03', 6.763],
      text: {
        content: '受稳健货币政策影响，协定存款利\n率居高不下,收益率达6.763%',
        style: {
          textAlign: 'left',
        },
      },
    });
    chart.annotation().dataMarker({
      position: ['2013-05-31', 2.093],
      text: {
        content: '余额宝刚成立时，并未达到目标资产\n配置，故收益率较低',
        style: {
          textAlign: 'left',
        },
      },
    });
    chart.annotation().dataMarker({
      position: ['2016-09-04', 2.321],
      autoAdjust: false,
      text: {
        content: '受积极货币政策的影响，收益率降\n到历史最低2.321%',
        style: {
          textAlign: 'right',
        },
      },
      line: {
        length: 30,
      },
    });
    chart.annotation().dataRegion({
      start: ['2016-12-02', 2.517],
      end: ['2017-03-24', 3.83],
      text: {
        content: '',
      },
      lineLength: 50,
    });
    chart.annotation().dataMarker({
      position: ['2016-12-02', 2.517],
      autoAdjust: false,
      text: {
        content: '宏观经济过热，受稳健货币政策影\n响，余额宝收益率随之上升',
        style: {
          textAlign: 'left',
        },
      },
      line: {
        length: 130,
      },
    });
    chart.annotation().dataMarker({
      position: ['2017-03-24', 3.83],
      text: null,
      line: {
        length: 50,
      },
    });

    chart.render();
  });
