const $loading = $('#loading');

$loading.hide();

$(document.body).on('click', '.block', function() {
  if ($(this).hasClass('selected')) {
    $(this).removeClass('selected');
  } else {
    $(this).addClass('selected');
  }
});

function JSON_to_URLEncoded(element, key, list) {
  list = list || [];
  if (typeof (element) === 'object') {
    for (const idx in element) {
      JSON_to_URLEncoded(element[idx], key ? key + '[' + idx + ']' : idx, list);
    }
  } else {
    list.push(key + '=' + encodeURIComponent(element));
  }
  return list.join('&');
}

$('#select-and-build').on('click', () => {
  $loading.show();
  const ids = $.map($('.selected.block'), item => $(item).data('index'));
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/bundle', true);
  // xhr.setRequestHeader('Content-type', 'application/json');
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.responseType = 'blob';
  xhr.onreadystatechange = () => { // Call a function when the state changes.
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      // Request finished. Do processing here.
      $loading.hide();
      window.saveAs(xhr.response, 'g2-dist.zip');
    }
  };
  xhr.send(JSON_to_URLEncoded({ ids }));
  // $.ajax({
  //   type: 'POST',
  //   url: '/bundle',
  //   data: { ids },
  //   beforeSend: jqXHR => {
  //     jqXHR.responseType = 'binary';
  //   }
  // }).done(data => {
  //   const binaryData = [];
  //   binaryData.push(data);
  //   window.saveAs(new Blob(binaryData, { type: 'application/zip' }), 'g2-dist.zip');
  // });
});

$('#select-all').on('click', () => {
  $('.block').addClass('selected');
});
$('#cancel-select').on('click', () => {
  $('.selected').removeClass('selected');
});
