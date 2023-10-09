import React from 'react';
import { SketchPicker } from 'react-color';
import { Dropdown } from 'antd';
import { BUILT_COLORS } from './builtins';

export function ColorPicker({ value, onChange, style = {}, className = '' }) {
  function onColorChange(newColor) {
    const {
      rgb: { r, g, b, a },
    } = newColor;
    const alpha =
      value === undefined || value.toLowerCase() === 'transparent' ? 1 : a;
    onChange(`rgba(${r}, ${g}, ${b}, ${alpha})`);
  }

  return (
    <Dropdown
      overlay={
        <SketchPicker
          color={value}
          className="config-color-picker-overlay"
          onChangeComplete={onColorChange}
          presetColors={BUILT_COLORS}
        />
      }
      trigger={['click', 'hover']}
    >
      <span
        className={className}
        style={{
          background: value,
          display: 'inline-block',
          height: '100%',
          cursor: 'pointer',
          ...style,
        }}
      ></span>
    </Dropdown>
  );
}
