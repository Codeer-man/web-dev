// generic intro

const fruits: Array<string> = ["mango", "banana"];

type boy = {
  name: string;
  age: number;
};

const person: Array<boy> = [{ name: "alberet", age: 34 }];

// merge
function merge<T, U, V>(obj1: T, obj2: U, obj3: V) {
  return { ...obj1, ...obj2, ...obj3 };
}
const result = merge({ name: "Manandhar" }, { role: "Coder" }, { id: "dman" });
console.log(result);

//? generic constrain

function createObject<T extends string, U extends number, V extends boolean>(
  key: T,
  value: U,
  isActive: V
): { key: T; value: U; isActive: V } {
  return { key, value, isActive };
}

const ans = createObject("danish", 34, true);
console.log(ans);

// generic interface

//! T value can Be anything that we declare .ie bollen,string,num,object
interface box<T> {
  value: T;
}

const money: box<string> = { value: "Money" };
const num: box<number> = { value: 45 };
const obj: box<object> = { value: {} };
console.log(money, num, obj);

//! generic default  string
interface Default<T = string> {
  data: T;
  status: number;
}
