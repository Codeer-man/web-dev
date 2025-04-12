// ? function return type
function sum(n1, n2) {
    return n1 + n2;
}
// console.log(sum(10, 20));
function greet(greeter) {
    console.log("".concat(greeter, " welcome"));
}
//? declare functino
//! not recommended
// let combinerFunction: Function;
// combinerFunction = sum;
// console.log(combinerFunction(20, 20));
// combinerFunction = greet;
// console.log(combinerFunction("Manish"));
//? good practise
var combinerFunction;
combinerFunction = sum;
console.log(combinerFunction(100, 400));
//? function types and callbacks
function handleadd(n1, n2, cb) {
    var result = n1 + n2;
    cb(result);
}
//? or by using > type CB = (n: number) => void
void handleadd(20, 35, function (result) {
    console.log(result);
});
