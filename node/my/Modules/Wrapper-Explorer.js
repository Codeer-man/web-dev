console.log("modules wrapper demo");

console.log("__fileName in explorer", __fileName);
console.log("__dirName in explorer", __dirName);

modules.exports.greet = function (name) {
  console.log(`Hello ${name}`);
};
