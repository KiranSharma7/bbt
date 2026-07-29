/* ---------------------------------------------------------------------------
   BBT Thailand — "Find Your Way In" filter engine.

   One engine, five layouts. Each variation page supplies its own card markup in
   a <template data-finder-template> and its own controls; the engine only wires
   behaviour to data attributes, so no layout is baked in here.

   Markup contract
   ---------------
   [data-finder]                     section root
     data-finder-cover-path="..."    prefix for cover filenames
     data-finder-lead                first result gets .is-lead
     data-finder-tilt                alternate .is-tilt-left / .is-tilt-right
     data-finder-page-size="9"       paginate; omit the attribute for one page

   [data-filter-group="language"]    a group of single-select controls
     button[data-filter-value="thai"]        value "all" clears the group
     [data-filter-count]                     live count, written by the engine

   input[data-finder-search]         optional free-text search
   select[data-finder-sort]          optional sort: default|price-asc|price-desc|title
   [data-finder-results]             where cards are written
   template[data-finder-template]    card markup, hooks marked [data-field]
   [data-finder-count]               result count (put aria-live="polite" on it)
   [data-finder-noun]                "book" / "books", pluralised by the engine
   [data-finder-empty]               empty state, toggled with [hidden]
   [data-finder-chips]               active-filter chips
   template[data-finder-chip-template]
   [data-finder-clear]               reset button

   Pagination (only read when data-finder-page-size is set)
   [data-finder-pagination]          wrapper, toggled with [hidden]
   [data-finder-pages]               where page buttons are written
   template[data-finder-page-template]     hook marked [data-page-label]
   [data-finder-prev] [data-finder-next]   step buttons, disabled at the ends
   [data-finder-range]               "1–9 of 27", written by the engine

   Card fields: cover, title, price, status, language, topic, note, index.
--------------------------------------------------------------------------- */

(function () {
  'use strict';

  var LANGUAGES = window.BBT_LANGUAGES || [];
  var TOPICS = window.BBT_TOPICS || [];
  var CATALOG = window.BBT_CATALOG || [];

  var STATUS_LABEL = {
    available: 'In stock',
    preorder: 'Pre-order',
    pending: 'Price pending'
  };

  var reduceMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false };

  function labelFor(list, value) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].value === value) return list[i].label;
    }
    return value;
  }

  function languageLabel(value) { return labelFor(LANGUAGES, value); }
  function topicLabel(value) { return labelFor(TOPICS, value); }

  function formatPrice(book) {
    return book.price === null ? '—' : '฿' + book.price;
  }

  /* Thai first, then the language order declared in the catalogue, then the
     order the books were authored in. Matches the "Thai leads" product rule. */
  function defaultRank(book) {
    for (var i = 0; i < LANGUAGES.length; i++) {
      if (LANGUAGES[i].value === book.language) return i;
    }
    return LANGUAGES.length;
  }

  function Finder(root) {
    this.root = root;
    this.coverPath = root.getAttribute('data-finder-cover-path') || '../assets/books/';
    this.wantsLead = root.hasAttribute('data-finder-lead');
    this.wantsTilt = root.hasAttribute('data-finder-tilt');

    this.results = root.querySelector('[data-finder-results]');
    this.template = root.querySelector('[data-finder-template]');
    this.countEl = root.querySelector('[data-finder-count]');
    this.nounEl = root.querySelector('[data-finder-noun]');
    this.emptyEl = root.querySelector('[data-finder-empty]');
    this.chipsEl = root.querySelector('[data-finder-chips]');
    this.chipTemplate = root.querySelector('[data-finder-chip-template]');
    /* A page may offer more than one reset — one by the counter and one inside
       the empty state — so every occurrence is wired, not just the first. */
    this.clearEls = root.querySelectorAll('[data-finder-clear]');
    this.searchEl = root.querySelector('[data-finder-search]');
    this.sortEl = root.querySelector('[data-finder-sort]');

    /* Pagination is opt-in: without the attribute the engine behaves exactly as
       it did before and every result is painted in one go. */
    this.pageSize = parseInt(root.getAttribute('data-finder-page-size'), 10) || 0;
    this.page = 1;
    this.pagerEl = root.querySelector('[data-finder-pagination]');
    this.pagesEl = root.querySelector('[data-finder-pages]');
    this.pageTemplate = root.querySelector('[data-finder-page-template]');
    this.prevEl = root.querySelector('[data-finder-prev]');
    this.nextEl = root.querySelector('[data-finder-next]');
    this.rangeEl = root.querySelector('[data-finder-range]');

    this.groups = {};
    this.state = { search: '', sort: 'default' };

    this.collectGroups();
    this.bind();
    this.render();
  }

  Finder.prototype.collectGroups = function () {
    var self = this;
    var nodes = this.root.querySelectorAll('[data-filter-group]');

    Array.prototype.forEach.call(nodes, function (groupEl) {
      var name = groupEl.getAttribute('data-filter-group');
      var buttons = groupEl.querySelectorAll('[data-filter-value]');
      var active = 'all';

      Array.prototype.forEach.call(buttons, function (button) {
        if (button.getAttribute('aria-pressed') === 'true') {
          active = button.getAttribute('data-filter-value');
        }
      });

      self.groups[name] = { el: groupEl, buttons: buttons };
      self.state[name] = active;
    });
  };

  Finder.prototype.bind = function () {
    var self = this;

    Object.keys(this.groups).forEach(function (name) {
      Array.prototype.forEach.call(self.groups[name].buttons, function (button) {
        button.addEventListener('click', function (event) {
          event.preventDefault();
          var value = button.getAttribute('data-filter-value');
          /* Clicking the active filter releases it, so every group can be
             cleared without hunting for a separate "All" control. */
          self.state[name] = self.state[name] === value ? 'all' : value;
          self.update();
        });
      });
    });

    if (this.searchEl) {
      this.searchEl.addEventListener('input', function () {
        self.state.search = self.searchEl.value.trim().toLowerCase();
        self.update();
      });
      /* Enter in a lone search field would submit and reload the page. */
      this.searchEl.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') event.preventDefault();
      });
    }

    if (this.sortEl) {
      this.sortEl.addEventListener('change', function () {
        self.state.sort = self.sortEl.value;
        self.update();
      });
    }

    Array.prototype.forEach.call(this.clearEls, function (el) {
      el.addEventListener('click', function (event) {
        event.preventDefault();
        self.reset();
        el.blur();
      });
    });

    if (this.prevEl) {
      this.prevEl.addEventListener('click', function (event) {
        event.preventDefault();
        self.goTo(self.page - 1);
      });
    }

    if (this.nextEl) {
      this.nextEl.addEventListener('click', function (event) {
        event.preventDefault();
        self.goTo(self.page + 1);
      });
    }
  };

  /* Any change to what is being shown starts the list again from the top: page
     three of the old result set means nothing against the new one. */
  Finder.prototype.update = function () {
    this.page = 1;
    this.render();
  };

  Finder.prototype.goTo = function (page) {
    var pages = this.pageCount(this.select().length);
    if (page < 1 || page > pages || page === this.page) return;

    this.page = page;
    this.render();
    /* Turning a page must not leave the reader looking at the foot of the
       previous one. Only pull the list back into view if it has scrolled off
       the top — never yank a reader who can already see the first row. */
    if (this.results) {
      var top = this.results.getBoundingClientRect().top;
      if (top < 0) {
        this.results.scrollIntoView({
          behavior: reduceMotion.matches ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    }
  };

  Finder.prototype.pageCount = function (total) {
    if (!this.pageSize) return 1;
    return Math.max(1, Math.ceil(total / this.pageSize));
  };

  Finder.prototype.reset = function () {
    var self = this;
    Object.keys(this.groups).forEach(function (name) { self.state[name] = 'all'; });
    this.state.search = '';
    if (this.searchEl) this.searchEl.value = '';
    this.update();
  };

  /* Matches everything except the named group, which is what per-option counts
     need: "how many results would I get if I picked this one instead?" */
  Finder.prototype.matches = function (book, skipGroup) {
    var self = this;
    var ok = true;

    Object.keys(this.groups).forEach(function (name) {
      if (name === skipGroup) return;
      var wanted = self.state[name];
      if (wanted !== 'all' && book[name] !== wanted) ok = false;
    });

    if (ok && this.state.search) {
      var haystack = (book.title + ' ' + (book.note || '') + ' ' +
        languageLabel(book.language) + ' ' + topicLabel(book.topic)).toLowerCase();
      if (haystack.indexOf(this.state.search) === -1) ok = false;
    }

    return ok;
  };

  Finder.prototype.select = function () {
    var self = this;
    var list = CATALOG.filter(function (book) { return self.matches(book); });
    var sort = this.state.sort;

    list.sort(function (a, b) {
      if (sort === 'title') return a.title.localeCompare(b.title);

      if (sort === 'price-asc' || sort === 'price-desc') {
        /* Books without a confirmed price sort to the back either way rather
           than pretending to be free or expensive. */
        if (a.price === null && b.price === null) return 0;
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return sort === 'price-asc' ? a.price - b.price : b.price - a.price;
      }

      var rank = defaultRank(a) - defaultRank(b);
      if (rank !== 0) return rank;
      return CATALOG.indexOf(a) - CATALOG.indexOf(b);
    });

    return list;
  };

  Finder.prototype.render = function () {
    var books = this.select();
    var pages = this.pageCount(books.length);

    /* A filter can shrink the list under the page the reader was on. */
    if (this.page > pages) this.page = pages;

    var offset = this.pageSize ? (this.page - 1) * this.pageSize : 0;
    var slice = this.pageSize ? books.slice(offset, offset + this.pageSize) : books;

    this.paint(slice, books.length, offset);
    this.paintPager(books.length, pages, offset, slice.length);
    this.paintControls();
    this.paintChips();
  };

  Finder.prototype.paint = function (books, total, offset) {
    if (!this.results || !this.template) return;

    var self = this;
    var frag = document.createDocumentFragment();

    books.forEach(function (book, index) {
      frag.appendChild(self.card(book, offset + index));
    });

    this.results.textContent = '';
    this.results.appendChild(frag);

    /* The tally always reports the whole result set, not the page: a reader
       filtering by language wants to know how many books exist in it. */
    if (this.emptyEl) this.emptyEl.hidden = total > 0;
    if (this.countEl) this.countEl.textContent = String(total);
    if (this.nounEl) this.nounEl.textContent = total === 1 ? 'book' : 'books';

    if (!reduceMotion.matches) this.settle();
  };

  Finder.prototype.paintPager = function (total, pages, offset, shown) {
    if (!this.pagerEl) return;

    /* One page is no page: the controls disappear rather than sitting there
       greyed out. */
    this.pagerEl.hidden = pages < 2;

    if (this.rangeEl) {
      this.rangeEl.textContent = shown
        ? (offset + 1) + '–' + (offset + shown) + ' of ' + total
        : '';
    }

    if (this.prevEl) this.prevEl.disabled = this.page <= 1;
    if (this.nextEl) this.nextEl.disabled = this.page >= pages;

    if (!this.pagesEl || !this.pageTemplate) return;

    this.pagesEl.textContent = '';

    /* Every page gets a number. The catalogue is small enough that a windowed
       "1 … 7 8 9 … 24" range would be more machinery than the problem needs;
       add one here if the list ever passes ten pages. */
    for (var i = 1; i <= pages; i++) {
      this.pagesEl.appendChild(this.pageButton(i));
    }
  };

  Finder.prototype.pageButton = function (page) {
    var self = this;
    var node = this.pageTemplate.content.firstElementChild.cloneNode(true);
    var labelEl = node.querySelector('[data-page-label]') || node;
    var isCurrent = page === this.page;

    labelEl.textContent = page < 10 ? '0' + page : String(page);
    node.setAttribute('aria-label', 'Page ' + page);
    node.classList.toggle('is-current', isCurrent);

    if (isCurrent) {
      node.setAttribute('aria-current', 'page');
    } else {
      node.removeAttribute('aria-current');
    }

    node.addEventListener('click', function (event) {
      event.preventDefault();
      self.goTo(page);
    });

    return node;
  };

  Finder.prototype.card = function (book, index) {
    var node = this.template.content.firstElementChild.cloneNode(true);

    node.setAttribute('data-status', book.status);
    node.setAttribute('data-language', book.language);
    node.setAttribute('data-topic', book.topic);

    if (this.wantsLead && index === 0) node.classList.add('is-lead');
    if (this.wantsTilt) {
      node.classList.add(index % 2 === 0 ? 'is-tilt-left' : 'is-tilt-right');
    }

    var fields = node.querySelectorAll('[data-field]');
    var self = this;

    Array.prototype.forEach.call(fields, function (el) {
      switch (el.getAttribute('data-field')) {
        case 'cover':
          el.setAttribute('src', self.coverPath + book.cover);
          /* The cover stays decorative (alt="") in every layout: the title is
             always adjacent text, so naming the image here would make a screen
             reader announce the same book twice. */
          el.setAttribute('alt', '');
          el.setAttribute('loading', 'lazy');
          el.setAttribute('decoding', 'async');
          break;
        case 'title':
          el.textContent = book.title;
          break;
        case 'price':
          el.textContent = formatPrice(book);
          break;
        case 'status':
          el.textContent = STATUS_LABEL[book.status] || '';
          break;
        case 'language':
          el.textContent = languageLabel(book.language);
          break;
        case 'topic':
          el.textContent = topicLabel(book.topic);
          break;
        case 'note':
          el.textContent = book.note || '';
          break;
        case 'index':
          el.textContent = index + 1 < 10 ? '0' + (index + 1) : String(index + 1);
          break;
      }
    });

    return node;
  };

  /* One authored moment: results arrive settled rather than popping in. */
  Finder.prototype.settle = function () {
    var cards = this.results.children;
    Array.prototype.forEach.call(cards, function (card, index) {
      card.classList.add('is-arriving');
      card.style.transitionDelay = Math.min(index * 18, 220) + 'ms';
    });

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        Array.prototype.forEach.call(cards, function (card) {
          card.classList.remove('is-arriving');
        });
      });
    });
  };

  Finder.prototype.paintControls = function () {
    var self = this;

    Object.keys(this.groups).forEach(function (name) {
      Array.prototype.forEach.call(self.groups[name].buttons, function (button) {
        var value = button.getAttribute('data-filter-value');
        var isActive = self.state[name] === value ||
          (value === 'all' && self.state[name] === 'all');

        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        button.classList.toggle('is-active', isActive);

        var countEl = button.querySelector('[data-filter-count]');
        if (!countEl) return;

        var count = CATALOG.filter(function (book) {
          if (value !== 'all' && book[name] !== value) return false;
          return self.matches(book, name);
        }).length;

        countEl.textContent = String(count);
        button.classList.toggle('is-empty', count === 0);
      });
    });

    var showClear = this.hasActiveFilters();
    Array.prototype.forEach.call(this.clearEls, function (el) {
      /* The reset inside the empty state is shown by that state, not by
         whether filters are on — hiding it there would leave a dead end. */
      if (!el.hasAttribute('data-finder-clear-always')) el.hidden = !showClear;
    });
  };

  /* Chips borrow whatever text the active button already shows (ledger, spine,
     or counter markup all name their option the same way) instead of a
     hardcoded language/topic branch, so a page can add a new filter group —
     price, availability — without touching this file. */
  Finder.prototype.optionLabel = function (name, value) {
    var group = this.groups[name];
    var button = null;

    if (group) {
      Array.prototype.some.call(group.buttons, function (candidate) {
        if (candidate.getAttribute('data-filter-value') === value) {
          button = candidate;
          return true;
        }
        return false;
      });
    }

    if (button) {
      var nameEl = button.querySelector('.ledger__opt-name, .spine__name, .counter__opt-name');
      var text = (nameEl || button).textContent.trim();
      if (text) return text;
    }

    if (name === 'language') return languageLabel(value);
    if (name === 'topic') return topicLabel(value);
    return value;
  };

  Finder.prototype.hasActiveFilters = function () {
    var self = this;
    var any = Object.keys(this.groups).some(function (name) {
      return self.state[name] !== 'all';
    });
    return any || Boolean(this.state.search);
  };

  Finder.prototype.paintChips = function () {
    if (!this.chipsEl || !this.chipTemplate) return;

    var self = this;
    var chips = [];

    Object.keys(this.groups).forEach(function (name) {
      var value = self.state[name];
      if (value === 'all') return;
      chips.push({
        group: name,
        value: value,
        label: self.optionLabel(name, value)
      });
    });

    if (this.state.search) {
      chips.push({ group: 'search', value: '', label: '“' + this.state.search + '”' });
    }

    this.chipsEl.textContent = '';

    chips.forEach(function (chip) {
      var node = self.chipTemplate.content.firstElementChild.cloneNode(true);
      var labelEl = node.querySelector('[data-chip-label]') || node;
      labelEl.textContent = chip.label;
      node.setAttribute('aria-label', 'Remove filter: ' + chip.label);

      node.addEventListener('click', function (event) {
        event.preventDefault();
        if (chip.group === 'search') {
          self.state.search = '';
          if (self.searchEl) self.searchEl.value = '';
        } else {
          self.state[chip.group] = 'all';
        }
        self.update();
      });

      self.chipsEl.appendChild(node);
    });

    this.chipsEl.hidden = chips.length === 0;
  };

  function boot() {
    var roots = document.querySelectorAll('[data-finder]');
    Array.prototype.forEach.call(roots, function (root) { new Finder(root); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
