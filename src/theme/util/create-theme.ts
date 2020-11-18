import { deepMix } from '@antv/util';
import { createThemeByStyleSheet } from './create-by-style-sheet';
import { createLightStyleSheet } from '../style-sheet/light';
import { LooseObject, StyleSheetCfg } from '../../interface';

interface ThemeCfg extends LooseObject {
  styleSheet?: StyleSheetCfg;
}

export function createTheme(themeCfg: ThemeCfg): LooseObject {
  const { styleSheet: styleSheetCfg = {}, ...themeObject } = themeCfg;

  // ① 创建样式表 (默认创建 light 的样式表)
  const styleSheet = createLightStyleSheet(styleSheetCfg);
  // ② 创建主题
  return deepMix({}, createThemeByStyleSheet(styleSheet), themeObject);
}
