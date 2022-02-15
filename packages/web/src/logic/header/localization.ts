import i18next from 'i18next';
import locI18next from 'loc-i18next';
import enLang from './lang/en.json';
import ruLang from './lang/ru.json';

export function updateContent() {
  const localize = locI18next.init(i18next, {
    optionsAttr: 'data-i18n-options',
    useOptionsAttr: true,
  });
  localize('html');
}

export function changeLng(evt) {
  const selectedLang = evt ? evt.target.value : 'en';

  window.localStorage.setItem('lang', `${selectedLang}`);

  i18next.changeLanguage(selectedLang).then(() => {
    updateContent();
  });
}

i18next
  .init({
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    resources: {
      en: {
        translation: enLang,
      },
      ru: {
        translation: ruLang,
      },
    },
  })
  .then(() => {
    updateContent();
  });
