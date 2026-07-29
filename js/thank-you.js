/* Renders the locally captured checkout preview. This is deliberately not an
   order service: it reads sessionStorage or the current cart and never claims
   that payment, stock reservation, or server submission occurred. */

(function () {
  'use strict';

  var Cart = window.BBTCart;
  if (!Cart) return;

  var ORDER_KEY = 'bbt.checkout.preview.v1';
  var lines = document.querySelector('[data-order-lines]');

  function readSnapshot() {
    try {
      var parsed = JSON.parse(window.sessionStorage.getItem(ORDER_KEY) || 'null');
      if (parsed && Array.isArray(parsed.items)) return parsed;
    } catch (error) {
      /* A privacy mode may block sessionStorage; the live cart remains usable. */
    }

    return {
      reference: 'BBT-1048',
      destination: 'Address not provided',
      subtotal: Cart.subtotal(),
      items: Cart.items()
    };
  }

  function setText(selector, value) {
    var node = document.querySelector(selector);
    if (node) node.textContent = value;
  }

  function renderLine(item) {
    var li = document.createElement('li');
    var image = document.createElement('img');
    var copy = document.createElement('div');
    var title = document.createElement('h3');
    var meta = document.createElement('p');

    li.className = 'completion-line';
    image.src = 'assets/books/' + item.cover;
    image.alt = '';
    title.textContent = item.title;
    meta.textContent = 'Quantity ' + item.qty;

    copy.appendChild(title);
    copy.appendChild(meta);
    li.appendChild(image);
    li.appendChild(copy);
    return li;
  }

  function renderEmpty() {
    var li = document.createElement('li');
    var title = document.createElement('h3');
    var copy = document.createElement('p');

    li.className = 'completion-empty';
    title.textContent = 'No checkout preview found';
    copy.textContent = 'Add a book and complete the checkout preview to see its summary here.';
    li.appendChild(title);
    li.appendChild(copy);
    lines.appendChild(li);
  }

  function render() {
    var snapshot = readSnapshot();
    var items = snapshot.items || [];

    setText('[data-order-reference]', snapshot.reference || 'BBT-1048');
    setText('[data-order-total]', Cart.baht(Number(snapshot.subtotal) || 0));
    setText('[data-order-destination]', snapshot.destination || 'Address not provided');

    lines.innerHTML = '';
    if (!items.length) {
      renderEmpty();
      return;
    }

    items.forEach(function (item) {
      lines.appendChild(renderLine(item));
    });
  }

  render();
}());
