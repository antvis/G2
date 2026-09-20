import { camelCase, escapeHtml, kebabCase } from '../../../src/utils/string';

describe('string', () => {
  it('escapeHtml should escape HTML text and attribute characters', () => {
    expect(escapeHtml(`<img title="'&">`)).toBe(
      '&lt;img title=&quot;&#39;&amp;&quot;&gt;',
    );
  });

  it('escapeHtml should stringify non-string values', () => {
    expect(escapeHtml(0 as any)).toBe('0');
    expect(escapeHtml(null as any)).toBe('null');
  });

  it('should convert string cases', () => {
    expect(camelCase('foo-bar')).toBe('fooBar');
    expect(kebabCase('fooBar')).toBe('foo-bar');
  });
});
