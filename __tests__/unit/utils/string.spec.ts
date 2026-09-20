import { camelCase, escapeHtml, kebabCase } from '../../../src/utils/string';

describe('string', () => {
  it('escapeHtml should escape HTML text and attribute characters', () => {
    expect(escapeHtml(`<img title="'&">`)).toBe(
      '&lt;img title=&quot;&#39;&amp;&quot;&gt;',
    );
  });

  it('should convert string cases', () => {
    expect(camelCase('foo-bar')).toBe('fooBar');
    expect(kebabCase('fooBar')).toBe('foo-bar');
  });
});
