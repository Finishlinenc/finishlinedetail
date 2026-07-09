const defaultWorkItems = [
  {
    image: 'assets/porsche-hero.jpg',
    alt: 'White Porsche after exterior detailing',
    badge: 'Exterior Finish'
  },
  {
    image: 'assets/porsche-side.jpg',
    alt: 'Side view of white Porsche after detailing',
    badge: 'Exterior Finish'
  },
  {
    image: 'assets/engine-before.jpg',
    alt: 'Engine bay before detailing',
    badge: 'Engine Bay Before'
  },
  {
    image: 'assets/engine-after.jpg',
    alt: 'Engine bay after detailing',
    badge: 'Engine Bay After'
  },
  {
    image: 'assets/trim-before.jpg',
    alt: 'Faded exterior trim before restoration',
    badge: 'Trim Before'
  },
  {
    image: 'assets/trim-after.jpg',
    alt: 'Exterior trim after restoration',
    badge: 'Trim After'
  }
];

const bellaItems = [
  {
    image: 'assets/bella.jpg',
    alt: 'Bella with an onion',
    badge: 'Bella Mode'
  },
  {
    image: 'assets/bella-car.jpg',
    alt: 'Bella riding in the car with Frankie',
    badge: 'Bella Mode'
  },
  {
    image: 'assets/bella-closeup.jpg',
    alt: 'Close-up of Bella with her tongue out',
    badge: 'Bella Mode'
  }
];

let currentItems = defaultWorkItems.slice();
let current = 0;
let bellaModeActive = false;
const imageFrame = document.querySelector('.work-image-frame');
const workImage = document.getElementById('workImage');
const workBadge = document.getElementById('workBadge');

function showWork(index) {
  current = (index + currentItems.length) % currentItems.length;
  const item = currentItems[current];
  imageFrame.classList.add('is-changing');
  setTimeout(() => {
    workImage.src = item.image;
    workImage.alt = item.alt;
    workBadge.textContent = item.badge;
    imageFrame.classList.remove('is-changing');
  }, 130);
}

document.getElementById('nextWork').addEventListener('click', () => showWork(current + 1));
document.getElementById('prevWork').addEventListener('click', () => showWork(current - 1));


const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalBadge = document.getElementById('modalBadge');
const modalClose = document.getElementById('modalClose');

function openImageModal() {
  modalImage.src = workImage.src;
  modalImage.alt = workImage.alt;
  modalBadge.textContent = workBadge.textContent;
  imageModal.classList.add('open');
  imageModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeImageModal() {
  imageModal.classList.remove('open');
  imageModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

workImage.addEventListener('click', openImageModal);
modalClose.addEventListener('click', closeImageModal);
imageModal.addEventListener('click', (event) => {
  if (event.target === imageModal) closeImageModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && imageModal.classList.contains('open')) closeImageModal();
});

const quoteForm = document.getElementById('quoteForm');
quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(quoteForm);
  const name = data.get('name') || '';
  const contact = data.get('contact') || '';
  const vehicle = data.get('vehicle') || '';
  const location = data.get('location') || '';
  const message = data.get('message') || '';
  const subject = encodeURIComponent('Finish Line Detail Quote Request');
  const body = encodeURIComponent(`Name: ${name}
Contact: ${contact}
Vehicle: ${vehicle}

Message:
${message}`);
  window.location.href = `mailto:finishlinedetail@proton.me?subject=${subject}&body=${body}`;
});

let typed = '';
const secret = 'finishlinebella';

document.addEventListener('keydown', (event) => {
  const target = event.target;
  const tag = target && target.tagName ? target.tagName.toUpperCase() : '';
  const isTypingField = tag === 'INPUT' || tag === 'TEXTAREA' || target?.isContentEditable;

  // Do not trigger while a customer is filling out the quote form.
  if (isTypingField) return;

  // Only track normal typed characters.
  if (typeof event.key !== 'string' || event.key.length !== 1) return;

  typed = (typed + event.key.toLowerCase()).slice(-secret.length);

  if (typed === secret) {
    typed = '';
    activateBella();
  }
}, true);

function activateBella() {
  currentItems = bellaItems.slice();
  current = 0;
  bellaModeActive = true;
  document.body.classList.add('bella-mode');

  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);

  showWork(0);

  const workSection = document.getElementById('work');
  if (workSection) {
    workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
