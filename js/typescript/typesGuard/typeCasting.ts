const user = <HTMLInputElement>document.getElementById("input_user")!; //! not null
const userData = (<HTMLInputElement>(
  document.getElementById("input_user")!
)) as HTMLInputElement;

user.value = "Welcome here";
