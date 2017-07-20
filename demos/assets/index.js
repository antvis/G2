(() => {
  const {
    plotById,
    plotsByGeometry
  } = GLOBAL_DATA
  const {
    assignIn
  } = _

  const $code = $('#code')

  const htmlEditor = CodeMirror.fromTextArea($code[0], {
    mode: "text/html",
    extraKeys: {
      'Ctrl-Space': 'autocomplete'
    },
    foldGutter: true,
    gutters: [
      'CodeMirror-linenumbers',
      'CodeMirror-foldgutter'
    ],
    lineNumbers: true,
    lineWrapping: false
  })

  const $docContainer = $('.doc-container')
  const $chartPanel = $('.chart-panel')

  function loadPlotPage(id) {
    $docContainer.show()
    const plot = plotById[id]
    $.get(plot.path, data => {
      $chartPanel.html('<iframe class="chart-frame" frameborder="0"></iframe>')
      $chartPanel.find('iframe')[0].contentWindow.document.write(data)
      htmlEditor.getDoc().setValue(data)
    })
  }

  routie({
    '/:id': id => {
      loadPlotPage(id)
    },
    'geometry-:geometry': geometry => {
      $docContainer.hide()
    },
  })
})();
