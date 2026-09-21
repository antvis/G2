import { ColorPicker as AntColorPicker } from 'antd';
import { BUILT_COLORS } from './builtins';

export function ColorPicker({ value, onChange, style = {}, className = '' }) {
  function onColorChange(newColor) {
    const { r, g, b, a } = newColor.toRgb();
    const alpha =
      value === undefined || value.toLowerCase() === 'transparent' ? 1 : a;
    onChange(`rgba(${r}, ${g}, ${b}, ${alpha})`);
  }

  return (
    <AntColorPicker
      value={value}
      onChangeComplete={onColorChange}
      presets={[{ label: '预设颜色', colors: BUILT_COLORS }]}
    >
      <button
        type="button"
        aria-label="选择颜色"
        className={className}
        style={{
          border: 0,
          padding: 0,
          background: value,
          display: 'inline-block',
          height: '100%',
          cursor: 'pointer',
          ...style,
        }}
      />
    </AntColorPicker>
  );
}
