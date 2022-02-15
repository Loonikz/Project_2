export function getData(url: string) {
  return new Promise<[]>((resolve, reject) => {
    fetch(url, {
      method: 'GET',
    })
      .then((data) => data.json())
      .then((data) => {
        resolve(data);
      })
      .catch(() => {
        reject(new Error('Error'));
      });
  });
}

export function postData(url: string, value: object) {
  return new Promise<void>((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
}
