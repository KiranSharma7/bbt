/* ---------------------------------------------------------------------------
   BBT Thailand — preview catalogue for the "Find Your Way In" section.
   Classic script, no modules, so the variation pages open over file:// too.

   TRUTH NOTES — read before wiring this to a real backend.
   - Thai rows carry the confirmed prices and availability from
     docs/BBT-Thailand-Website-Idea.md §3. Those seven are real.
   - Every non-Thai row is preview material. BBT publishes in these languages
     (confirmed), but the specific titles, prices and stock are not confirmed,
     so `price` is null and `status` is "pending". Nothing invents a number.
   - `cover` always points at an English-edition scan in assets/books/. These
     must never be presented as Thai artwork; each variation carries a visible
     note saying so.
--------------------------------------------------------------------------- */

window.BBT_LANGUAGES = [
  { value: 'thai', label: 'Thai' },
  { value: 'english', label: 'English' },
  { value: 'nepali', label: 'Nepali' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'russian', label: 'Russian' }
];

window.BBT_TOPICS = [
  { value: 'self', label: 'Self & Consciousness', short: 'Self' },
  { value: 'yoga', label: 'Yoga & Meditation', short: 'Yoga' },
  { value: 'karma', label: 'Karma & Reincarnation', short: 'Karma' },
  { value: 'stories', label: 'Sacred Stories', short: 'Stories' },
  { value: 'wisdom', label: 'Spiritual Wisdom', short: 'Wisdom' },
  { value: 'questions', label: "Life's Big Questions", short: 'Questions' }
];

window.BBT_CATALOG = [
  /* --- Thai: confirmed prices and availability (docs §3) ------------------ */
  {
    id: 'th-bg',
    title: 'Bhagavad-gita As It Is',
    language: 'thai',
    topic: 'self',
    cover: 'en-bg.jpeg',
    price: 990,
    status: 'available',
    note: 'The complete edition'
  },
  {
    id: 'th-bg-pocket',
    title: 'Pocket Bhagavad-gita',
    language: 'thai',
    topic: 'self',
    cover: 'en-bg.jpeg',
    price: 590,
    status: 'available',
    note: 'Where most readers begin'
  },
  {
    id: 'th-kb',
    title: 'Krishna Book',
    language: 'thai',
    topic: 'stories',
    cover: 'en-kb.jpeg',
    price: 490,
    status: 'available',
    note: 'The Supreme Personality of Godhead'
  },
  {
    id: 'th-ramayana',
    title: 'Ramayana',
    language: 'thai',
    topic: 'stories',
    cover: 'en-rkd.jpeg',
    price: 490,
    status: 'preorder',
    note: 'Retold by Krishna Dharma'
  },
  {
    id: 'th-nod',
    title: 'The Nectar of Devotion',
    language: 'thai',
    topic: 'yoga',
    cover: 'en-nod.jpeg',
    price: 89,
    status: 'available',
    note: 'The science of bhakti-yoga'
  },
  {
    id: 'th-noi',
    title: 'The Nectar of Instruction',
    language: 'thai',
    topic: 'yoga',
    cover: 'en-noi.jpeg',
    price: 89,
    status: 'available',
    note: 'Eleven verses of practice'
  },
  {
    id: 'th-iso',
    title: 'Sri Isopanisad',
    language: 'thai',
    topic: 'wisdom',
    cover: 'en-iso.jpeg',
    price: 89,
    status: 'available',
    note: 'Eighteen mantras'
  },

  /* --- English: real titles and covers, prices not yet confirmed ---------- */
  {
    id: 'en-ssr',
    title: 'The Science of Self-Realization',
    language: 'english',
    topic: 'self',
    cover: 'en-ssr.jpeg',
    price: null,
    status: 'pending',
    note: 'Essays and interviews'
  },
  {
    id: 'en-bbd',
    title: 'Beyond Birth and Death',
    language: 'english',
    topic: 'karma',
    cover: 'en-bbd.jpeg',
    price: null,
    status: 'pending',
    note: 'What happens after this life'
  },
  {
    id: 'en-sc',
    title: 'A Second Chance',
    language: 'english',
    topic: 'karma',
    cover: 'en-sc.jpeg',
    price: null,
    status: 'pending',
    note: 'The story of a near-death experience'
  },
  {
    id: 'en-pqpa',
    title: 'Perfect Questions, Perfect Answers',
    language: 'english',
    topic: 'questions',
    cover: 'en-pqpa.jpeg',
    price: null,
    status: 'pending',
    note: 'A conversation with a Peace Corps worker'
  },
  {
    id: 'en-josd',
    title: 'The Journey of Self-Discovery',
    language: 'english',
    topic: 'questions',
    cover: 'en-josd.jpeg',
    price: null,
    status: 'pending',
    note: 'Where the search actually leads'
  },
  {
    id: 'en-poy',
    title: 'The Perfection of Yoga',
    language: 'english',
    topic: 'yoga',
    cover: 'en-poy.jpeg',
    price: null,
    status: 'pending',
    note: 'Yoga beyond the posture'
  },
  {
    id: 'en-bhakti',
    title: 'Bhakti: The Art of Eternal Love',
    language: 'english',
    topic: 'yoga',
    cover: 'en-bhakti.jpeg',
    price: null,
    status: 'pending',
    note: 'An introduction to devotion'
  },
  {
    id: 'en-cc-adi',
    title: 'Sri Caitanya-caritamrta, Adi-lila',
    language: 'english',
    topic: 'stories',
    cover: 'en-cc-adi.jpeg',
    price: null,
    status: 'pending',
    note: 'Volume one of the biography'
  },
  {
    id: 'en-sb-1',
    title: 'Srimad-Bhagavatam, Canto 1',
    language: 'english',
    topic: 'stories',
    cover: 'en-sb-1.jpeg',
    price: null,
    status: 'pending',
    note: 'Creation'
  },
  {
    id: 'en-lob',
    title: 'Light of the Bhagavata',
    language: 'english',
    topic: 'wisdom',
    cover: 'en-lob.jpeg',
    price: null,
    status: 'pending',
    note: 'Forty-eight illustrated texts'
  },
  {
    id: 'en-tqk',
    title: 'Teachings of Queen Kunti',
    language: 'english',
    topic: 'wisdom',
    cover: 'en-tqk.jpeg',
    price: null,
    status: 'pending',
    note: 'Prayers of a queen in exile'
  },

  /* --- Nepali, Hindi, Russian: preview rows, nothing confirmed ------------ */
  {
    id: 'np-bg',
    title: 'Bhagavad-gita As It Is',
    language: 'nepali',
    topic: 'self',
    cover: 'en-bg.jpeg',
    price: null,
    status: 'pending',
    note: 'Nepali edition'
  },
  {
    id: 'np-iso',
    title: 'Sri Isopanisad',
    language: 'nepali',
    topic: 'wisdom',
    cover: 'en-iso.jpeg',
    price: null,
    status: 'pending',
    note: 'Nepali edition'
  },
  {
    id: 'np-owk',
    title: 'On the Way to Krishna',
    language: 'nepali',
    topic: 'questions',
    cover: 'en-owk.jpeg',
    price: null,
    status: 'pending',
    note: 'Nepali edition'
  },
  {
    id: 'hi-bg',
    title: 'Bhagavad-gita As It Is',
    language: 'hindi',
    topic: 'self',
    cover: 'en-bg.jpeg',
    price: null,
    status: 'pending',
    note: 'Hindi edition'
  },
  {
    id: 'hi-kb',
    title: 'Krishna Book',
    language: 'hindi',
    topic: 'stories',
    cover: 'en-kb.jpeg',
    price: null,
    status: 'pending',
    note: 'Hindi edition'
  },
  {
    id: 'hi-tlk',
    title: 'Teachings of Lord Kapila',
    language: 'hindi',
    topic: 'yoga',
    cover: 'en-tlk.jpeg',
    price: null,
    status: 'pending',
    note: 'Hindi edition'
  },
  {
    id: 'ru-bg',
    title: 'Bhagavad-gita As It Is',
    language: 'russian',
    topic: 'self',
    cover: 'en-bg.jpeg',
    price: null,
    status: 'pending',
    note: 'Russian edition'
  },
  {
    id: 'ru-nod',
    title: 'The Nectar of Devotion',
    language: 'russian',
    topic: 'yoga',
    cover: 'en-nod.jpeg',
    price: null,
    status: 'pending',
    note: 'Russian edition'
  },
  {
    id: 'ru-bbd',
    title: 'Beyond Birth and Death',
    language: 'russian',
    topic: 'karma',
    cover: 'en-bbd.jpeg',
    price: null,
    status: 'pending',
    note: 'Russian edition'
  }
];

/* Price band, derived rather than authored per row, so the shop pages can
   filter by price without a second source of truth. A null price (nothing
   confirmed yet) gets its own band instead of being forced into a range. */
window.BBT_PRICE_BANDS = [
  { value: 'under-300', label: 'Under ฿300' },
  { value: '300-600', label: '฿300–600' },
  { value: 'over-600', label: 'Over ฿600' },
  { value: 'pending', label: 'Price pending' }
];

window.BBT_CATALOG.forEach(function (book) {
  if (book.price === null) {
    book.priceBand = 'pending';
  } else if (book.price < 300) {
    book.priceBand = 'under-300';
  } else if (book.price <= 600) {
    book.priceBand = '300-600';
  } else {
    book.priceBand = 'over-600';
  }
});
