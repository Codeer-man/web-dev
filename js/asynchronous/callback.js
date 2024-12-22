function hello(callback) {
  console.log("Hello!");
  callback();
}

function World() {
  console.log("World!");
}

hello(World); // Output: Hello! World!
