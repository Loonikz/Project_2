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
  setInnerText(`first-name-message`,'');
  setInnerText(`last-name-message`,'');
  setInnerText(`age-message`,'');
  setInnerText(`city-message`,'');
  setInnerText(`number-message`,'');
  setInnerText(`email-message`,'');
  setInnerText(`company-message`,'');
  setStyleDisplay( 'modal-create-update', 'none');
}
