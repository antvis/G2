import { registerShapeFactory } from '../base';

const SchemaShapeFactory = registerShapeFactory('schema', {
  defaultShapeType: '', // 'schema' is for some custom shapes, so will not specify defaultShapeType
});

export default SchemaShapeFactory;
