import readline from "readline";
const readLineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const todos = [];

const showMenu = () => {
  console.log("/n 1: Add a Task");
  console.log("2: View Tasks");
  console.log("3: Exit");
  readLineInterface.question("Chose an Input: ", handleInput);
};

const handleInput = (option) => {
  if (option === "1") {
    readLineInterface.question("Enter The Task: ", (task) => {
      todos.push(task);
    });
  } else if (option === "2") {
    viewTasks();
  }
};

showMenu();
