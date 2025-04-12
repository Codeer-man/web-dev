"use strict";
//! interface
let user;
user = {
  name: "Manish",
  age: 19,
  greet(text) {
    console.log(`${text} ${this.name}  turning ${this.age}`);
  },
};
console.log(user);
user.greet("Hi there I am");
let man;
man = {
  name: "Namaste",
  greet(text) {
    console.log(`${this.name} ${text}`);
  },
};
console.log(man.greet("manish"));
let add;
add = (nu, num) => {
  return nu + num;
};
console.log(add(30, 40));
//! optoinal  use ? for the optional or enum
