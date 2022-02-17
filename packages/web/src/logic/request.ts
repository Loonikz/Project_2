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

export function sendData(url: string, data, userMethod = 'POST') {
  return new Promise<void>((resolve, reject) => {
    fetch(url, {
      method: userMethod,
      body: JSON.stringify(data),
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
