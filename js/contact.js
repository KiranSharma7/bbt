/* ---------------------------------------------------------------------------
   BBT Thailand — contact page behaviour.

   Shared by all three contact variations. Four jobs:
     1. Publish the shop's contact channels, or say plainly that none is
        published yet.
     2. Route an enquiry: the chosen route decides what the form asks next.
     3. Validate in the reader's language — name the problem and the fix.
     4. Answer the submit honestly.

   TRUTH NOTES — read before wiring this to a real backend.
   - CONTACT_CHANNELS below is empty on purpose. PRODUCT.md lists contact
     channels as explicitly undecided, so nothing here invents an address, a
     Line ID, a phone number, or a reply time. Fill the object in and every
     variation publishes the channel, links it, and drops the "not published
     yet" notice by itself. That is the only edit needed.
   - Nothing here sends a message. There is no endpoint, no mail relay, no
     storage. The submit says exactly that, and offers the reader's own text
     back so nothing they wrote is lost.
   - The book picker reads js/catalog.js. Only the Thai rows carry confirmed
     titles and prices; every other row is preview material. The picker
     therefore offers titles as a convenience, never as a stock claim.

   Hooks a page provides:
     [data-contact-form]      the form element
     [data-route-input]       one radio per route
     [data-route-field="id"]  a field group shown only for that route
     [data-route-echo]        text that names the chosen route
     [data-route-aside]       a per-route note revealed with the fields
     [data-book-list]         datalist that receives the catalogue titles
     [data-contact-notice]    the honest post-submit answer
     [data-channel="email"]   a channel value slot
     [data-channel-open]      the "not published yet" block
     [data-docket]            live reference number (variation 02)
--------------------------------------------------------------------------- */

(function () {
  'use strict';

  /* --- The one thing to fill in ------------------------------------------- */

  /* PLACEHOLDER VALUES — REPLACE BEFORE LAUNCH.
     These are stand-ins so the page can be reviewed with real-looking
     channels. `example.com` is the reserved documentation domain and
     +66 2 000 0000 is a dead number, so neither reaches anybody. Swap both
     for the shop's real address and number; nothing else needs editing. */
  var CONTACT_CHANNELS = {
    email: 'hello@example.com',
    line: null,
    phone: '+66 2 000 0000',
    hours: null
  };

  /* --- Routes -------------------------------------------------------------- */

  var ROUTES = {
    order: 'an order you placed',
    book: 'a book, edition, or language',
    delivery: 'delivery outside Thailand',
    wholesale: 'a bulk or temple order',
    other: 'something else'
  };

  var form = document.querySelector('[data-contact-form]');

  /* --- 1. Channels -------------------------------------------------------- */

  function publishChannels() {
    var published = false;

    Object.keys(CONTACT_CHANNELS).forEach(function (key) {
      var value = CONTACT_CHANNELS[key];
      var slots = document.querySelectorAll('[data-channel="' + key + '"]');
      if (!slots.length) return;

      slots.forEach(function (slot) {
        if (!value) return;

        slot.classList.remove('channel__value--open');
        slot.textContent = '';

        if (key === 'email' || key === 'phone') {
          var link = document.createElement('a');
          link.className = 'channel__link';
          link.href = (key === 'email' ? 'mailto:' : 'tel:') + value;
          link.textContent = value;
          slot.appendChild(link);
        } else {
          slot.textContent = value;
        }
      });

      if (value) published = true;
    });

    document.querySelectorAll('[data-channel-open]').forEach(function (node) {
      node.hidden = published;
    });

    return published;
  }

  var hasChannel = publishChannels();

  /* --- 2. The catalogue-aware book picker --------------------------------- */

  function fillBookList() {
    var list = document.querySelector('[data-book-list]');
    var catalog = window.BBT_CATALOG;
    var languages = window.BBT_LANGUAGES;
    if (!list || !catalog || !languages) return;

    var labels = {};
    languages.forEach(function (lang) {
      labels[lang.value] = lang.label;
    });

    /* Thai editions first, matching the shop's own order, then the rest by
       language. A reader looking for a Thai book should see it at the top of
       the picker without typing. */
    var order = languages.map(function (lang) { return lang.value; });
    var rows = catalog.slice().sort(function (a, b) {
      var byLang = order.indexOf(a.language) - order.indexOf(b.language);
      return byLang !== 0 ? byLang : a.title.localeCompare(b.title);
    });

    list.innerHTML = rows.map(function (book) {
      var value = book.title + ' — ' + labels[book.language] + ' edition';
      return '<option value="' + value + '"></option>';
    }).join('');
  }

  fillBookList();

  if (!form) return;

  /* --- 3. Routing --------------------------------------------------------- */

  var routeInputs = form.querySelectorAll('[data-route-input]');
  var routeFields = form.querySelectorAll('[data-route-field]');
  var routeAsides = form.querySelectorAll('[data-route-aside]');
  var routeEchoes = document.querySelectorAll('[data-route-echo]');

  function currentRoute() {
    var checked = form.querySelector('[data-route-input]:checked');
    return checked ? checked.value : '';
  }

  function applyRoute() {
    var route = currentRoute();

    routeFields.forEach(function (group) {
      var shown = group.getAttribute('data-route-field') === route;
      group.hidden = !shown;

      /* A hidden field must not be validated or submitted. */
      group.querySelectorAll('input, select, textarea').forEach(function (el) {
        el.disabled = !shown;
      });
    });

    routeAsides.forEach(function (aside) {
      aside.hidden = aside.getAttribute('data-route-aside') !== route;
    });

    routeEchoes.forEach(function (node) {
      node.textContent = ROUTES[route] || 'nothing yet';
    });

    form.setAttribute('data-current-route', route);
  }

  routeInputs.forEach(function (input) {
    input.addEventListener('change', applyRoute);
  });

  applyRoute();

  /* --- 4. The message counter -------------------------------------------- */

  var message = form.querySelector('[name="message"]');
  var counter = form.querySelector('[data-message-count]');
  var MESSAGE_MAX = 1200;

  function updateCount() {
    if (!message || !counter) return;
    var left = MESSAGE_MAX - message.value.length;
    counter.textContent = left >= 0
      ? left + ' characters left'
      : Math.abs(left) + ' characters over the limit';
    counter.classList.toggle('is-over', left < 0);
  }

  if (message && counter) {
    message.setAttribute('maxlength', String(MESSAGE_MAX));
    message.addEventListener('input', updateCount);
    updateCount();
  }

  /* --- 5. Validation ------------------------------------------------------
     Errors name the problem and the recovery, in the shop's own words. No
     generic "invalid input" anywhere. */

  var RULES = {
    name: function (value) {
      if (!value.trim()) return 'Add a name, so a reply can be addressed to you.';
      return '';
    },
    email: function (value) {
      if (!value.trim()) return 'Add an email address — it is the only way to reply.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) {
        return 'This address is missing an @ or a domain. Check it and try again.';
      }
      return '';
    },
    route: function () {
      if (!currentRoute()) return 'Choose what this is about, so it reaches the right person.';
      return '';
    },
    message: function (value) {
      if (!value.trim()) return 'Write the question here — even one line is enough.';
      if (value.length > MESSAGE_MAX) {
        return 'Shorten this to ' + MESSAGE_MAX + ' characters, or send the detail in a second message.';
      }
      return '';
    }
  };

  var validateLive = false;

  function errorSlot(name) {
    return form.querySelector('[data-error-for="' + name + '"]');
  }

  function showError(name, text) {
    var slot = errorSlot(name);
    var field = form.querySelector('[name="' + name + '"]');

    if (slot) {
      slot.textContent = text;
      slot.hidden = !text;
    }

    if (field) {
      if (text) {
        field.setAttribute('aria-invalid', 'true');
        if (slot && slot.id) field.setAttribute('aria-describedby', slot.id);
      } else {
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
      }
    }

    if (name === 'route') {
      var group = form.querySelector('[data-route-group]');
      if (group) group.setAttribute('aria-invalid', text ? 'true' : 'false');
    }
  }

  function validateField(name) {
    var field = form.querySelector('[name="' + name + '"]');
    var value = field ? field.value : '';
    var text = RULES[name](value);
    showError(name, text);
    return !text;
  }

  function validateAll() {
    /* Validate in reading order, so focus lands on the first problem the
       reader would meet going down the page. */
    return ['route', 'name', 'email', 'message'].reduce(function (firstBad, name) {
      var ok = validateField(name);
      return firstBad || (ok ? null : name);
    }, null);
  }

  Object.keys(RULES).forEach(function (name) {
    var field = form.querySelector('[name="' + name + '"]');
    if (!field) return;
    field.addEventListener('blur', function () {
      if (validateLive) validateField(name);
    });
    field.addEventListener('input', function () {
      if (validateLive && field.getAttribute('aria-invalid') === 'true') {
        validateField(name);
      }
    });
  });

  routeInputs.forEach(function (input) {
    input.addEventListener('change', function () {
      if (validateLive) validateField('route');
    });
  });

  /* --- 6. The honest answer ---------------------------------------------- */

  var notice = document.querySelector('[data-contact-notice]');

  function reference() {
    /* A local reference the reader can quote back. Generated in the browser,
       stored nowhere, and labelled as such. */
    var now = new Date();
    function pad(n) { return n < 10 ? '0' + n : String(n); }
    return 'BBT-' + now.getFullYear() + pad(now.getMonth() + 1) + pad(now.getDate()) +
      '-' + pad(now.getHours()) + pad(now.getMinutes());
  }

  function renderNotice() {
    if (!notice) return;

    var route = ROUTES[currentRoute()] || 'your message';
    var text = message ? message.value.trim() : '';
    var subject = 'BBT enquiry — ' + route;

    var body =
      '<span class="c-sent__label">Nothing has been sent</span>' +
      '<p>This form is not connected to anything yet. Your message about ' +
      route + ' was <strong>not</strong> delivered, and nothing was saved.</p>';

    if (hasChannel && CONTACT_CHANNELS.email) {
      body +=
        '<p>Use this link to send the same words by email: ' +
        '<a class="channel__link" href="mailto:' +
        CONTACT_CHANNELS.email + '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(text) +
        '">' + CONTACT_CHANNELS.email + '</a>. It opens your mail app with ' +
        'everything already filled in.</p>';
    } else {
      body +=
        '<p>The shop\'s contact channel is not published yet. Copy your words ' +
        'below and keep them; the address appears on this page as soon as it ' +
        'is decided.</p>';
    }

    body +=
      '<dl>' +
        '<dt>Your reference</dt>' +
        '<dd>' + reference() + ' — generated in your browser only</dd>' +
        '<dt>Your message</dt>' +
        '<dd><span class="c-sent__quote">' +
          (text ? text.replace(/[<>&]/g, function (ch) {
            return { '<': '&lt;', '>': '&gt;', '&': '&amp;' }[ch];
          }) : '(empty)') +
        '</span></dd>' +
      '</dl>';

    notice.innerHTML = body;
    notice.hidden = false;
    notice.setAttribute('tabindex', '-1');
    notice.focus();
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    validateLive = true;

    var firstBad = validateAll();

    if (firstBad) {
      if (notice) notice.hidden = true;
      var target = firstBad === 'route'
        ? form.querySelector('[data-route-input]')
        : form.querySelector('[name="' + firstBad + '"]');
      if (target) target.focus();
      return;
    }

    renderNotice();
  });

  /* --- 7. Variation 02's live reference ---------------------------------- */

  document.querySelectorAll('[data-docket]').forEach(function (node) {
    node.textContent = reference();
  });
})();
