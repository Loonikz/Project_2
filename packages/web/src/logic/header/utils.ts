export function addListener(id, eventType, callback) {
  const node = document.getElementById(id);
  if (node) {
    node.addEventListener(eventType, callback);
    return true;
  }
  return false;
}

export function getInputValue(id): boolean | string {
  const input = <HTMLInputElement>document.getElementById(id);

  if (input) {
    return input.value;
  }
  return false;
}

export function getElementById(id): HTMLElement | boolean {
  const node = document.getElementById(id);

  if (node) {
    return node;
  }
  return false;
}

export function setInnerText(id, value): boolean {
  const node = <HTMLInputElement>document.getElementById(id);
  if (node) {
    node.innerText = value;
    return true;
  }
  return false;
}

export function hasAttribute(node: HTMLElement, attribute: string): boolean {
  return node.hasAttribute(attribute);
}

export function setDisabledAttribute(node: HTMLElement): boolean {
  if (node) {
    node.setAttribute('disabled', 'disabled');
    return true;
  }
  return false;
}

export function removeDisabledAttribute(node: HTMLElement) {
  if (node) {
    node.removeAttribute('disabled');
    return true;
  }
  return false;
}

export function setValueLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export function getValueLocalStorage(key: string) {
  // по другому ругается ес-линт
  if (Object.hasOwnProperty.call(localStorage, key)) {
    return localStorage[key];
  }
  return false;
}
