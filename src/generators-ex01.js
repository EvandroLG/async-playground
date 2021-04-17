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

function run(fn) {
  const instance = fn.apply(this);

  function handleNext(value) {
    const next = instance.next(value);

    if (next.done) {
      return;
    }

    return Promise.resolve(next.value).then(handleNext);
  }

  return Promise.resolve().then(handleNext);
}

run(function* () {
  const p1 = getFile('file1');
  const p2 = getFile('file2');
  const p3 = getFile('file3');

  console.log(yield p1);
  console.log(yield p2);
  console.log(yield p3);

  console.log('complete!');
});
