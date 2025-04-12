//! type guard
function add(n1, n2) {
    //! add type guard
    if (typeof n1 === "string" || typeof n2 === "string") {
        return n1.toString() + n2.toString(); // string concatenation
    }
    return n1 + n2; // numeric addition
}
console.log(add(29, 34));
console.log(add(29, "34"));
var emp1 = {
    name: "Manish Manandhar",
    privilage: ["Author"],
    startDate: new Date(),
};
function PrintEmployeeInfo(emp) {
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
