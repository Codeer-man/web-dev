// type decleration

function add(num1: number, num2: number, text: string, check: boolean) {
  const sum: number = num1 + num2;
  return console.log(
    `${text} ${num1} and ${num2} is ${sum} which is ${check} `
  );
}
const num1 = 4;
const num2 = 10;
const text = "the sum of";
const check = true;

add(num1, num2, text, check);

// object ts

const person: {
  name: string;
  lastname: string;
  age: number;
  xyz: { address: string; num: number };
  skills: string[];
} = {
  name: "Manish",
  age: 19,
  lastname: "Manandhar",
  xyz: {
    address: "Pokhara",
    num: 346767,
  },
  skills: ["nodesjs", "expressjs"],
};

console.log(person);

// array ts

let favourateLanguage: string[] = ["js"];
console.log(favourateLanguage);

let detail: any[] = ["js", 19, true];
console.log(detail);

// tuple
const tuple: [number, string] = [19, "hello world"];
console.log("tuple", tuple);

// enum
enum Role {
  ADMIN,
  USER,
  READ_ONLY,
}

const user = {
  role: Role.ADMIN,
};
if (user.role === Role.ADMIN) {
  console.log("ADMIN");
}
