describe('template', () => {
  const el = document.createElement('div');
  el.id = 'test-div-id';
  el.innerHTML = 'hello g2';
  document.querySelector('body').appendChild(el);

  test('exports', () => {
    expect(document.querySelector('body div').innerHTML).toBe('hello g2');
  });
});
