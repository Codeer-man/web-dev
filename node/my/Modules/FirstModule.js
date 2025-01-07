function add(a, b) {
  return a+b;
}
function subtract(a, b) {
  return a-b ;
}
function divide(a, b) {
  if (b === 0) {
    return "cannot be divide by zero";
  } else {
    return ` ${a/b} is the ans`;
  }
}

module.exports = {
  add,
  subtract,
  divide,
};
