import { median } from '@antv/vendor/d3-array';
import { G2Spec } from '../../../src';

const logos = {
  'Manchester City':
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*pm70Tp3nkjIAAAAAAAAAAAAADmJ7AQ/original',
  Tottenham:
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*899_S4FDYfYAAAAAAAAAAAAADmJ7AQ/original',
  Liverpool:
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*KNdAT5c27LgAAAAAAAAAAAAADmJ7AQ/original',
  Arsenal:
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ZT6jSqCnL_wAAAAAAAAAAAAADmJ7AQ/original',
  'Aston Villa':
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*4RH8Sbd839UAAAAAAAAAAAAADmJ7AQ/original',
  Newcastle:
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*y4RSTYq2bxsAAAAAAAAAAAAADmJ7AQ/original',
  Brighton:
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*4CajSonng9EAAAAAAAAAAAAADmJ7AQ/original',
  'Manchester United':
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*h_2xSqpSSlAAAAAAAAAAAAAADmJ7AQ/original',
  Brentford:
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*RGX3Qa4UCdoAAAAAAAAAAAAADmJ7AQ/original',
  'Crystal Palace':
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*jsdGQIbe_JAAAAAAAAAAAAAADmJ7AQ/original',
  'West Ham':
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*G55cT48o14MAAAAAAAAAAAAADmJ7AQ/original',
  'Nottingham Forest':
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*fzUQT65BFaIAAAAAAAAAAAAADmJ7AQ/original',
  Chelsea:
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*kV5gR42tNkQAAAAAAAAAAAAADmJ7AQ/original',
  Wolves:
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ARFRTruznsYAAAAAAAAAAAAADmJ7AQ/original',
  Fulham:
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*KhKYR6_sNRIAAAAAAAAAAAAADmJ7AQ/original',
  Everton:
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*qP4iRY4oPtEAAAAAAAAAAAAADmJ7AQ/original',
  Luton:
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*pA3HTqtRa3IAAAAAAAAAAAAADmJ7AQ/original',
  Bournemouth:
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*e0nBSYk09WwAAAAAAAAAAAAADmJ7AQ/original',
  'Sheffield United':
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*5ElRSIulgjIAAAAAAAAAAAAADmJ7AQ/original',
  Burnley:
    'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*OfezRLcDrH4AAAAAAAAAAAAADmJ7AQ/original',
};

const data = [
  {
    team: 'Manchester City',
    played: 11,
    win: 9,
    draw: 0,
    loss: 2,
    goalsFor: 28,
    goalsAgainst: 8,
    points: 27,
  },
  {
    team: 'Tottenham',
    played: 10,
    win: 8,
    draw: 2,
    loss: 0,
    goalsFor: 22,
    goalsAgainst: 9,
    points: 26,
  },
  {
    team: 'Liverpool',
    played: 11,
    win: 7,
    draw: 3,
    loss: 1,
    goalsFor: 24,
    goalsAgainst: 10,
    points: 24,
  },
  {
    team: 'Arsenal',
    played: 11,
    win: 7,
    draw: 3,
    loss: 1,
    goalsFor: 23,
    goalsAgainst: 9,
    points: 24,
  },
  {
    team: 'Aston Villa',
    played: 11,
    win: 7,
    draw: 1,
    loss: 3,
    goalsFor: 26,
    goalsAgainst: 16,
    points: 22,
  },
  {
    team: 'Newcastle',
    played: 11,
    win: 6,
    draw: 2,
    loss: 3,
    goalsFor: 27,
    goalsAgainst: 11,
    points: 20,
  },
  {
    team: 'Brighton',
    played: 11,
    win: 5,
    draw: 3,
    loss: 3,
    goalsFor: 24,
    goalsAgainst: 20,
    points: 18,
  },
  {
    team: 'Manchester United',
    played: 11,
    win: 6,
    draw: 0,
    loss: 5,
    goalsFor: 12,
    goalsAgainst: 16,
    points: 18,
  },
  {
    team: 'Brentford',
    played: 11,
    win: 4,
    draw: 4,
    loss: 3,
    goalsFor: 19,
    goalsAgainst: 14,
    points: 16,
  },
  {
    team: 'Crystal Palace',
    played: 11,
    win: 4,
    draw: 3,
    loss: 4,
    goalsFor: 10,
    goalsAgainst: 13,
    points: 15,
  },
  {
    team: 'West Ham',
    played: 11,
    win: 4,
    draw: 2,
    loss: 5,
    goalsFor: 18,
    goalsAgainst: 20,
    points: 14,
  },
  {
    team: 'Nottingham Forest',
    played: 11,
    win: 3,
    draw: 4,
    loss: 4,
    goalsFor: 12,
    goalsAgainst: 15,
    points: 13,
  },
  {
    team: 'Chelsea',
    played: 10,
    win: 3,
    draw: 3,
    loss: 4,
    goalsFor: 13,
    goalsAgainst: 11,
    points: 12,
  },
  {
    team: 'Wolves',
    played: 11,
    win: 3,
    draw: 3,
    loss: 5,
    goalsFor: 14,
    goalsAgainst: 19,
    points: 12,
  },
  {
    team: 'Fulham',
    played: 11,
    win: 3,
    draw: 3,
    loss: 5,
    goalsFor: 9,
    goalsAgainst: 17,
    points: 12,
  },
  {
    team: 'Everton',
    played: 11,
    win: 3,
    draw: 2,
    loss: 6,
    goalsFor: 11,
    goalsAgainst: 15,
    points: 11,
  },
  {
    team: 'Luton',
    played: 11,
    win: 1,
    draw: 3,
    loss: 7,
    goalsFor: 10,
    goalsAgainst: 21,
    points: 6,
  },
  {
    team: 'Bournemouth',
    played: 11,
    win: 1,
    draw: 3,
    loss: 7,
    goalsFor: 9,
    goalsAgainst: 27,
    points: 6,
  },
  {
    team: 'Sheffield United',
    played: 11,
    win: 1,
    draw: 1,
    loss: 9,
    goalsFor: 9,
    goalsAgainst: 30,
    points: 4,
  },
  {
    team: 'Burnley',
    played: 11,
    win: 1,
    draw: 1,
    loss: 9,
    goalsFor: 8,
    goalsAgainst: 27,
    points: 4,
  },
];

const goalsForMedian = median(data, (d) => d.goalsFor) as number;
const goalsAgainstMedian = median(data, (d) => d.goalsAgainst) as number;
const goalsForScaleMin = 5;
const goalsForScaleMax = 30;
const goalsAgainstScaleMin = 5;
const goalsAgainstScaleMax = 30;

export function premierLeagueTable(): G2Spec {
  return {
    type: 'view',
    data,
    title: '英超球队进球/失球情况',
    children: [
      {
        type: 'lineX',
        data: [goalsForMedian],
      },
      {
        type: 'lineY',
        data: [goalsAgainstMedian],
        labels: [
          {
            text: '攻守兼备',
            dy: -100,
            textBaseline: 'bottom',
            fontSize: 20,
            fill: '#000',
            fillOpacity: 0.45,
          },
        ],
      },
      {
        type: 'range',
        data: [
          {
            goalsFor: [goalsForMedian, goalsForScaleMax],
            goalsAgainst: [goalsAgainstScaleMin, goalsAgainstMedian],
            region: '1',
          },
          {
            goalsFor: [goalsForScaleMin, goalsForMedian],
            goalsAgainst: [goalsAgainstScaleMin, goalsAgainstMedian],
            region: '2',
          },
          {
            goalsFor: [goalsForScaleMin, goalsForMedian],
            goalsAgainst: [goalsAgainstMedian, goalsAgainstScaleMax],
            region: '3',
          },
          {
            goalsFor: [goalsForMedian, goalsForScaleMax],
            goalsAgainst: [goalsAgainstMedian, goalsAgainstScaleMax],
            region: '4',
          },
        ],
        encode: { x: 'goalsFor', y: 'goalsAgainst' },
        style: {
          fill: (d) =>
            d.region === '1'
              ? 'rgba(0,255,0,0.5)'
              : d.region === '3'
              ? 'rgba(255,0,0,0.5)'
              : 'transparent',
          fillOpacity: 0.2,
        },
        animate: { enter: { type: 'fadeIn' } },
      },
      {
        type: 'image',
        encode: {
          x: 'goalsFor',
          y: 'goalsAgainst',
          src: (d) => logos[d.team],
        },
        scale: {
          y: {
            range: [0, 1],
          },
        },
        style: { stroke: '#bbb', fillOpacity: 0.8 },
        axis: { x: { title: '进球' }, y: { title: '失球' } },
        legend: false,
        tooltip: {
          title: 'team',
          items: [
            { channel: 'x', name: '进球' },
            { channel: 'y', name: '失球' },
          ],
        },
      },
      {
        type: 'image',
        style: {
          src: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*EA6LRoerVjQAAAAAAAAAAAAADmJ7AQ/original',
          x: '90%',
          y: '80%',
          width: 177 * 0.8,
          height: 224 * 0.8,
          opacity: 0.6,
        },
        tooltip: false,
        labels: [
          {
            text: '截至 11.7 日第 11 轮',
            dy: 200,
            textBaseline: 'bottom',
            fontSize: 12,
            fill: '#000',
            fillOpacity: 0.45,
          },
        ],
      },
    ],
  };
}

premierLeagueTable.skip = true;
