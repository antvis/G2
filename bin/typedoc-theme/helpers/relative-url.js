const MarkdownTheme = require('typedoc-plugin-markdown/dist/theme');

function relativeURL(url) {
  return MarkdownTheme.default.handlebars.helpers.relativeURL(url).replace('.zh.md', '');
}
exports.relativeURL = relativeURL;
