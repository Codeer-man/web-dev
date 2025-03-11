const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const todo = [];

function showMenu() {
  console.log("1. Add task");
  console.log("2. View tasks");
  console.log("3. Exit");
  rl.question("Choose an option: ", handleInput);
}

const handleInput = (option) => {
  if (option === "1") {
    rl.question("Enter a task: ", (task) => {
      todo.push(task);
      console.log("Task added:", task);
      showMenu();
    });
  } else if (option === "2") {
    console.log("Your Tasks:");
    todo.forEach((task, index) => {
      console.log(`${index + 1}. ${task}`);
    });

    showMenu();
  } else if (option === "3") {
    console.log("Goodbye!");
    rl.close();
  } else {
    console.log("Enter a valid number (1-3)");
    showMenu();
  }
};

showMenu();
