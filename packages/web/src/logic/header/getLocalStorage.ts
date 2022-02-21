import { getValueLocalStorage } from './utils';

export function getLocalStorage() {
  const theme = getValueLocalStorage('theme');
  if (theme === 'dark') document.body.classList.add('dark');
}
