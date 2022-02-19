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
  setInnerText(`changeLogin-message`, '');
  setInnerText(`password-message`, '');
  setInnerText(`confirm-password-message`, '');
  setInnerText(`change-login-message`, '');
  setInnerText(`new-pass-message`, '');
  setInnerText(`new-password-message`, '');
  setInnerText(`confirm-pass-edit-message`, '');
  setInnerText(`change-password-message`, '');
  setStyleDisplay('modal-security', 'none');
}
