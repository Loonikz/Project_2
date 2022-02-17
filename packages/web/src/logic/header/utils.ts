export function addListener(id, eventType, callback) {
  const node = document.getElementById(id);
  if (node) {
    node.addEventListener(eventType, callback);
    return true;
  }
  return false;
}

export function getInputValue(id): string {
  const input = <HTMLInputElement>document.getElementById(id);

  if (input) {
    return input.value;
  }
  return '';
}

export function getElementById(id): HTMLElement {
  const node = document.getElementById(id);

  if (node) {
    return node;
  }
  return null;
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

function setNodeSelectedText(id, selectIndex) {
  const node = <HTMLSelectElement>document.getElementById(id);
  if (node) {
    node.selectedIndex = selectIndex;
    return true;
  }
  return false;
}

export function fromLocaleStorageToDropDown(id, key, arrayValue) {
  if (getValueLocalStorage(key)) {
    setNodeSelectedText(id, arrayValue.indexOf(getValueLocalStorage(key)));
  } else {
    setValueLocalStorage(key, getInputValue(id));
  }
}

export function setStyleDisplay(id: string, value: string): boolean {
  const node = <HTMLElement>getElementById(id);
  if (node) {
    node.style.display = value;
    return true;
  }
  return false;
}

export function selectRow(state, event: { target: HTMLTableElement }) {
  if (state.currentNode) {
    state.currentNode.style.backgroundColor = '';
  }
  const node: Node = event.target.parentNode;
  node.style.backgroundColor = 'red';
  state.setCurrentNode(node);
  const nodeId: HTMLTableElement = <HTMLTableElement>node.firstChild;
  state.setCurrentRecordId(nodeId.innerText);
}

export function setNodeValue(id: string, value = '') {
  const node = <HTMLInputElement>document.getElementById(id);
  if (node) {
    node.value = value;
    return true;
  }
  return false;
}
