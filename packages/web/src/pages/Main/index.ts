import './styles.scss';
import {addListener} from '../../logic/header/utils';
import {changeLng} from '../../logic/header/localization';
import {changeTheme} from '../../logic/header/theme';
import {getLocalStorage} from '../../logic/header/getLocalStorage';

const profile = document.getElementById('profile');
const modalSecurity = document.getElementById('modal-security');
const closedModal = document.getElementById('closed-modal');
const create = document.getElementById('create');
const update = document.getElementById('update');
const modalCreateUpdate = document.getElementById('modal-create-update');
const closedCreateModal = document.getElementById('closed-create-update');

profile.addEventListener('click', () => {
  modalSecurity.style.display = 'block';
});

closedModal.addEventListener('click', () => {
  modalSecurity.style.display = 'none';
});
create.addEventListener('click', () => {
  modalCreateUpdate.style.display = 'block';
});
update.addEventListener('click', () => {
  modalCreateUpdate.style.display = 'block';
});
closedCreateModal.addEventListener('click', () => {
  modalCreateUpdate.style.display = 'none';
});

function init() {
  addListener('dropdownLanguage', 'change', changeLng);
  addListener('dropdownTheme', 'change', changeTheme);

  getLocalStorage();
}

document.addEventListener('DOMContentLoaded', init);
