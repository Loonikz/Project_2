import i18next from 'i18next';
import locI18next from 'loc-i18next';
import enLang from './lang/en.json';
import ruLang from './lang/ru.json';
import { getValueLocalStorage, setValueLocalStorage } from './utils';

export function updateContent() {
  const localize = locI18next.init(i18next, {
    optionsAttr: 'data-i18n-options',
    useOptionsAttr: true,
  });
  localize('html');
}

export function changeLng(evt?: { target: HTMLInputElement }) {
  let selectedLang;
  if (typeof evt !== 'undefined') {
    selectedLang = evt.target ? evt.target.value : 'en';
    setValueLocalStorage('lang', selectedLang);
  } else {
    selectedLang = getValueLocalStorage('lang');
  }
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
