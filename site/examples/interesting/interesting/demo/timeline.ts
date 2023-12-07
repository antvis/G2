import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  paddingLeft: 60,
  paddingRight: 60,
  width: 1000,
  height: 300,
});

const data = [
  {
    year: 1788,
    composition: 'Symphony No. 41 "Jupiter"',
    composer: 'Wolfgang Amadeus Mozart',
    link: 'https://en.wikipedia.org/wiki/Symphony_No._41_(Mozart)',
  },
  {
    year: 1894,
    composition: 'Prelude to the Afternoon of a Faun',
    composer: 'Claude Debussy',
    link: 'https://en.wikipedia.org/wiki/Pr%C3%A9lude_%C3%A0_l%27apr%C3%A8s-midi_d%27un_faune',
  },
  {
    year: 1805,
    composition: 'Symphony No. 3 "Eroica"',
    composer: 'Ludwig van Beethoven',
    link: 'https://en.wikipedia.org/wiki/Symphony_No._3_(Beethoven)',
  },
  {
    year: 1913,
    composition: 'Rite of Spring',
    composer: 'Igor Stravinsky',
    link: 'https://en.wikipedia.org/wiki/The_Rite_of_Spring',
  },
  {
    year: 1741,
    composition: 'Goldberg Variations',
    composer: 'Johann Sebastian Bach',
    link: 'https://en.wikipedia.org/wiki/Goldberg_Variations',
  },
  {
    year: 1881,
    composition: 'Piano Concerto No. 2',
    composer: 'Johannes Brahms',
    link: 'https://en.wikipedia.org/wiki/Piano_Concerto_No._2_(Brahms)',
  },
  {
    year: 1826,
    composition: 'A Midsummer Night\'s Dream "Overture"',
    composer: 'Felix Mendelssohn',
    link: 'https://en.wikipedia.org/wiki/A_Midsummer_Night%27s_Dream_(Mendelssohn)',
  },
];

chart.data(data);

chart
  .line()
  .encode('x', 'year')
  .encode('y', 1)
  .style('lineWidth', 1)
  .style('stroke', '#000')
  .attr('zIndex', 1)
  .label({
    text: 'year',
    dy: (d) => (d.year % 2 === 1 ? 8 : -4),
    textAlign: 'center',
    textBaseline: (d) => (d.year % 2 === 1 ? 'top' : 'bottom'),
  })
  .label({
    text: (d) =>
      d.composition + ` (${d.composer.slice(d.composer.lastIndexOf(' '))})`,
    dy: (d) => (d.year % 2 === 0 ? 28 : -28),
    textAlign: 'center',
    textBaseline: (d) => (d.year % 2 === 0 ? 'top' : 'bottom'),
    wordWrap: true,
    wordWrapWidth: 120,
    connector: true,
  })
  .axis(false);

chart
  .point()
  .encode('x', 'year')
  .encode('y', 1)
  .attr('zIndex', 1)
  .style('lineWidth', 1.5)
  .style('stroke', '#000')
  .style('fill', '#fff');

chart.interaction('tooltip', false);

chart.render();
