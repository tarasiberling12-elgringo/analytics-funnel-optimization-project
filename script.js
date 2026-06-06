amplitude.track('Landing Page Viewed');
const overlay = document.getElementById('modalOverlay');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalForm = document.getElementById('modalForm');
const modalClose = document.getElementById('modalClose');

function openModal(type) {
  if (type === 'demo') {
    modalTitle.textContent = 'Request a Demo';
    modalDesc.textContent = "Tell us a bit about yourself and we'll set up a personalized demo.";
  } else {
    modalTitle.textContent = 'Sign Up Free';
    modalDesc.textContent = 'Create your free account and start your 14-day trial today.';
  }
  modalForm.innerHTML = `
    <input type="text" placeholder="Your name" required />
    <input type="email" placeholder="Work email" required />
    <button type="submit" class="btn btn-primary" style="width:100%">
      ${type === 'demo' ? 'Request My Demo' : 'Get Started Free'}
    </button>
  `;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('signUpBtn').addEventListener('click', () => {
  amplitude.track('Sign Up Clicked');
  openModal('signup');
});
document.getElementById('demoBtn').addEventListener('click', () => {
  amplitude.track('Request Demo Clicked');
  openModal('demo');
});
document.getElementById('navSignUp').addEventListener('click', () => openModal('signup'));
document.getElementById('signUpBtn2').addEventListener('click', () => openModal('signup'));
document.getElementById('demoBtn').addEventListener('click', () => {
  amplitude.track('Request Demo Clicked');
  openModal('demo');
});
modalClose.addEventListener('click', closeModal);

overlay.addEventListener('click', function (e) {
  if (e.target === overlay) closeModal();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});

modalForm.addEventListener('submit', function (e) {
  e.preventDefault();
  modal.innerHTML = `
    <div class="modal-success">
      <div class="check">✅</div>
      <h3>You're in!</h3>
      <p>Thanks for signing up. Check your inbox — we'll be in touch shortly.</p>
    </div>
  `;
  setTimeout(closeModal, 2800);
});

const cards = document.querySelectorAll('.feature-card');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 80}ms`;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

cards.forEach((card) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
  observer.observe(card);
});
document.getElementById('signUpBtn').addEventListener('click', () => {
  window.amplitude.track('Sign Up Button Click');
});

document.getElementById('demoBtn').addEventListener('click', () => {
  window.amplitude.track('Request Demo Button Click');
});

document.getElementById('signUpBtn2').addEventListener('click', () => {
  window.amplitude.track('Sign Up Button Click');
});

document.getElementById('demoBtn2').addEventListener('click', () => {
  window.amplitude.track('Request Demo Button Click');
});
