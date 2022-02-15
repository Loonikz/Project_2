export function getLocalStorage() {
  const theme = window.localStorage.getItem('theme');
  if (theme === 'dark') document.body.classList.add('dark');
  const selectedLang = (<HTMLSelectElement>document.getElementById('dropdownLanguage')).value;
  const lang = window.localStorage.getItem('lang');
}
