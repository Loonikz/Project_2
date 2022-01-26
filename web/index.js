document.addEventListener("DOMContentLoaded", () => {
    i18next.init({
        lng: 'en', // if you're using a language detector, do not define the lng option
        debug: true,
        resources: {
            en: {
                translation: {
                    "text": "fghvbgh"
                }
            },
            ru: {
                translation: {
                    "text": "арапроарои"
                }
            }
        }
    }, function(err, t) {
        // initialized and ready to go!
        updateContent();
    });

    document.getElementById("but1").addEventListener('click', () => {
        i18next.changeLanguage('en')
    })

    document.getElementById("but2").addEventListener('click', () => {
        i18next.changeLanguage('ru')
    })

    i18next.on('languageChanged', () => {
        updateContent()
    })

    function updateContent() {

        document.querySelectorAll('[data-t]').forEach((el) => {
            const keyT = el.dataset.t;
            el.innerHTML = i18next.t(keyT);
        })
    }
});