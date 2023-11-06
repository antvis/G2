import { Light, Dark, Classic, ClassicDark, Academy } from '../../../src';

describe('theme', () => {
  it('should export all the themes', () => {
    expect(Light).toBeDefined();
    expect(Dark).toBeDefined();
    expect(Classic).toBeDefined();
    expect(ClassicDark).toBeDefined();
    expect(Academy).toBeDefined();
  });
});
