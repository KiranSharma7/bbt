/* ---------------------------------------------------------------------------
   BBT Thailand — the cart store.

   One source of truth for what is in the basket, shared by every page and by
   all three cart variations. Classic script, no modules, so the preview pages
   open over file:// exactly like the finder variations do.

   TRUTH NOTES — read before wiring this to a real backend.
   - A book may only enter the cart if catalog.js gives it a numeric price.
     Every non-Thai row is `price: null` / `status: "pending"`, so those cannot
     be bought and this store refuses them. Nothing invents a number.
   - Subtotal is real arithmetic over confirmed Thai prices. There is no total,
     because shipping rates are not confirmed (PRODUCT.md). Any surface that
     wants a total must present it as "subtotal + shipping", never as a figure.
   - Pre-order lines are flagged but carry no charging or fulfilment policy,
     because none has been decided.
--------------------------------------------------------------------------- */

window.BBTCart = (function () {
  'use strict';

  var KEY = 'bbt.cart.v1';
  var MAX_PER_LINE = 12;
  var listeners = [];

  /* localStorage is unavailable in some privacy modes and can throw on write.
     The cart degrades to memory rather than breaking the page. */
  var memory = null;

  function storage() {
    try {
      var probe = '__bbt__';
      window.localStorage.setItem(probe, probe);
      window.localStorage.removeItem(probe);
      return window.localStorage;
    } catch (error) {
      return null;
    }
  }

  var store = storage();

  function readRaw() {
    if (!store) return memory ? memory.slice() : [];

    try {
      var parsed = JSON.parse(store.getItem(KEY) || '[]');
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(function (row) {
        return row && typeof row.id === 'string' && typeof row.qty === 'number';
      });
    } catch (error) {
      return [];
    }
  }

  function writeRaw(rows) {
    memory = rows.slice();
    if (store) {
      try {
        store.setItem(KEY, JSON.stringify(rows));
      } catch (error) {
        /* quota or private mode — memory copy above still holds the cart */
      }
    }
    notify();
  }

  /* --- Catalogue lookup --------------------------------------------------- */

  function catalogue() {
    return window.BBT_CATALOG || [];
  }

  function bookById(id) {
    var all = catalogue();
    for (var i = 0; i < all.length; i += 1) {
      if (all[i].id === id) return all[i];
    }
    return null;
  }

  /* The single gate. No confirmed price means the book is not for sale yet. */
  function isSellable(book) {
    return Boolean(book) && typeof book.price === 'number';
  }

  function languageLabel(value) {
    var languages = window.BBT_LANGUAGES || [];
    for (var i = 0; i < languages.length; i += 1) {
      if (languages[i].value === value) return languages[i].label;
    }
    return value;
  }

  /* --- Reading ------------------------------------------------------------ */

  function items() {
    return readRaw().reduce(function (list, row) {
      var book = bookById(row.id);
      if (!isSellable(book)) return list;

      var qty = clampQty(row.qty);

      list.push({
        id: book.id,
        title: book.title,
        note: book.note,
        cover: book.cover,
        price: book.price,
        status: book.status,
        isPreorder: book.status === 'preorder',
        language: book.language,
        languageLabel: languageLabel(book.language),
        qty: qty,
        lineTotal: book.price * qty
      });

      return list;
    }, []);
  }

  function count() {
    return items().reduce(function (sum, item) {
      return sum + item.qty;
    }, 0);
  }

  function titleCount() {
    return items().length;
  }

  function subtotal() {
    return items().reduce(function (sum, item) {
      return sum + item.lineTotal;
    }, 0);
  }

  function hasPreorder() {
    return items().some(function (item) {
      return item.isPreorder;
    });
  }

  /* --- Writing ------------------------------------------------------------ */

  function clampQty(value) {
    var qty = Math.round(Number(value) || 0);
    return Math.min(MAX_PER_LINE, Math.max(1, qty));
  }

  function add(id, qty) {
    if (!isSellable(bookById(id))) return false;

    var rows = readRaw();
    var wanted = clampQty(qty || 1);
    var found = false;

    rows = rows.map(function (row) {
      if (row.id !== id) return row;
      found = true;
      return { id: row.id, qty: clampQty(row.qty + wanted) };
    });

    if (!found) rows.push({ id: id, qty: wanted });

    writeRaw(rows);
    return true;
  }

  function setQty(id, qty) {
    var next = Math.round(Number(qty) || 0);
    if (next < 1) return remove(id);

    writeRaw(readRaw().map(function (row) {
      return row.id === id ? { id: row.id, qty: clampQty(next) } : row;
    }));
    return true;
  }

  function nudge(id, delta) {
    var rows = readRaw();
    for (var i = 0; i < rows.length; i += 1) {
      if (rows[i].id === id) return setQty(id, rows[i].qty + delta);
    }
    return false;
  }

  function remove(id) {
    writeRaw(readRaw().filter(function (row) {
      return row.id !== id;
    }));
    return true;
  }

  function clear() {
    writeRaw([]);
  }

  /* --- Formatting --------------------------------------------------------- */

  /* Baht, grouped, no decimals. Prices in the catalogue are whole numbers. */
  function baht(amount) {
    return '฿' + Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function plural(value, one, many) {
    return value === 1 ? one : many;
  }

  /* --- Change notification ------------------------------------------------ */

  function subscribe(fn) {
    if (typeof fn === 'function') listeners.push(fn);
    return fn;
  }

  function notify() {
    syncBadges();
    listeners.forEach(function (fn) {
      fn();
    });
  }

  /* Keeps every header cart badge on the page honest after any change. */
  function syncBadges() {
    var total = count();

    document.querySelectorAll('[data-cart-count]').forEach(function (node) {
      node.textContent = String(total);
    });

    document.querySelectorAll('.cart-control').forEach(function (node) {
      node.setAttribute('aria-label', 'Cart, ' + total + ' ' + plural(total, 'item', 'items'));
    });
  }

  /* --- Preview seeding ---------------------------------------------------- */

  /* Reviewing the cart design needs something in the basket to look at.
     Opening cart.html?demo (or checkout.html?demo) fills an empty cart with
     three confirmed Thai titles, one of them a pre-order, so every state on
     the page has something to show. A normal visitor never passes the flag, so
     a real cart always starts empty. Delete this block at launch if you would
     rather it could not be triggered at all. */
  function wantsDemo() {
    if (document.body && document.body.hasAttribute('data-cart-demo')) return true;
    return /(^|[?&])demo(=|&|$)/.test(window.location.search);
  }

  function seedDemo() {
    if (readRaw().length) return;
    writeRaw([
      { id: 'th-bg', qty: 1 },
      { id: 'th-ramayana', qty: 1 },
      { id: 'th-noi', qty: 2 }
    ]);
  }

  function boot() {
    if (wantsDemo()) seedDemo();
    syncBadges();
  }

  /* This script is loaded at the end of <body>, so the body already exists and
     seeding can happen before the renderers first paint. The listener is the
     fallback for a page that loads it in <head> instead. */
  if (document.body) {
    boot();
  } else {
    document.addEventListener('DOMContentLoaded', boot);
  }

  /* Two tabs open on the same shop should not disagree about the basket. */
  window.addEventListener('storage', function (event) {
    if (event.key === KEY) notify();
  });

  return {
    items: items,
    count: count,
    titleCount: titleCount,
    subtotal: subtotal,
    hasPreorder: hasPreorder,
    isSellable: isSellable,
    bookById: bookById,
    add: add,
    setQty: setQty,
    nudge: nudge,
    remove: remove,
    clear: clear,
    baht: baht,
    plural: plural,
    subscribe: subscribe,
    syncBadges: syncBadges,
    MAX_PER_LINE: MAX_PER_LINE
  };
}());
