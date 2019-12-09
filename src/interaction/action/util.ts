import { each } from '@antv/util';
import { View } from '../../chart';
import Geometry from '../../geometry/base';
import Element from '../../geometry/element/';
import { IInteractionContext, LooseObject } from '../../interface';

export function getCurrentElement(context: IInteractionContext): Element {
  const event = context.event;
  let element;
  const target = event.target;
  if (target) {
    element = target.get('element');
  }
  return element;
}

export function getDelegationObject(context: IInteractionContext): LooseObject {
  const event = context.event;
  const target = event.target;
  let delegationObject;
  if (target) {
    delegationObject = target.get('delegationObject');
  }
  return delegationObject;
}

export function isList(delegationObject: LooseObject): boolean {
  return delegationObject && delegationObject.component && delegationObject.component.isList();
}

export function getElementsByState(view: View, stateName: string): Element[] {
  const geometries = view.geometries;
  let rst: Element[] = [];
  each(geometries, (geom: Geometry) => {
    const elements = geom.getElementsBy((el) => el.hasState(stateName));
    rst = rst.concat(elements);
  });
  return rst;
}

export function getTriggerSource(context: IInteractionContext) {}
