const { ProjectReflection, DeclarationReflection, UrlMapping } = require('typedoc');
const { PageEvent } = require('typedoc/dist/lib/output/events');
const Handlebars = require('handlebars');
const { default: MarkdownTheme } = require('typedoc-plugin-markdown/dist/theme');
const { FrontMatterComponent } = require('typedoc-plugin-markdown/dist/components/front-matter.component');

const FILE_EXT = '';

class GatsbyFrontMatter extends FrontMatterComponent {
  /**
   * @param {PageEvent} pageEvent
   */
  getYamlString(pageEvent) {
    const yaml = `---
title: "${this.escapeYAMLString(this.getTitle(pageEvent))}"
---`;
    return yaml;
  }
}

module.exports = class GatsbyMarkdownTheme extends MarkdownTheme {
  /**
   * @param {import('typedoc').Renderer} renderer
   * @param {string} basePath
   */
  constructor(renderer, basePath) {
    super(renderer, basePath);

    this.indexName = 'g2';
    this.fileExt = FILE_EXT;

    renderer.removeComponent('breadcrumbs');
    Handlebars.unregisterHelper('breadcrumbs');
    renderer.addComponent('frontmatter', new GatsbyFrontMatter(renderer));
  }

  /**
   * @param {import('typedoc').Reflection} reflection
   * @param {import('typedoc').Reflection?} relative
   * @param {string} separator
   */
  getUrl(reflection, relative, separator = '') {
    let url = reflection.getAlias();
    // gatsby-source-filesystem doesn't like files beginning with underscore
    url = url.replace(/^_/, '');
    if (reflection.parent && reflection.parent !== relative && !(reflection.parent instanceof ProjectReflection)) {
      url = this.getUrl(reflection.parent, relative, separator) + separator + url;
    }
    return url;
  }

  /**
   *
   * @param {ProjectReflection} project
   */
  getUrls(project) {
    const urls = [];
    const entryPoint = this.getEntryPoint(project);
    const url = this.indexName + this.fileExt;
    entryPoint.url = url;
    urls.push(
      this.application.options.getValue('readme') === 'none'
        ? new UrlMapping(url, entryPoint, 'reflection.hbs')
        : new UrlMapping(url, project, 'index.hbs')
    );
    if (entryPoint.children) {
      entryPoint.children.forEach((child) => {
        if (child instanceof DeclarationReflection) {
          this.buildUrls(child, urls);
        }
      });
    }
    return urls;
  }
};
