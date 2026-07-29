/* This page's add-to-cart writes to the shared store in js/cart.js, so the
   header badge, the cart page and the checkout all agree. The store refuses
   any book without a confirmed price, which is why only the Thai edition can
   be added — the other four languages are `price: null` in catalog.js. */
(function () {
  const Cart = window.BBTCart;
  const PRODUCT_ID = 'th-bg';

  const languageButtons = Array.from(document.querySelectorAll('[data-language]'));

  /* Scoped to the offer block on purpose: the edition rows carry their own
     data-price / data-status, so an unscoped query would match a row instead
     of the line it is supposed to update. */
  const price = document.querySelector('.product-offer [data-price]');
  const status = document.querySelector('.product-offer [data-status]');
  const detailLanguage = document.querySelector('[data-detail-language]');
  const productBook = document.querySelector('.product-book');
  const productCover = document.querySelector('[data-product-cover]');
  const addButton = document.querySelector('[data-add-to-cart]');
  const addLabel = document.querySelector('[data-add-label]');
  const quantityOutput = document.querySelector('[data-quantity]');

  let quantity = 1;
  let coverSwapTimer;
  let addLabelTimer;

  languageButtons.forEach((button) => {
    const preload = new Image();
    preload.src = button.dataset.cover;
  });

  function selectLanguage(button) {
    const language = button.dataset.language;
    const isThai = language === 'Thai';
    const coverPath = button.dataset.cover;

    languageButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });

    price.textContent = button.dataset.price;
    price.classList.toggle('is-pending', !isThai);
    status.textContent = button.dataset.status;
    status.classList.toggle('is-pending', !isThai);
    detailLanguage.textContent = language;
    addButton.disabled = !isThai;
    addLabel.textContent = isThai ? 'Add to cart' : 'Ordering soon';

    window.clearTimeout(coverSwapTimer);
    productBook.classList.add('is-changing');
    coverSwapTimer = window.setTimeout(() => {
      productCover.src = coverPath;
      productCover.alt = button.dataset.coverAlt;
      window.requestAnimationFrame(() => productBook.classList.remove('is-changing'));
    }, 110);
  }

  languageButtons.forEach((button) => {
    button.addEventListener('click', () => selectLanguage(button));
  });

  document.querySelectorAll('[data-quantity-change]').forEach((button) => {
    button.addEventListener('click', () => {
      const change = Number(button.dataset.quantityChange);
      quantity = Math.min(12, Math.max(1, quantity + change));
      quantityOutput.textContent = String(quantity);
    });
  });

  addButton.addEventListener('click', () => {
    if (addButton.disabled) return;

    /* The store owns the badge and the aria-label on every cart control, so
       this handler only has to report back on the button itself. */
    if (!Cart || !Cart.add(PRODUCT_ID, quantity)) return;

    addLabel.textContent = quantity === 1 ? 'Added to cart' : `${quantity} added to cart`;

    window.clearTimeout(addLabelTimer);
    addLabelTimer = window.setTimeout(() => {
      addLabel.textContent = 'Add to cart';
    }, 1600);
  });
}());
