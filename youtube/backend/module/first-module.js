function sum(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  } else {
    return a / b;
  }
}

module.exports = { sum, subtract, divide };
