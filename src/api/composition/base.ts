import { defineProps } from '../props';
import { Node } from '../node';

@defineProps([{ name: 'on', type: 'event' }])
export class Base<
  Value extends Record<string, any> = Record<string, any>,
  ParentValue extends Record<string, any> = Record<string, any>,
  ChildValue extends Record<string, any> = Record<string, any>,
> extends Node<Value, ParentValue, ChildValue> {
  getView() {}
}
