
const expect = require('chai').expect;
const Interaction = require('../../../src/interaction/base');
const Chart = require('../../../src/chart/chart');
const G2 = require('../../../src/index');

const div = document.createElement('div');
div.id = 'interaction-base';
document.body.appendChild(div);

const chart = new Chart({
  container: 'interaction-base'
});

describe('interaction base test', () => {
  it('throws error if view is not specified', () => {
    expect(() => {
      new Interaction();
    }).to.throw();
    expect(() => {
      new Interaction({}, chart);
    }).to.not.throw();
  });

  it('cfg', () => {
    const interaction = new Interaction({
      startEvent: 'mousewheel'
    }, chart);
    expect(interaction.startEvent).to.equal('mousewheel');
  });

  it('destroy', () => {
    expect(() => {
      const interaction = new Interaction({
        startEvent: 'mousewheel'
      }, chart);
      interaction.destroy();
    }).to.not.throw();
  });

  it('chart.setInteraction(), etc.', () => {
    const interaction = new Interaction({
      startEvent: 'mousewheel'
    }, chart);
    chart.setInteraction('test', interaction);
    const interactions = chart.getInteractions();
    expect(interactions).to.be.an('object');
    expect(interactions.test).to.eql([ interaction ]);
    chart.clearInteraction();
  });

  it('chart.clearInteraction(), etc.', () => {
    const interaction = new Interaction({
      startEvent: 'mousewheel'
    }, chart);
    chart.setInteraction('test', interaction);
    const interactions = chart.getInteractions();
    expect(interactions).to.be.an('object');
    expect(interactions.test).to.eql([ interaction ]);
    chart.clearInteraction();
    expect(interactions).to.eql({});
  });

  it('G2.registerInteraction(), etc.', () => {
    expect(() => {
      G2.registerInteraction('base', Interaction);
    }).to.not.throw();
    G2.registerInteraction('base', Interaction);
    expect(G2.getInteraction('base')).to.equal(Interaction);
  });
});
