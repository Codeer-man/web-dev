// expression = a way to define a function as value or variable

const number = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const square = number.map(function (element) {
  return Math.pow(element, 2);
});

console.log(square);
