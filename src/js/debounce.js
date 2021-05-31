export function  debounce (fn, debounceTime) {
  let time = 0;
  return function () {
    clearTimeout(time);
    time = setTimeout(fn.bind(this, ...arguments), debounceTime);
  }
};
