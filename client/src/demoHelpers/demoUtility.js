export const writeWord = (ref, word, letterSpeed) => {
  return new Promise((resolve) => {
    let wordArr = [...word];
    let wordIndex = 0;
    let intervalID = setInterval(async () => {
      ref.current.value = ref.current.value + wordArr[wordIndex];
      wordIndex++;
      if (wordIndex == wordArr.length) {
        clearInterval(intervalID);
        await sleep(3000);
        ref.current.value = "";
        resolve();
      }
    }, letterSpeed);
  });
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
