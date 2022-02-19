export function getData(url: string) {
  return new Promise<[]>((resolve, reject) => {
    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch(() => {
        reject();
      });
  });
}

export function sendData(url: string, data, userMethod = 'POST') {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: userMethod,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        resolve(response);
      })
      .catch(() => {
        reject();
      });
  });
}
