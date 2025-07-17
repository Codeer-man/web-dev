function BankAccount(username, amount = 0) {
  this.userName = username;
  this.userId = Date.now();
  this.balance = amount;

  //! variable are called properties and functions are called methods inside the class

  this.depost = function (amount) {
    this.balance += amount;
  };

  this.withdraw = (amount) => {
    this.balance -= amount;
  };
}

// !the new operator will convert it into object
// const RakeshAccount = new BankAccount("manandhar",1000)
// RakeshAccount.depost(5000)
// RakeshAccount.withdraw(3000)
// console.log(RakeshAccount);

// ==============================================================================

const accountForm = document.getElementById("bankForm");
const custorName = document.getElementById("name");
const customerBalance = document.getElementById("balance");
const account = [];

accountForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const backAccount = new BankAccount(custorName.value, +customerBalance.value);
  account.push(backAccount);
  console.log(account, "account");
});

const depositForm = document.getElementById("depositForm");
const bankNumber = document.getElementById("bankNumber");
const amount = document.getElementById("amount");

depositForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const depo = account.find((num) => num.userId === +bankNumber.value);

  if (depo !== undefined) {
    depo.depost(+amount.value);
  }
  console.log(account);
});
