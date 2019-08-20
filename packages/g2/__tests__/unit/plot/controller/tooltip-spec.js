const expect = require('chai').expect;
import { Canvas } from '@antv/g';
import { Tooltip } from '@antv/component';
import TooltipController from '../../../../src/plot/controller/tooltip';
import View from '../../../../src/plot/view';

describe('Tooltip Controller', () => {
  const div = document.createElement('div');
  div.id = 'plot';
  document.body.appendChild(div);

  const canvas = new Canvas({
    containerId: 'plot',
    renderer: 'canvas',
    width: 600,
    height: 600,
    pixelRatio: 2,
  });
  const view = new View({
    canvas,
    container: canvas.addGroup(),
    width: 600,
    height: 600,
    padding: 30,
  });

  const theme = view.get('theme');

  it('init', () => {
    const tooltipController = new TooltipController({
      view,
      theme,
    });
    expect(tooltipController).to.be.an.instanceOf(TooltipController);
  });
  it('render html type tooltip', () => {
    const tooltipController = new TooltipController({
      view,
      theme,
      options: {
        useHtml: true,
      }
    });

    tooltipController.renderTooltip();
    expect(tooltipController.tooltip).to.be.an.instanceOf(Tooltip.Html);
  });
  it('render canvas type tooltip', () => {
    const tooltipController = new TooltipController({
      view,
      theme,
      options: {
        useHtml: false,
      }
    });
    tooltipController.renderTooltip();
    expect(tooltipController.tooltip).to.be.an.instanceOf(Tooltip.Canvas);
  });
  it('render html type tooltip twice', () => {
    const tooltipController = new TooltipController({
      view,
      theme,
      options: {
        useHtml: true,
      }
    });
    tooltipController.renderTooltip();
    tooltipController.renderTooltip();
    expect(tooltipController.tooltip).to.be.an.instanceOf(Tooltip.Html);
  });
  it('triggerOn mousemove', () => {
    const tooltipController = new TooltipController({
      view,
      theme,
      options: {
        useHtml: true,
        triggerOn: 'mousemove',
      }
    });
    tooltipController.showTooltip({
      x: 100,
      y: 100,
    }, view);
    expect(tooltipController.tooltip).to.be.an.instanceOf(Tooltip.Html);
  });
  it('triggerOn click', () => {
    const tooltipController = new TooltipController({
      view,
      theme,
      options: {
        useHtml: true,
        triggerOn: 'click',
      }
    });
    tooltipController.showTooltip({
      x: 100,
      y: 100,
    }, view);
    expect(tooltipController.tooltip).to.be.an.instanceOf(Tooltip.Html);
  });
  it('triggerOn none', () => {
    const tooltipController = new TooltipController({
      view,
      theme,
      options: {
        useHtml: true,
        triggerOn: 'none',
      }
    });
    tooltipController.showTooltip({
      x: 100,
      y: 100,
    }, view);
    expect(tooltipController.tooltip).to.be.an.instanceOf(Tooltip.Html);
  });

  it('onMouseMove', () => {
    const tooltipController = new TooltipController({
      view,
      theme,
      options: {
        useHtml: true,
        triggerOn: 'none',
      }
    });
    tooltipController.onMouseMove({});
    tooltipController.onMouseMove({
      view,
      x: 100,
      y: 100,
    });
  });

  it('onMouseOut', () => {
    const tooltipController = new TooltipController({
      view,
      theme,
      options: {
        useHtml: true,
        triggerOn: 'none',
      }
    });
    tooltipController.onMouseMove({
      view,
      x: 100,
      y: 100,
    });
    tooltipController.onMouseOut();
  });

  it('onMouseOut in .g2-tooltip', () => {
    const tooltipController = new TooltipController({
      view,
      theme,
      options: {
        useHtml: true,
        triggerOn: 'none',
      }
    });
    tooltipController.showTooltip({
      x: 100,
      y: 100,
    }, view);
    tooltipController.onMouseMove({
      view,
      x: 100,
      y: 100,
    });
    const toElement = document.createElement('div');
    toElement.className = 'g2-tooltip';
    tooltipController.onMouseOut({
      toElement,
    });
  });

  it('onMouseOut in .g2-tooltip', () => {
    const tooltipController = new TooltipController({
      view,
      theme,
      options: {
        useHtml: true,
        triggerOn: 'none',
      }
    });
    tooltipController.showTooltip({
      x: 100,
      y: 100,
    }, view);
    tooltipController.onMouseMove({
      view,
      x: 100,
      y: 100,
    });
    const grandParentElement = document.createElement('div');
    const parentElement = document.createElement('div');
    const toElement = document.createElement('div');
    grandParentElement.className = 'g2-tooltip';
    grandParentElement.appendChild(parentElement);
    parentElement.appendChild(toElement);
    tooltipController.onMouseOut({
      toElement,
    });
  });

  it('show', () => {
    const tooltipController = new TooltipController({
      view,
      theme,
      options: {
        useHtml: true,
      }
    });
    tooltipController.showTooltip({
      x: 100,
      y: 100,
    }, view);
    expect(tooltipController.tooltip).to.be.an.instanceOf(Tooltip.Html);
  });

  it('show twice', () => {
    const tooltipController = new TooltipController({
      view,
      theme,
      options: {
        useHtml: true,
      }
    });
    tooltipController.showTooltip({
      x: 100,
      y: 100,
    }, view);
    expect(tooltipController.tooltip).to.be.an.instanceOf(Tooltip.Html);
  });

  it('invalid show', () => {
    const tooltipController = new TooltipController({
      view,
      theme,
      options: {
        useHtml: true,
      }
    });
    tooltipController.showTooltip();
    expect(tooltipController.tooltip).equal(undefined);
  });

  it('hide', () => {
    const tooltipController = new TooltipController({
      view,
      theme,
      options: {
        useHtml: true,
      }
    });
    tooltipController.showTooltip({
      x: 100,
      y: 100,
    }, view);
    tooltipController.hideTooltip();
    expect(tooltipController.tooltip.get('visible')).equal(false);
  });

  it('clear', () => {
    const tooltipController = new TooltipController({
      view,
      theme,
      options: {
        useHtml: true,
      }
    });
    tooltipController.renderTooltip();
    tooltipController.clear();
    expect(tooltipController.tooltip).equal(null);
  });

  it('unique tooltip items', () => {
    const view = new View({
      canvas,
      // panelRange,
      width: 600,
      height: 600,
      padding: 30,
      container: canvas.addGroup(),
      data: [
        { x: 'a', y: 100, y1: 80 },
        { x: 'b', y: 20, y1: 40 },
        { x: 'c', y: 78, y1: 60 },
      ],
    });
    const theme = view.get('theme');

    const tooltipController = new TooltipController({
      view,
      theme,
      options: {
        useHtml: true,
      }
    });
    view.line().position({
      fields: [ 'x', 'y' ],
    });
    view.point().position({
      fields: [ 'x', 'y1' ],
    });
    view.area().position({
      fields: [ 'x', 'y1' ],
    });
    view.area().position({
      fields: [ 'x', 'y1' ],
    });
    view.render();

    tooltipController.showTooltip({
      x: 100,
      y: 100,
    }, view);

    expect(tooltipController.tooltip.get('items').length).equal(2);
  });
  it('shared false', () => {
    const view = new View({
      canvas,
      // panelRange,
      container: canvas.addGroup(),
      width: 600,
      height: 600,
      padding: 30,
      data: [
        { x: 'a', y: 100, y1: 80 },
        { x: 'b', y: 20, y1: 40 },
        { x: 'c', y: 78, y1: 60 },
      ],
    });
    const theme = view.get('theme');

    const tooltipController = new TooltipController({
      view,
      theme,
      options: {
        useHtml: true,
        shared: false,
      }
    });
    view.line().position({
      fields: [ 'x', 'y' ],
    });
    view.point().position({
      fields: [ 'x', 'y1' ],
    });
    view.area().position({
      fields: [ 'x', 'y1' ],
    });
    view.render();

    tooltipController.showTooltip({
      x: 100,
      y: 100,
    }, view);

    expect(tooltipController.tooltip.get('items').length).equal(1);
  });
  it('show tooltip repeatedly', () => {
    const view = new View({
      canvas,
      // panelRange,
      container: canvas.addGroup(),
      width: 600,
      height: 600,
      padding: 30,
      data: [
        { x: 'a', y: 100, y1: 80 },
        { x: 'b', y: 20, y1: 40 },
        { x: 'c', y: 78, y1: 60 },
      ],
    });
    const theme = view.get('theme');

    const tooltipController = new TooltipController({
      view,
      theme,
      options: {
        useHtml: true,
      }
    });
    view.line().position({
      fields: [ 'x', 'y' ],
    });
    view.point().position({
      fields: [ 'x', 'y1' ],
    });
    view.area().position({
      fields: [ 'x', 'y1' ],
    });
    view.render();

    tooltipController.showTooltip({
      x: 100,
      y: 100,
    }, view);
    tooltipController.showTooltip({
      x: 101,
      y: 100,
    }, view);
    tooltipController.showTooltip({
      x: 101,
      y: 101,
    }, view);

    expect(tooltipController.tooltip.get('items').length).equal(2);
  });
  it('set wrong tooltip title', () => {
    const view = new View({
      canvas,
      // panelRange,
      container: canvas.addGroup(),
      width: 600,
      height: 600,
      padding: 30,
      data: [
        { x: 'a', y: 100, y1: 80 },
        { x: 'b', y: 20, y1: 40 },
        { x: 'c', y: 78, y1: 60 },
      ],
    });
    const theme = view.get('theme');

    const tooltipController = new TooltipController({
      view,
      theme,
      options: {
        useHtml: true,
        title: 'wrong title'
      }
    });
    view.line().position({
      fields: [ 'x', 'y' ],
    });
    view.render();

    tooltipController.showTooltip({
      x: 100,
      y: 100,
    }, view);
    expect(tooltipController.tooltip.get('items').length).equal(1);
  });
  it('showTooltipMarkers', () => {
    const view = new View({
      canvas,
      // panelRange,
      container: canvas.addGroup(),
      width: 600,
      height: 600,
      padding: 30,
      data: [
        { x: 'a', y: 100, y1: 80 },
        { x: 'b', y: 20, y1: 40 },
        { x: 'c', y: 78, y1: 60 },
      ],
    });
    const theme = view.get('theme');

    const tooltipController = new TooltipController({
      view,
      theme,
      options: {
        useHtml: true,
        showTooltipMarkers: false,
      }
    });
    view.line().position({
      fields: [ 'x', 'y' ],
    });
    view.render();

    tooltipController.showTooltip({
      x: 100,
      y: 100,
    }, view);
    expect(tooltipController.tooltip.get('items').length).equal(1);
  });
});
