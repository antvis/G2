import * as _ from '@antv/util';
import Element from '../../base';
import ElementLabels from './components/base';
import IntervalElementLabels from './components/interval';
import PieElementLabels from './components/pie';
import PolarElementLabels from './components/polar';
import { getElementLabels, registerElementLabels } from './components/factory';

export {
  getElementLabels,
  registerElementLabels,
  ElementLabels,
};

export default class LabelController {
  readonly element: Element = null;
  private labelsContainer: ElementLabels = null;

  constructor(element) {
    this.element = element;
  }

  private _createLabelsContainer() {
    const element = this.element;
    const elementType = element.get('type');
    const coord = element.get('coord');
    const labelOptions = element.get('labelOptions');
    const Ctor = this._getElementLabelsConstructor(labelOptions.labelType, coord.type, elementType);
    const container = element.get('container');
    const scales = _.map(element.get('labelOptions').fields, (field: string) => element.createScale(field));
    const labelsContainer = container.addGroup(Ctor, {
      labelOptions: _.mix(
        {
          scales,
        },
        labelOptions,
      ),
      coord,
      element,
      elementType,
      theme: element.get('theme'),
      visible: element.get('visible'),
    });
    this.labelsContainer = labelsContainer;
  }

  public addLabels(points, shapes) {
    this._createLabelsContainer();
    this.labelsContainer.showLabels(points, shapes);

    const labelsGroup = this.labelsContainer.get('labelsGroup');
    return labelsGroup.get('children'); // 返回创建的 labels
  }

  public changeVisible(visible) {
    this.labelsContainer && this.labelsContainer.set('visible', visible);
  }

  public clear() {
    const labelsContainer = this.labelsContainer;
    labelsContainer && !labelsContainer.destroyed && labelsContainer.remove();
  }

  private _getElementLabelsConstructor(labelType: string, coordType: string, elementType: string) {
    let type = labelType || 'base';
    if (coordType === 'polar' && type === 'base') {
      type = 'polar';
    } else if (coordType === 'theta' && type === 'base') { // pie chart
      type = 'pie';
    } else if ((elementType === 'interval' || elementType === 'polygon') && type === 'base') { // bar
      type = 'interval';
    }
    return getElementLabels(type);
  }
}

registerElementLabels('base', ElementLabels);
registerElementLabels('interval', IntervalElementLabels);
registerElementLabels('pie', PieElementLabels);
registerElementLabels('polar', PolarElementLabels);
