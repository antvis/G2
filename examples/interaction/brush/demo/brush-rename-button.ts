import { Chart, registerAction, getActionClass } from '@antv/g2';

const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
];
const chart = new Chart({
    container: 'container',
    autoFit: true,
    height: 500,
});

const ButtonAction = getActionClass('reset-button');

// 重新设置按钮文案
registerAction('reset-button', ButtonAction, {
    name: 'reset-button',
    text: '重置',
});

chart.data(data);
chart.tooltip({
    showMarkers: false
});
chart.interaction('brush');
chart.interval().position('year*value');
chart.render();