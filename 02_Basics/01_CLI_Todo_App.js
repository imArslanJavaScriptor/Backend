import readline from "readline";

const readLineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tasks = [];

const showMenu = () => {
  console.log(`\n1: Add a Task`);
  console.log("2: Read Tasks");
  console.log("3: Exit From Menu");

  readLineInterface.question("Choose an option: ", handleTaskInput);
};

const handleTaskInput = (input) => {
  if (input === "1") {
    readLineInterface.question("Enter Your Task: ", (task) => {
      tasks.push(task);
      console.log("Task Added: ", task);
      showMenu();
    });
  } else if (input === "2") {
    console.log("\n Your Tasks: ");
    tasks.forEach((task, index) => console.log(`${index + 1}. ${task}`));
    showMenu();
  } else if (input === "3") {
    console.log("Good Bye");
    readLineInterface.close();
  }
};

showMenu();
