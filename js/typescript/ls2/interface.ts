//! interface

interface Persion {
  name: string;
  age: number;
  greet(text: string): void;
}

let user: Persion;

user = {
  name: "Manish",
  age: 19,
  greet(text): void {
    console.log(`${text} ${this.name}  turning ${this.age}`);
  },
};
console.log(user);
user.greet("Hi there I am");

//! extrinding interface

interface Named {
  readonly name: string;
}

interface Greeting extends Named {
  greet(text: string): void;
}

let man: Greeting;

man = {
  name: "Namaste",
  greet(text): void {
    console.log(`${this.name} ${text}`);
  },
};
console.log(man.greet("manish"));

//! function in the interface

interface addsum {
  (n1: number, n2: number): number;
}

let add: addsum;

add = (nu: number, num: number) => {
  return nu + num;
};
console.log(add(30, 40));

//! optoinal  use ? for the optional or enum
