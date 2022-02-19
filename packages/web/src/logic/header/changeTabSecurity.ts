export function addClass(tabPanes, tabNavs, e) {
  e.preventDefault();
  const activeTabAttr = e.target.getAttribute('data-tab');
  for (let j = 0; j < tabNavs.length; j += 1) {
    const contentAttr = tabPanes[j].getAttribute('data-tab-content');

    if (activeTabAttr === contentAttr) {
      tabNavs[j].classList.add('active');
      tabPanes[j].classList.add('active-form');
    } else {
      tabNavs[j].classList.remove('active');
      tabPanes[j].classList.remove('active-form');
    }
  }
}

export function changeTabSecurity() {
  const tabNavs = document.querySelectorAll('.modal__tab-menu--link');
  const tabPanes = document.querySelectorAll('.modal__form-edit');

  for (let i = 0; i < tabNavs.length; i += 1) {
    tabNavs[i].addEventListener('click', addClass.bind(null, tabPanes, tabNavs));
  }
}
