/*
  Expected behavior:
  - Request all 3 files in parallel
  - Render them ASAP
  - Render them in proper order (file1, file2, file3)
  - After all 3 are done, output `complete!`
*/

function randomInt(value) {
  return Math.floor(Math.random() * value);
}

function fakeRequest(url, callback) {
  const responses = {
    file1: 'The first file',
    file2: 'The second file',
    file3: 'The third file'
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

getFile('file1').then(console.log).then(
  () => getFile('file2')
).then(console.log).then(
  () => getFile('file3')
).then(console.log).then(() =>
  console.log('complete!')
);
