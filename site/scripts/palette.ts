/** 用于生成 site/docs/spec/palette.zh.md 内支持的色板内容 */
(async () => {
  const d3ScaleChromatic = await eval('import("d3-scale-chromatic")');

  function createPalette(colors, gradient) {
    const width = 600;
    if (!gradient) {
      return `<div style="display:flex;width:${width}px;height:20px"><style>div{flex-grow:1}</style>${colors
        .map((color) => `<div style="background:${color}"></div>`)
        .join('')}</div>`;
    }
    const gradientString = colors
      .map((color, i) => `${color} ${(i * 100) / (colors.length - 1)}%`)
      .join(',');
    return `<div style="display:flex;width:${width}px;height:20px"><style>div{flex-grow:1}</style><div style="background:linear-gradient(to right,${gradientString})"></div></div>`;
  }

  function createPalettes() {
    const palettes = [
      'schemeAccent',
      'schemeBlues',
      'schemeBrBG',
      'schemeBuGn',
      'schemeBuPu',
      'schemeCategory10',
      'schemeDark2',
      'schemeGnBu',
      'schemeGreens',
      'schemeGreys',
      'schemeOranges',
      'schemeOrRd',
      'schemePaired',
      'schemePastel1',
      'schemePastel2',
      'schemePiYG',
      'schemePRGn',
      'schemePuBu',
      'schemePuBuGn',
      'schemePuOr',
      'schemePuRd',
      'schemePurples',
      'schemeRdBu',
      'schemeRdGy',
      'schemeRdPu',
      'schemeRdYlBu',
      'schemeRdYlGn',
      'schemeReds',
      'schemeSet1',
      'schemeSet2',
      'schemeSet3',
      'schemeSpectral',
      'schemeTableau10',
      'schemeYlGn',
      'schemeYlGnBu',
      'schemeYlOrBr',
      'schemeYlOrRd',
      'interpolateBlues',
      'interpolateBrBG',
      'interpolateBuGn',
      'interpolateBuPu',
      'interpolateCividis',
      'interpolateCool',
      'interpolateCubehelixDefault',
      'interpolateGnBu',
      'interpolateGreens',
      'interpolateGreys',
      'interpolateInferno',
      'interpolateMagma',
      'interpolateOranges',
      'interpolateOrRd',
      'interpolatePiYG',
      'interpolatePlasma',
      'interpolatePRGn',
      'interpolatePuBu',
      'interpolatePuBuGn',
      'interpolatePuOr',
      'interpolatePuRd',
      'interpolatePurples',
      'interpolateRainbow',
      'interpolateRdBu',
      'interpolateRdGy',
      'interpolateRdPu',
      'interpolateRdYlBu',
      'interpolateRdYlGn',
      'interpolateReds',
      'interpolateSinebow',
      'interpolateSpectral',
      'interpolateTurbo',
      'interpolateViridis',
      'interpolateWarm',
      'interpolateYlGn',
      'interpolateYlGnBu',
      'interpolateYlOrBr',
      'interpolateYlOrRd',
    ];
    const colorSet = palettes.map((name) => {
      let newName = name.replace('interpolate', '').replace('scheme', '');
      newName = newName[0].toLowerCase() + newName.slice(1);
      let colors = [];
      const isGradient =
        name.startsWith('interpolate') ||
        (name.startsWith('scheme') && Array.isArray(d3ScaleChromatic[name][0]));
      if (name.startsWith('scheme')) {
        if (
          d3ScaleChromatic[name] &&
          Array.isArray(d3ScaleChromatic[name].slice(-1)[0])
        )
          colors = d3ScaleChromatic[name].slice(-1)[0];
        else colors = d3ScaleChromatic[name];
      } else if (name.startsWith('interpolate')) {
        const interpolate = d3ScaleChromatic[name];
        colors = new Array(20)
          .fill(0)
          .map((d, index, arr) => interpolate(index / (arr.length - 1)));
      }
      return `### ${newName}\n\n` + `${createPalette(colors, isGradient)}\n\n`;
    });
    return `${colorSet.join('')}`;
  }

  console.log(createPalettes());
})();
