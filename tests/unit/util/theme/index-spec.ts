import { antvDark } from '../../../../src/theme/style-sheet/dark';
import { createThemeByStylesheet } from '../../../../src/util/theme';

describe('createThemeByStylesheet', () => {
  it('get dark theme', () => {
    const theme = createThemeByStylesheet(antvDark);

    expect(theme.defaultColor).toBe('#5B8FF9');
    expect(theme.geometries).toBeDefined();
  });
});
