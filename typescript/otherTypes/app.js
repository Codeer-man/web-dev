var UserInput;
var UserName;
var UserImage;
UserInput = UserName;
UserInput = 34;
console.log(UserInput);
//? return type never
function generateError(message, code) {
    throw { message: message, statusCode: code };
}
var res = generateError("Hello world", 500);
console.log(res);
