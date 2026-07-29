/* ---------------------------------------------------------------------------
   BBT Thailand — cart page renderer.

   All three cart variations share this one renderer and this one DOM shape.
   A variation is a variation because of its CSS grid, not because of different
   markup — the same discipline the finder variations follow.

   Hooks a page provides:
     [data-cart-lines]      list that receives the rendered lines
     [data-cart-body]       everything shown only when the cart has books
     [data-cart-empty]      the empty state
     [data-cart-subtotal]   confirmed subtotal in baht
     [data-cart-tally]      "3 books · 2 titles" style summary line
     [data-cart-payable]    the honest "subtotal + shipping" string
     [data-cart-preorder]   note shown only when a pre-order line is present

   Reads the cover path from [data-cart-cover-path] on the list, so the same
   file works from the site root and from variations/.
--------------------------------------------------------------------------- */

(function () {
  'use strict';

  var Cart = window.BBTCart;
  if (!Cart) return;

  var list = document.querySelector('[data-cart-lines]');
  if (!list) return;

  var coverPath = list.getAttribute('data-cart-cover-path') || 'assets/books/';
  var body = document.querySelector('[data-cart-body]');
  var empty = document.querySelector('[data-cart-empty]');

  function pad(index) {
    return (index + 1 < 10 ? '0' : '') + (index + 1);
  }

  function statusLabel(item) {
    return item.isPreorder ? 'Pre-order' : 'In stock';
  }

  function lineMarkup(item, index) {
    var qtyLabel = 'Quantity of ' + item.title + ', ' + item.languageLabel + ' edition';

    return '' +
      '<li class="cart-line' + (item.isPreorder ? ' is-preorder' : '') + '" data-cart-line="' + item.id + '">' +
        '<span class="cart-line__index" aria-hidden="true">' + pad(index) + '</span>' +

        '<span class="cart-line__cover">' +
          '<img src="' + coverPath + item.cover + '" alt="' + item.title +
          ' English cover shown as a temporary reference" loading="lazy">' +
        '</span>' +

        '<span class="cart-line__id">' +
          '<span class="cart-line__edition">' + item.languageLabel + ' edition</span>' +
          '<span class="cart-line__title">' + item.title + '</span>' +
          '<span class="cart-line__note">' + item.note + '</span>' +
          '<span class="cart-line__status">' + statusLabel(item) + '</span>' +
        '</span>' +

        '<span class="cart-line__unit">' +
          '<span class="cart-line__label">Each</span>' +
          '<span class="cart-line__value">' + Cart.baht(item.price) + '</span>' +
        '</span>' +

        '<span class="cart-line__qty">' +
          '<span class="cart-line__label" id="qty-label-' + item.id + '">Quantity</span>' +
          '<span class="qty-control" role="group" aria-labelledby="qty-label-' + item.id + '">' +
            '<button type="button" data-cart-step="-1" aria-label="Remove one from ' + qtyLabel + '">&minus;</button>' +
            '<output aria-live="polite">' + item.qty + '</output>' +
            '<button type="button" data-cart-step="1" aria-label="Add one to ' + qtyLabel + '"' +
              (item.qty >= Cart.MAX_PER_LINE ? ' disabled' : '') + '>+</button>' +
          '</span>' +
        '</span>' +

        '<span class="cart-line__sum">' +
          '<span class="cart-line__label">Line</span>' +
          '<span class="cart-line__value">' + Cart.baht(item.lineTotal) + '</span>' +
        '</span>' +

        '<button class="cart-line__remove" type="button" data-cart-drop ' +
          'aria-label="Remove ' + item.title + ' from cart">' +
          '<span aria-hidden="true">&times;</span>' +
        '</button>' +
      '</li>';
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach(function (node) {
      node.textContent = value;
    });
  }

  function render() {
    var items = Cart.items();
    var books = Cart.count();
    var titles = Cart.titleCount();
    var sum = Cart.subtotal();
    var isEmpty = items.length === 0;

    list.innerHTML = items.map(lineMarkup).join('');

    if (body) body.hidden = isEmpty;
    if (empty) empty.hidden = !isEmpty;

    setText('[data-cart-subtotal]', Cart.baht(sum));
    setText('[data-cart-tally]',
      books + ' ' + Cart.plural(books, 'book', 'books') +
      ' · ' + titles + ' ' + Cart.plural(titles, 'title', 'titles'));

    /* No total is printed anywhere. Shipping is not confirmed, so the payable
       figure stays an addition the customer can see, not a number we invent. */
    setText('[data-cart-payable]', Cart.baht(sum) + ' + shipping');

    document.querySelectorAll('[data-cart-preorder]').forEach(function (node) {
      node.hidden = !Cart.hasPreorder();
    });
  }

  list.addEventListener('click', function (event) {
    var line = event.target.closest('[data-cart-line]');
    if (!line) return;

    var id = line.getAttribute('data-cart-line');
    var step = event.target.closest('[data-cart-step]');

    if (step) {
      Cart.nudge(id, Number(step.getAttribute('data-cart-step')));
      return;
    }

    if (event.target.closest('[data-cart-drop]')) Cart.remove(id);
  });

  document.querySelectorAll('[data-cart-clear]').forEach(function (button) {
    button.addEventListener('click', function () {
      Cart.clear();
    });
  });

  Cart.subscribe(render);
  render();
}());
