import {
  MAIN_LAYER_CLASS_NAME,
  LABEL_LAYER_CLASS_NAME,
  ELEMENT_CLASS_NAME,
  VIEW_CLASS_NAME,
  PLOT_CLASS_NAME,
  COMPONENT_CLASS_NAME,
  LABEL_CLASS_NAME,
} from '../../../src';

describe('constant', () => {
  it('has expected constants', () => {
    expect(MAIN_LAYER_CLASS_NAME).toBe('main-layer');
    expect(LABEL_LAYER_CLASS_NAME).toBe('label-layer');
    expect(ELEMENT_CLASS_NAME).toBe('element');
    expect(VIEW_CLASS_NAME).toBe('view');
    expect(PLOT_CLASS_NAME).toBe('plot');
    expect(COMPONENT_CLASS_NAME).toBe('component');
    expect(LABEL_CLASS_NAME).toBe('label');
  });
});
