export function changeTheme(event) {
  const theme = window.localStorage.getItem('theme');
  const selectedLang = event ? event.target.value : 'light';
  if (selectedLang === 'dark') {
    document.body.classList.add('dark');
    window.localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark');
    window.localStorage.setItem('theme', 'light');
  }
}
