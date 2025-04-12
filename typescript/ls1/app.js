// type decleration
function add(num1, num2, text, check) {
    var sum = num1 + num2;
    return console.log("".concat(text, " ").concat(num1, " and ").concat(num2, " is ").concat(sum, " which is ").concat(check, " "));
}
var num1 = 4;
var num2 = 10;
var text = "the sum of";
var check = true;
add(num1, num2, text, check);
// object ts
var person = {
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
var favourateLanguage = ["js"];
console.log(favourateLanguage);
var detail = ["js", 19, true];
console.log(detail);
// tuple
var tuple = [19, "hello world"];
console.log("tuple", tuple);
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["USER"] = 1] = "USER";
    Role[Role["READ_ONLY"] = 2] = "READ_ONLY";
})(Role || (Role = {}));
var user = {
    role: Role.ADMIN,
};
if (user.role === Role.ADMIN) {
    console.log("ADMIN");
}
