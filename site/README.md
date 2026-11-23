# G2 website

Use Node.js 22.12 or newer. Install the repository dependencies, then install and start the site:

```sh
pnpm install
cd site
pnpm install
pnpm start
```

The site uses Astro and `@antv/astro-theme-antv`. G2 imports resolve to the repository's `src/index.ts`, so examples use the code being developed.

## Documents

Keep static documents in `docs/**/*.zh.md` and `docs/**/*.en.md`. Use `.mdx` when a document needs a component, and import that component explicitly. Use lowercase, hyphenated filenames for public routes. Chinese and English pages live under `/zh/` and `/en/`.

For a demo used only in one document, keep its source in MDX:

````mdx
import { Demo } from '@antv/astro-theme-antv/components';

<Demo code={`import { Chart } from '@antv/g2';

const chart = new Chart({ container: 'container' });
chart.interval().data([{ name: 'A', value: 10 }]).encode('x', 'name').encode('y', 'value');
chart.render();
`} />
````

`code` is a static JavaScript template literal. Escape backslashes, backticks and `${` as in any template literal; do not interpolate MDX expressions into demo source. Use ordinary fenced code blocks for code that should only be displayed.

Keep examples shared by multiple documents in an adjacent `demos/` TypeScript module and reference them with `<Demo src="manual/introduction/demos/what-is-g2-en-2" />`. `src` is relative to `docs`, without `.ts`; provide either `code` or `src`.

The shared component is exported by `@antv/astro-theme-antv/components`; G2 supplies its package dependency map; data previews use `table` from `@antv/astro-theme-antv/table` without extra configuration. Document demos run in an iframe that is replaced on rerun. Pass the container to `table`, for example `await table(data, document.getElementById('container')!)`. The theme strips TypeScript types and loads the local G2 source as native ES modules and provides source editing, copy, a stable preview height and a 400 ms debounce. Source is present in the initial HTML; JavaScript collapses it by default and reveals the left toolbar on hover/focus. Use `open` for an expanded editor and `height` for the preview viewport.

The document's initial HTML and page-level Markdown both contain complete demo source alongside its explanation. Embedded demos use iframe `srcdoc`; they do not generate individual example pages or source endpoints. Direct HTTP requests do not require executing a preview to obtain source.

Chart discovery and related-chart cards read document frontmatter (`category`, `similar`, `screenshot`) from the Astro content collection. The theme editor lives in `src/theme-editor` and mounts as a React island.

## Examples

Gallery examples remain in `examples/<category>/<group>/demo/`, registered by `meta.json`. Localized group titles and order come from `index.zh.md` and `index.en.md`. The shared theme builds their gallery, source view and isolated preview routes.

`pnpm build` generates the static site in `dist`. Deployment copies `site/CNAME` into that directory.

## AI-readable exports

The theme's `content.agentComponents` configuration expands both inline and shared
Demo source into fenced TypeScript in `/<locale>/<document>.md` and
`/llms-full.txt`. `Card` becomes a text link with its description. Interactive-only
components link to the original page; the website rendering is unchanged.
