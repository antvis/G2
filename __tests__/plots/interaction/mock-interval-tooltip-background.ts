import { G2Spec, ELEMENT_CLASS_NAME } from '../../../src';
import { step } from './utils';

export function mockIntervalTooltipBackground(): G2Spec {
  return {
    type: 'view',
    data: [
      {
        Date: '2023年10月',
        value: '20231031',
        TotalHc: 1716,
        CurrentHc: 5496,
        HcPercent: 320.28,
        start: 5496,
        end: 5384,
        BackgroundCurrentHc: 5496,
      },
      {
        Date: '2023年11月',
        value: '20231130',
        TotalHc: 1739,
        CurrentHc: 5524,
        HcPercent: 317.65,
        start: 5524,
        end: 5412,
        BackgroundCurrentHc: 5524,
      },
      {
        Date: '2023年12月',
        value: '20231211',
        TotalHc: 1746,
        CurrentHc: 5505,
        HcPercent: 315.29,
        start: 5505,
        end: 5393,
        BackgroundCurrentHc: 5505,
      },
      {
        Date: '2023年06月',
        value: '20230630',
        TotalHc: 1724,
        CurrentHc: 5580,
        HcPercent: 323.67,
        start: 5580,
        end: 5468,
        BackgroundCurrentHc: 5580,
      },
      {
        Date: '2023年09月',
        value: '20230930',
        TotalHc: 1716,
        CurrentHc: 5485,
        HcPercent: 319.64,
        start: 5485,
        end: 5373,
        BackgroundCurrentHc: 5485,
      },
      {
        Date: '2023年08月',
        value: '20230831',
        TotalHc: 1710,
        CurrentHc: 5486,
        HcPercent: 320.82,
        start: 5486,
        end: 5374,
        BackgroundCurrentHc: 5486,
      },
      {
        Date: '2023年07月',
        value: '20230731',
        TotalHc: 1729,
        CurrentHc: 5580,
        HcPercent: 322.73,
        start: 5580,
        end: 5468,
        BackgroundCurrentHc: 5580,
      },
    ],
    children: [
      {
        type: 'interval',
        encode: {
          x: 'Date',
          y: 'BackgroundCurrentHc',
          color: () => 'TotalHc',
          series: () => 'TotalHc',
        },
        state: {
          active: {
            backgroundFill: 'red',
            backgroundFillOpacity: 1,
          },
        },
      },
      {
        type: 'interval',
        encode: {
          x: 'Date',
          y: 'CurrentHc',
          color: () => 'CurrentHc',
          series: () => 'CurrentHc',
        },
        state: {
          active: {
            backgroundFill: 'red',
            backgroundFillOpacity: 1,
          },
        },
      },
    ],

    interaction: {
      elementHighlightByColor: {
        background: true,
        backgroundFill: 'red',
      },
    },
  };
}

mockIntervalTooltipBackground.steps = ({ canvas }) => {
  const { document } = canvas;
  const elements = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const [e1] = elements;
  return [step(e1, 'pointerover')];
};
