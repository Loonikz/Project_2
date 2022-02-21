import { setValueLocalStorage } from './utils';

export function changeTheme(event) {
  const selectedLang = event ? event.target.value : 'light';
  if (selectedLang === 'dark') {
    document.body.classList.add('dark');
    setValueLocalStorage('theme', 'dark');
  } else {
    document.body.classList.remove('dark');
    setValueLocalStorage('theme', 'light');
  }
}
