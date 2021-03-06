function coroutine(fn) {
  const instance = fn();
  instance.next();

  return () => {
    instance.next();
  };
}

const clock = coroutine(function* () {
  while (true) {
    yield;
    console.log('tik!');
    yield;
    console.log('tok!');
  }
});

setInterval(clock, 1000);
