export let debounce = function (fn, time = 2000) {
  let timeout = null;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.call(this, arguments);
    }, time);
  };
};
export let throttle = function (fn, time = 2000) {
  let canRun = true;
  return function () {
    let this_ = this;
    let arg = arguments;
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      canRun = true;
      fn.call(this_, arg);
    }, time);
  };
};
