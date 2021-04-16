/*
  - Request all files at once in parallel
  - Render as each one finishes, but only once previous rendering is done.
*/

function randomInt(value) {
  return Math.floor(Math.random() * value);
}

function fakeRequest(url, callback) {
  const responses = {
    file1: 'The first file',
    file2: 'The second file',
    file3: 'The third file',
    file4: 'The fourth file',
  };

  const delay = randomInt(3);

  console.log(`Requesting: ${url}`);

  setTimeout(() => {
    callback(responses[url]);
  }, delay);
}

function getFile(file) {
  return new Promise((resolve) => {
    fakeRequest(file, resolve);
  });
}

['file1', 'file2', 'file3', 'file4'].map(getFile).reduce((acc, promise) => (
  acc.then(() => promise).then(console.log)
), Promise.resolve()).then(() => console.log('complete!'));
