const search = document.querySelector('#search');
const entries = [...document.querySelectorAll('.entry')];
const sections = [...document.querySelectorAll('.letter-section')];
const count = document.querySelector('#result-count');
const empty = document.querySelector('#empty');
const letterLinks = [...document.querySelectorAll('.alphabet a')];
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();

function filterEntries() {
  const query = normalize(search.value.trim());
  let shown = 0;
  for (const entry of entries) {
    const match = normalize(entry.dataset.name).includes(query);
    entry.hidden = !match;
    if (match) shown++;
  }
  for (const section of sections) {
    const visible = section.querySelectorAll('.entry:not([hidden])').length;
    section.hidden = visible === 0;
    section.querySelector('.letter-heading span').textContent = `${visible} ${visible === 1 ? 'entry' : 'entries'}`;
  }
  for (const link of letterLinks) {
    const available = !document.getElementById(link.dataset.letter).hidden;
    link.setAttribute('aria-disabled', String(!available));
    link.tabIndex = available ? 0 : -1;
  }
  empty.hidden = shown > 0;
  count.textContent = query ? `${shown} ${shown === 1 ? 'entry' : 'entries'} found` : `Showing all ${shown} entries`;
}
search.addEventListener('input', filterEntries);
document.addEventListener('keydown', event => {
  if (event.key === '/' && document.activeElement !== search && !event.altKey && !event.ctrlKey && !event.metaKey) {
    event.preventDefault(); search.focus();
  }
  if (event.key === 'Escape' && document.activeElement === search) {
    search.value = ''; filterEntries(); search.blur();
  }
});
