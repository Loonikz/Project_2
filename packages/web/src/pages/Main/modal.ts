import { setInnerText, setNodeValue, setStyleDisplay } from '../../logic/header/utils';
import { checkValidation } from './validation';

export function closeCreateModal() {
  setNodeValue('first-name');
  setNodeValue('last-name');
  setNodeValue('age');
  setNodeValue('city');
  setNodeValue('number');
  setNodeValue('email');
  setNodeValue('company');
  setInnerText(`first-name-message`, '');
  setInnerText(`last-name-message`, '');
  setInnerText(`age-message`, '');
  setInnerText(`city-message`, '');
  setInnerText(`number-message`, '');
  setInnerText(`email-message`, '');
  setInnerText(`company-message`, '');
  setStyleDisplay('modal-create-update', 'none');
}

export function closeSecurity() {
  setNodeValue('new-login');
  setNodeValue('password');
  setNodeValue('confirm-password');
  setNodeValue('new-pass');
  setNodeValue('new-password');
  setNodeValue('confirm-pass-edit');
  setInnerText(`new-pass-message`, '');
  setInnerText(`password-message`, '');
  setInnerText(`confirm-password-message`, '');
  setInnerText(`change-login-message`, '');
  setInnerText(`new-pass-message`, '');
  setInnerText(`new-password-message`, '');
  setInnerText(`confirm-pass-edit-message`, '');
  setInnerText(`change-password-message`, '');
  setStyleDisplay('modal-security', 'none');
}

export function eventClickWithoutModal(id, className, event) {
  let targetNode = event.target;
  while (!targetNode.classList.contains(className) && targetNode.localName !== 'body') {
    targetNode = targetNode.parentNode;
  }
  if (targetNode.classList.contains(className)) {
    return;
  }
  if (id === 'modal-create-update') {
    closeCreateModal();
  } else if (id === 'modal-security') {
    closeSecurity();
  } else {
    setStyleDisplay(id, 'none');
  }
}
