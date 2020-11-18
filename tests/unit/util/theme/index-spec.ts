import { antvDark } from '../../../../src/theme/style-sheet/dark';
import { createThemeByStyleSheet } from '../../../../src/theme/util/create-by-style-sheet';

describe('createThemeByStyleSheet', () => {
  it('get dark theme', () => {
    const theme = createThemeByStyleSheet(antvDark);

    expect(theme.defaultColor).toBe('#5B8FF9');
    expect(theme.geometries).toBeDefined();
  });
});
