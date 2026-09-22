const button = document.querySelector('.menu-button');
const nav = document.querySelector('#main-nav');
if (button && nav) {
  button.hidden = false;
  const close = () => { button.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); };
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') { close(); button.focus(); }
  });
  document.addEventListener('click', event => { if (!event.target.closest('.header-inner')) close(); });
  matchMedia('(min-width: 760px)').addEventListener('change', close);
}
