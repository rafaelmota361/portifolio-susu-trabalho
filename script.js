const storageKey = 'rafael-mota-theme';
const toggle = document.querySelector('#theme-toggle');
const feedback = document.querySelector('#demo-feedback');
const contactForm = document.querySelector('#contact-form');
const formFeedback = document.querySelector('#form-feedback');

document.body.classList.add('js-enabled');

function applyTheme(theme) {
  const isLight = theme === 'light';
  document.body.classList.toggle('theme-light', isLight);
  document.body.classList.toggle('theme-dark', !isLight);
  toggle.setAttribute('aria-pressed', String(isLight));
  toggle.setAttribute('aria-label', isLight ? 'Ativar tema escuro' : 'Ativar tema claro');
}

const savedTheme = localStorage.getItem(storageKey);
applyTheme(savedTheme === 'light' ? 'light' : 'dark');

toggle.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('theme-light') ? 'dark' : 'light';
  applyTheme(nextTheme);
  localStorage.setItem(storageKey, nextTheme);
});

document.querySelectorAll('[data-demo-link]').forEach((link) => {
  // TROQUE AQUI: depois de definir links reais no index.html, remova este listener demonstrativo.
  link.addEventListener('click', (event) => {
    event.preventDefault();
    feedback.textContent = `Link demonstrativo: adicione o destino de ${link.textContent.trim()} no index.html.`;
  });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  formFeedback.textContent = `Valeu, ${data.get('nome')}! Este envio é demonstrativo.`;
  contactForm.reset();
});

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}
