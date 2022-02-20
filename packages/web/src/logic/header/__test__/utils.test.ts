import {
  setInnerText,
  setStyleDisplay,
  setValueLocalStorage,
  getValueLocalStorage,
  setNodeValue,
  getInputValue,
  removeDisabledAttribute,
  setDisabledAttribute,
  setClass,
  removeClass,
  selectRow,
  addListener,
  fromLocaleStorageToDropDown,
  collectData,
  collectDataLogin,
  setHref,
  hasAttribute,
  getElementById,
  setNodeSelectedText,
} from '../utils';

const state = {
  baseURL: 'http://localhost:3000',
  mongoDB: [],
  mySQL: [],
  currentRecordId: undefined,
  currentNode: null,
  isUpdate: false,
  validateStatus: [],
  setCurrentNode(node) {
    this.currentNode = node;
  },
  setCurrentRecordId(id) {
    this.currentRecordId = id;
  },
  setIsUpdate(value) {
    this.isUpdate = value;
  },
};


describe('setInnerText', () => {
  test('setInnerText', () => {
    expect(setInnerText('', '')).toBe(false);
  });
  test('setInnerText true', () => {
    global.document.getElementById = jest.fn(() => {
      return <HTMLElement>{ innerText: '' };
    });
    expect(setInnerText('', '')).toBe(true);
  });
});

describe('setNodeSelectedText', () => {
  test('setNodeSelectedText', () => {
    global.document.getElementById = jest.fn();
    expect(setNodeSelectedText('', 1)).toBe(false);
  });
  test('setNodeSelectedText true', () => {
    global.document.getElementById = jest.fn(() => {
      return <HTMLElement><unknown>{ selectedIndex: 0 };
    });
    expect(setNodeSelectedText('', 1)).toBe(true);
  });
});

describe('getInputValue', () => {
  test('getInputValue', () => {
    global.document.getElementById = jest.fn();
    expect(getInputValue('')).toBe('');
  });
  test('getInputValue true', () => {
    global.document.getElementById = jest.fn(() => {
      return <HTMLElement><unknown>{ value: 'true' };
    });
    expect(getInputValue('')).toBe('true');
  });
});

describe('setNodeValue', () => {
  test('setNodeValue', () => {
    global.document.getElementById = jest.fn();
    expect(setNodeValue('')).toBe(false);
  });
  test('setNodeValue true', () => {
    global.document.getElementById = jest.fn(() => {
      return <HTMLElement><unknown>{ value: 'true' };
    });
    expect(setNodeValue('')).toBe(true);
  });
});

describe('getElementById', () => {
  test('getElementById', () => {
    global.document.getElementById = jest.fn();
    expect(getElementById('')).toBe(null);
  });
  test('getElementById true', () => {
    global.document.getElementById = jest.fn(() => {
      return <HTMLElement><unknown>{ value: 'true' };
    });
    expect(getElementById('')).toEqual(<HTMLElement><unknown>{ value: 'true' });
  });
});

describe('setStyleDisplay', () => {
  test('setStyleDisplay', () => {
    global.document.getElementById = jest.fn();
    expect(setStyleDisplay('', '')).toBe(false);
  });
  test('setStyleDisplay true', () => {
    global.document.getElementById = jest.fn(() => {
      return <HTMLElement><unknown>{ style: { display: '' } };
    });
    expect(setStyleDisplay('', '')).toEqual(true);
  });
});

describe('hasAttribute', () => {
  test('hasAttribute', () => {
    expect(hasAttribute(<HTMLElement><unknown>{ hasAttribute: () => true }, '')).toBe(true);
  })
})

describe('setDisabledAttribute', () => {
  test('setDisabledAttribute', () => {
    expect(setDisabledAttribute(null)).toEqual(false);
  })
  test('setDisabledAttribute', () => {
    expect(setDisabledAttribute(<HTMLElement><unknown>{
      setAttribute: () => {
      }
    })).toEqual(true);
  })
})

describe('setClass', () => {
  test('setClass', () => {
    expect(setClass(null, '')).toEqual(false);
  })
  test('setClass', () => {
    expect(setClass(<HTMLElement><unknown>{
      classList: {
        add: () => {
        }
      }
    }, '')).toEqual(true);
  })
})

describe('removeClass', () => {
  test('removeClass', () => {
    expect(removeClass(null, '')).toEqual(false);
  })
  test('removeClass', () => {
    expect(removeClass(<HTMLElement><unknown>{
      classList: {
        remove: () => {
        }
      }
    }, '')).toEqual(true);
  })
})

describe('removeDisabledAttribute', () => {
  test('removeDisabledAttribute', () => {
    expect(removeDisabledAttribute(null)).toEqual(false);
  })
  test('removeDisabledAttribute', () => {
    expect(removeDisabledAttribute(<HTMLElement><unknown>{
      removeAttribute: () => {
      }
    })).toEqual(true);
  })
})

describe('addListener', () => {
  test('addListener', () => {
    global.document.getElementById = jest.fn();
    expect(addListener('', '', () => {
    })).toBe(false);
  });
  test('setInnerText true', () => {
    global.document.getElementById = jest.fn(() => {
      return <HTMLElement><unknown>{
        addEventListener: () => {
        },
      };
    });
    expect(addListener('', '', () => {
    })).toBe(true);
  });
});

describe('collectDataLogin', () => {
  test('collectDataLogin', () => {
    expect(collectDataLogin()).toEqual({ 'username': undefined, 'password': undefined });
  })
})

describe('collectData', () => {
  test('collectData', () => {
    expect(collectData()).toEqual({ 'username': undefined, 'password': undefined });
  })
})

describe('setValueLocalStorage', () => {
  test('setValueLocalStorage', () => {
    expect(setValueLocalStorage('key', 'hello')).toBeUndefined();
  })
})

describe('getValueLocalStorage', () => {
  test('getValueLocalStorage', () => {
    expect(getValueLocalStorage('')).toBe('');
  })
  test('getValueLocalStorage true', () => {
    Object.hasOwnProperty = jest.fn(() => {
      return true;
    });
    expect(getValueLocalStorage('key')).toEqual('hello');
  })
})

describe('fromLocaleStorageToDropDown', () => {
  test('fromLocaleStorageToDropDown', () => {
    expect(fromLocaleStorageToDropDown('', '', [])).toBeUndefined();
  })
  test('fromLocaleStorageToDropDown true', () => {
    localStorage.setItem('key', 'dd');
    expect(fromLocaleStorageToDropDown('', 'key', [])).toBeUndefined();
  })
})

describe('selectRow', () => {
  test('selectRow', () => {
    global.document.getElementById = jest.fn(() => null);
    expect(selectRow(state, {
      'target': <HTMLTableElement><unknown>{
        parentNode: {
          firstChild: {
            classList: {
              add: () => {
              },
              remove: () => {
              },
            },
            removeAttribute: () => {
            },
          },
          classList: {
            add: () => {
            },
            remove: () => {
            },
          },
          removeAttribute: () => {
          },
        }
      }
    })).toBeUndefined();
  })
  test('selectRow', () => {
    global.document.getElementById = jest.fn(() => null);
    state.setCurrentNode({
      classList: {
        add: () => {
        },
        remove: () => {
        },
      }
    });
    expect(selectRow(state, {
      'target': <HTMLTableElement><unknown>{
        parentNode: {
          firstChild: {
            classList: {
              add: () => {
              },
              remove: () => {
              },
            },
            removeAttribute: () => {
            },
          },
          classList: {
            add: () => {
            },
            remove: () => {
            },
          },
          removeAttribute: () => {
          },
        }
      }
    })).toBeUndefined();
  })
})

describe('setHref', () => {
  test('setHref', () => {
    expect(setHref('')).toBeUndefined();
  })
})
