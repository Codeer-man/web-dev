// unknown 
let UserInput: unknown;
// any 
let UserName: any;

let UserImage: never;
UserInput = UserName;
UserInput = 34;
console.log(UserInput);

//? return type never

function generateError(message: string, code: number): never {
  throw { message: message, statusCode: code };
}

const res = generateError("Hello world", 500);
console.log(res);
