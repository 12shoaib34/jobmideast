export const debounce = (cb, wait, immediate) => {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) cb.apply(context, args);
    }, wait);
    if (immediate && !timeout) cb.apply(context, args);
  };
};
