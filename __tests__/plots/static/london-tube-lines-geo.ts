import { feature } from 'topojson';
import { G2Spec } from '../../../src';

export async function londonTubeLineGeo(): Promise<G2Spec> {
  const londonBoroughs = await fetch('data/londonBoroughs.json').then((res) =>
    res.json(),
  );
  const londonCentroids = await fetch('data/londonCentroids.json').then((res) =>
    res.json(),
  );
  const londonTubeLines = await fetch('data/londonTubeLines.json').then((res) =>
    res.json(),
  );
  const london = feature(
    londonBoroughs,
    londonBoroughs.objects.boroughs,
  ).features;
  const line = feature(londonTubeLines, londonTubeLines.objects.line).features;
  return {
    type: 'geoView',
    width: 700,
    height: 500,
    padding: 10,
    children: [
      {
        type: 'geoPath',
        data: london,
        style: {
          fill: 'lightgray',
          stroke: 'white',
          lineWidth: 2,
        },
      },
      {
        type: 'text',
        data: londonCentroids,
        encode: {
          x: 'cx',
          y: 'cy',
          text: (d) => d.name.split(/\W/)[0],
        },
        style: {
          fontSize: 8,
          opacity: 0.6,
        },
      },
      {
        type: 'geoPath',
        data: line,
        encode: {
          color: 'id',
          shape: 'hollow',
        },
        legend: false,
        scale: {
          color: {
            domain: [
              'Bakerloo',
              'Central',
              'Circle',
              'District',
              'DLR',
              'Hammersmith & City',
              'Jubilee',
              'Metropolitan',
              'Northern',
              'Piccadilly',
              'Victoria',
              'Waterloo & City',
            ],
            range: [
              'rgb(137,78,36)',
              'rgb(220,36,30)',
              'rgb(255,206,0)',
              'rgb(1,114,41)',
              'rgb(0,175,173)',
              'rgb(215,153,175)',
              'rgb(106,114,120)',
              'rgb(114,17,84)',
              'rgb(0,0,0)',
              'rgb(0,24,168)',
              'rgb(0,160,226)',
              'rgb(106,187,170)',
            ],
          },
        },
      },
    ],
  };
}
