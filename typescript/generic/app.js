// generic intro
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var fruits = ["mango", "banana"];
var person = [{ name: "alberet", age: 34 }];
// merge
function merge(obj1, obj2, obj3) {
    return __assign(__assign(__assign({}, obj1), obj2), obj3);
}
var result = merge({ name: "Manandhar" }, { role: "Coder" }, { id: "dman" });
console.log(result);
//? generic constrain
function createObject(key, value, isActive) {
    return { key: key, value: value, isActive: isActive };
}
var ans = createObject("danish", 34, true);
console.log(ans);
var money = { value: "Money" };
var num = { value: 45 };
var obj = { value: {} };
console.log(money, num, obj);
