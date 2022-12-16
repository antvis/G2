// copy text to clipboard

import { message } from 'antd';

// ref: https://stackoverflow.com/a/46118025
export function copyToClipboard(text: string) {
  const dummy = document.createElement('input');
  document.body.appendChild(dummy);
  dummy.setAttribute('value', text);
  dummy.select();
  const result = document.execCommand('copy');
  document.body.removeChild(dummy);
  if (result) {
    message.success('复制成功');
  }
}
