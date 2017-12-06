(function () {
  // filtering
  const $query = $('#query');
  function filter() {
    const str = $query.val();
    if (!str) {
      $('.demo-thumbnail').show();
    } else {
      $('.demo-thumbnail').each(function () {
        const $thumbnail = $(this);
        const basename = $thumbnail.data('basename');
        if (basename.indexOf(str) === -1) {
          $thumbnail.hide();
        } else {
          $thumbnail.show();
        }
      });
    }
  }
  $query.on('input', _.debounce(filter));

  // router
  let currentId;
  const $code = $('#code');
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
  });

  const $docContainer = $('#doc-container');
  const $chartPanel = $('#chart-panel');
  const $codePanel = $('#code-panel');

  function syncCode(code) {
    $chartPanel.html('<iframe class="chart-frame" frameborder="0"></iframe>');
    $chartPanel.find('iframe')[0].contentWindow.document.write(code);
    htmlEditor.getDoc().setValue(code);
  }

  routie({
    '/:id': id => {
      $docContainer.show();
      const $htmlCode = $(`#code-${id}`);
      const code = $htmlCode.text();
      syncCode(code)
    },
    '': () => {
      $docContainer.hide();
    }
  });

  // resizable
  $codePanel.resizable({
    handleSelector: '#resize-handler',
    resizeWidthFrom: 'right',
    resizeHeight: false,
    onDragStart() {
      $docContainer.css('pointer-events', 'none');
      $docContainer.css('cursor', 'col-resize');
      $codePanel.find('.CodeMirror-gutter-elt').css('cursor', 'col-resize');
    },
    onDragEnd() {
      $docContainer.css('pointer-events', 'auto');
      $docContainer.css('cursor', 'default');
      $codePanel.find('.CodeMirror-gutter-elt').css('cursor', 'default');
    },
  });

  // copy code
  const BTN_COPY_SELECTOR = '#copy-code';
  const clipboard = new Clipboard(BTN_COPY_SELECTOR, {
    text: () => htmlEditor.getValue(),
  });
  let timer;
  clipboard.on('success', e => {
    e.clearSelection();
    $(BTN_COPY_SELECTOR).text('Succeed!');
    clearTimeout(timer);
    timer = setTimeout(() => {
      $(BTN_COPY_SELECTOR).text('Copy');
    }, 2000);
  });
  clipboard.on('error', e => {
    e.clearSelection();
    $(BTN_COPY_SELECTOR).text('Failed!');
    clearTimeout(timer);
    timer = setTimeout(() => {
      $(BTN_COPY_SELECTOR).text('Copy');
    }, 2000);
  });

  // run code
  $('#execute').on('click', () => {
    syncCode(htmlEditor.getValue());
  });
})();
