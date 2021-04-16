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
  let text = null;
  let fn = null;

  fakeRequest(file, (content) => {
    if (fn) {
      fn(content);
      return;
    }

    text = content;
  });

  return (callback) => {
    if (text) {
      callback(text);
      return;
    }

    fn = callback;
  };
}

const thunk1 = getFile('file1');
const thunk2 = getFile('file2');
const thunk3 = getFile('file3');

thunk1((content) => {
  console.log(content);

  thunk2((content2) => {
    console.log(content2);

    thunk3((content3) => {
      console.log(content3);
      console.log('complete!');
    });
  });
});

getFile(1);
