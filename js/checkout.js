/* ---------------------------------------------------------------------------
   BBT Thailand — checkout page behaviour.

   Shared by all three checkout variations. Three jobs:
     1. Render the order summary from the same cart store the cart pages use.
     2. Drive the step accordion, if the variation has one.
     3. Answer the submit honestly.

   TRUTH NOTES — read before wiring this to a real backend.
   - Nothing here takes money, reserves stock, or contacts a server. Payment
     methods and the gateway are undecided (PRODUCT.md), so the payment step is
     a marked placeholder and the submit says plainly that no order was placed.
   - No delivery price, carrier, or arrival date is shown, because none is
     confirmed. Shipping reads as an open question on every surface.
   - The "save my details" checkbox records an intent only. Account rules are
     undecided, so it creates nothing.

   Hooks a page provides:
     [data-checkout-lines]   list that receives the summary lines
     [data-checkout-form]    the form element
     [data-checkout-notice]  the honest post-submit notice
     [data-step]             an accordion section (variation 03 only)
--------------------------------------------------------------------------- */

(function () {
  'use strict';

  var Cart = window.BBTCart;
  if (!Cart) return;

  /* --- Order summary ------------------------------------------------------ */

  var lines = document.querySelector('[data-checkout-lines]');
  var coverPath = lines ? (lines.getAttribute('data-cart-cover-path') || 'assets/books/') : '';

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach(function (node) {
      node.textContent = value;
    });
  }

  function summaryLine(item) {
    return '' +
      '<li class="sum-line' + (item.isPreorder ? ' is-preorder' : '') + '">' +
        '<span class="sum-line__cover">' +
          '<img src="' + coverPath + item.cover + '" alt="" loading="lazy">' +
          '<span class="sum-line__qty" aria-hidden="true">' + item.qty + '</span>' +
        '</span>' +
        '<span class="sum-line__id">' +
          '<span class="sum-line__title">' + item.title + '</span>' +
          '<span class="sum-line__meta">' +
            item.languageLabel + ' edition · ' +
            (item.isPreorder ? 'Pre-order' : 'In stock') + ' · ' +
            'Qty ' + item.qty +
          '</span>' +
        '</span>' +
        '<span class="sum-line__value">' + Cart.baht(item.lineTotal) + '</span>' +
      '</li>';
  }

  function renderSummary() {
    var items = Cart.items();
    var books = Cart.count();
    var sum = Cart.subtotal();

    if (lines) lines.innerHTML = items.map(summaryLine).join('');

    setText('[data-cart-subtotal]', Cart.baht(sum));
    setText('[data-cart-tally]', books + ' ' + Cart.plural(books, 'book', 'books'));
    setText('[data-cart-payable]', Cart.baht(sum) + ' + shipping');

    document.querySelectorAll('[data-cart-preorder]').forEach(function (node) {
      node.hidden = !Cart.hasPreorder();
    });

    /* An empty cart cannot be checked out. Say so rather than showing a form
       that would submit nothing. */
    document.querySelectorAll('[data-checkout-body]').forEach(function (node) {
      node.hidden = items.length === 0;
    });
    document.querySelectorAll('[data-checkout-empty]').forEach(function (node) {
      node.hidden = items.length > 0;
    });
  }

  /* --- Step accordion (variation 03) --------------------------------------
     Sections carry data-step. Exactly one is open. Opening a later step marks
     the earlier ones done, which is what lets a done step collapse to its
     summary line with an Edit control. */

  var steps = Array.prototype.slice.call(document.querySelectorAll('[data-step]'));

  function openStep(target) {
    var reached = false;

    steps.forEach(function (step) {
      var isTarget = step === target;
      if (isTarget) reached = true;

      step.classList.toggle('is-open', isTarget);
      step.classList.toggle('is-done', !isTarget && !reached);

      var panel = step.querySelector('[data-step-panel]');
      if (panel) panel.hidden = !isTarget;

      var edit = step.querySelector('[data-step-edit]');
      if (edit) edit.hidden = isTarget || reached;
    });

    if (target && typeof target.scrollIntoView === 'function') {
      target.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  steps.forEach(function (step) {
    var edit = step.querySelector('[data-step-edit]');
    if (edit) {
      edit.addEventListener('click', function () {
        openStep(step);
      });
    }

    var next = step.querySelector('[data-step-next]');
    if (next) {
      next.addEventListener('click', function () {
        var index = steps.indexOf(step);
        openStep(steps[index + 1] || step);
      });
    }
  });

  if (steps.length) openStep(steps[0]);

  /* --- Submit -------------------------------------------------------------- */

  var form = document.querySelector('[data-checkout-form]');
  var notice = document.querySelector('[data-checkout-notice]');
  var ORDER_KEY = 'bbt.checkout.preview.v1';

  function previewReference() {
    return 'BBT-' + String(Date.now()).slice(-4);
  }

  function selectedText(field) {
    if (!field || field.selectedIndex < 0) return '';
    return field.options[field.selectedIndex].text;
  }

  function savePreview() {
    var formData = new FormData(form);
    var country = selectedText(form.elements.country);
    var city = String(formData.get('city') || '').trim();
    var destination = [city, country].filter(Boolean).join(', ') || 'Address not provided';
    var snapshot = {
      reference: previewReference(),
      destination: destination,
      subtotal: Cart.subtotal(),
      items: Cart.items(),
      createdAt: new Date().toISOString()
    };

    try {
      window.sessionStorage.setItem(ORDER_KEY, JSON.stringify(snapshot));
      return true;
    } catch (error) {
      return false;
    }
  }

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (savePreview()) {
        window.location.href = 'thank-you.html';
        return;
      }

      if (notice) {
        notice.hidden = false;
        notice.setAttribute('tabindex', '-1');
        notice.focus();
        notice.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    });
  }

  Cart.subscribe(renderSummary);
  renderSummary();
}());
