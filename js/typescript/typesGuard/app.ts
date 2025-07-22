//! type guard

//! | pipe (or)
type combinable = string | number;
type Numberis = number | boolean;

//! & intersect(and)
type universal = combinable & Numberis;

function add(n1: combinable, n2: combinable) {
  //! add type guard
  if (typeof n1 === "string" || typeof n2 === "string") {
    return n1.toString() + n2.toString(); // string concatenation
  }
  return n1 + n2; // numeric addition
}
console.log(add(29, 34));
console.log(add(29, "34"));

//? 2
interface Admin {
  name: string;
  privilage: string[];
}

interface emplpyee {
  name: string;
  startDate: Date;
}

type Evalated = Admin & emplpyee;
type Unknow = Admin | emplpyee;

const emp1: Evalated = {
  name: "Manish Manandhar",
  privilage: ["Author"],
  startDate: new Date(),
};

function PrintEmployeeInfo(emp: Unknow) {
  console.log(emp.name);
  //   console.log(emp.privilage);
  //! apply type guard

  //   if(typeof emp === "object"){ //? error code
  //   }

  if ("privilage" in emp) {
    console.log(emp.privilage);
  }

  if ("startDate" in emp) {
    console.log(emp.startDate);
  }
}

PrintEmployeeInfo(emp1);
