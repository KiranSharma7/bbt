/* Small companion for the language-switcher variations. js/product.js already
   owns the price, status, cover swap and the buy button; this only mirrors the
   chosen edition into the display elements a variation adds — the marquee word,
   its native script, and the selected-edition line in the purchase column.
   Loading it on a page without those elements is a no-op, so all three
   variations can share one file. */
(function () {
  const buttons = Array.from(document.querySelectorAll('[data-language]'));
  const targets = [
    ...document.querySelectorAll('[data-active-language]'),
  ].map((node) => ({ node, key: 'language' }));

  targets.push(
    ...[...document.querySelectorAll('[data-active-script]')]
      .map((node) => ({ node, key: 'script' }))
  );

  if (!buttons.length || !targets.length) return;

  /* Matches the 110ms cover swap in product.js, so the word and the book
     change on the same beat instead of one trailing the other. */
  const SWAP_MS = 110;
  let swapTimer;

  function sync(button) {
    targets.forEach(({ node }) => node.classList.add('is-swapping'));

    window.clearTimeout(swapTimer);
    swapTimer = window.setTimeout(() => {
      targets.forEach(({ node, key }) => {
        const value = button.dataset[key];
        if (value) node.textContent = value;
        if (key === 'script' && button.dataset.scriptLang) {
          node.lang = button.dataset.scriptLang;
        }
        node.classList.remove('is-swapping');
      });
    }, SWAP_MS);
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => sync(button));
  });
}());
