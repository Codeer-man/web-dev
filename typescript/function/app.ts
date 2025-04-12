// ? function return type

function sum(n1: number, n2: number): number {
  return n1 + n2;
}

// console.log(sum(10, 20));

function greet(greeter: string): void {
  console.log(`${greeter} welcome`);
}

//? declare functino
//! not recommended
// let combinerFunction: Function;

// combinerFunction = sum;
// console.log(combinerFunction(20, 20));

// combinerFunction = greet;
// console.log(combinerFunction("Manish"));

//? good practise
let combinerFunction: (a: number, b: number) => number;
combinerFunction = sum;
console.log(combinerFunction(100, 400));

//? function types and callbacks
function handleadd(n1: number, n2: number, cb: (n: number) => void) {
  const result = n1 + n2;
  cb(result);
}

//? or by using > type CB = (n: number) => void
void handleadd(20, 35, (result) => {
  console.log(result);
});
