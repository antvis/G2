import { Canvas } from '@antv/g';
import '../../../src';
import View from '../../../src/plot/view';
import { simulate } from 'event-simulate';
import { expect } from 'chai';
import Interaction from '../../../src/interaction/base';
import { registerInteraction, INTERACTION_MAP } from '../../../src/interaction/factory';

const div = document.createElement('div');
div.id = 'interactionTest';
document.body.appendChild(div);

const canvas = new Canvas({
  containerId: 'interactionTest',
  renderer: 'canvas',
  width: 500,
  height: 500,
  pixelRatio: 2,
});

const view = new View({
  canvas,
  container: canvas.addGroup(),
  width: 500,
  height: 500,
  animate: false
});
const data = [
  { a: 1, b: 2 },
  { a: 2, b: 5 },
  { a: 3, b: 4 },
];
view.data(data);

view.render();

describe('interaction', function() {

  class TestInteraction extends Interaction {

    constructor(cfg) {
      super({
        startEvent: 'mousedown',
        processEvent: 'mousemove',
        endEvent: 'mouseup',
        resetEvent: 'dblclick',
        // 自定义参数
        preStartChecker: null,
        startChecker: null,
        afterStartChecker: null,
        preProcessChecker: null,
        processChecker: null,
        afterProcessChecker: null,
        preEndChecker: null,
        endChecker: null,
        afterEndChecker: null,
        preResetChecker: null,
        resetChecker: null,
        afterResetChecker: null,
        ...cfg,
      });
    }

    preStart() {
      this.preStartChecker = 'prestart';
    }

    start() {
      this.startChecker = 'onstart';
    }

    afterStart() {
      this.afterStartChecker = 'afterstart';
    }

    preProcess() {
      this.preProcessChecker = 'preprocess';
    }

    process() {
      this.processChecker = 'onprocess';
    }

    afterProcess() {
      this.afterProcessChecker = 'afterprocess';
    }

    preEnd() {
      this.preEndChecker = 'preend';
    }

    end() {
      this.endChecker = 'onend';
    }

    afterEnd() {
      this.afterEndChecker = 'afterend';
    }

    preReset() {
      this.preResetChecker = 'prereset';
    }

    reset() {
      this.resetChecker = 'onreset';
    }

    afterReset() {
      this.afterResetChecker = 'afterreset';
    }

  }

  it('register interaction', function() {
    registerInteraction('test', TestInteraction);
    expect(INTERACTION_MAP).to.have.property('test');
  });

  it('bind event', function() {
    view.interaction('test');
    const bbox = canvas.get('el').getBoundingClientRect();
    simulate(canvas.get('el'), 'mousedown', {
      clientY: bbox.top + 50,
      clientX: bbox.left + 50,
    });
    const interaction = view.get('interactions').test;
    expect(interaction.preStartChecker).to.be.equal('prestart');
    expect(interaction.startChecker).to.be.equal('onstart');
    expect(interaction.afterStartChecker).to.be.equal('afterstart');

    simulate(canvas.get('el'), 'mousemove', {
      clientY: bbox.top + 100,
      clientX: bbox.left + 100,
    });
    expect(interaction.preProcessChecker).to.be.equal('preprocess');
    expect(interaction.processChecker).to.be.equal('onprocess');
    expect(interaction.afterProcessChecker).to.be.equal('afterprocess');

    simulate(canvas.get('el'), 'mouseup', {
      clientY: bbox.top + 100,
      clientX: bbox.left + 100,
    });
    expect(interaction.preEndChecker).to.be.equal('preend');
    expect(interaction.endChecker).to.be.equal('onend');
    expect(interaction.afterEndChecker).to.be.equal('afterend');

    simulate(canvas.get('el'), 'dblclick', {
      clientY: bbox.top + 20,
      clientX: bbox.left + 20,
    });
    expect(interaction.resetChecker).to.be.equal('onreset');
  });

  it('destroy', function() {
    const interaction = view.get('interactions').test;
    interaction.resetChecker = null;
    interaction.destroy();
    expect(interaction.preResetChecker).to.be.equal('prereset');
    expect(interaction.resetChecker).to.be.equal('onreset');
    expect(interaction.afterResetChecker).to.be.equal('afterreset');
  });

});

describe('view上的interaction方法', function() {

  class Zoom extends Interaction {

    constructor(cfg) {
      super({
        processEvent: 'mousewheel',
        ...cfg
      });
    }

    start() {}

    process() {}

    end() {}

    reset() {}

  }

  registerInteraction('zoom', Zoom);

  it('set interaction', function() {
    view.interaction('zoom', Zoom);
    const interactions = view.get('interactions');
    expect(interactions).to.have.property('zoom');
  });

  it('clearInteraction', function() {
    view.clearInteraction('test');
    const interactions = view.get('interactions');
    expect(interactions).to.not.have.property('test');
  });

  it('clearAllInteraction', function() {
    view.clearAllInteractions();
    const interactions = view.get('interactions');
    expect(interactions).to.be.empty;
  });

  after(function() {
    canvas.destroy();
    document.body.removeChild(div);
  });

});
