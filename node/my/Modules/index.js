// modules export
// reqired

const firstModule = require("./FirstModule");

console.log(firstModule.add(5, 6));

try {
  console.log("trying to divide by zero");
  const result = firstModule.divide(12, 6);
  console.log(result);
} catch (error) {
  console.error(error.message);
}
