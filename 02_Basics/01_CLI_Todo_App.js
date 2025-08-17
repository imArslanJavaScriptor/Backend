import { realpath } from "fs";
import { stdin, stdout } from "process";
import readline from "readline";

const readLine = readline.createInterface({
    input: stdin,
    output: stdout
})

// Our "database" → an array of todos
const todos = [];

// Main menu
const showMenu = () => {
  console.log("\n==============================");
  console.log("       📝 Todo Application     ");
  console.log("==============================");
  console.log("1️⃣  Add a Task");
  console.log("2️⃣  View Tasks");
  console.log("3️⃣  Update a Task");
  console.log("4️⃣  Delete a Task");
  console.log("5️⃣  Exit");
  console.log("==============================\n");

  readLine.question("👉 Choose an option: ", handleInput);
};

// Handle menu input
const handleInput = (option) => {
  switch (option) {
    case "1": // CREATE
      readLine.question("\n✍️  Enter Your Task: ", (task) => {
        todos.push(task);
        console.log(`✅ Task Added: "${task}"`);
        showMenu();
      });
      break;

    case "2": // READ
      console.log("\n📋 Your Tasks List:");
      if (todos.length === 0) {
        console.log("⚠️  No tasks added yet.");
      } else {
        todos.forEach((item, index) => {
          console.log(`${index + 1}. ${item}`);
        });
      }
      showMenu();
      break;

    case "3": // UPDATE
      if (todos.length === 0) {
        console.log("\n⚠️  No tasks available to update.");
        showMenu();
      } else {
        console.log("\n📋 Select the task number to update:");
        todos.forEach((item, index) => {
          console.log(`${index + 1}. ${item}`);
        });

        readLine.question("\n👉 Enter task number: ", (num) => {
          const index = parseInt(num) - 1;
          if (index >= 0 && index < todos.length) {
            readLine.question("✏️  Enter new task: ", (newTask) => {
              console.log(`🔄 Updated: "${todos[index]}" → "${newTask}"`);
              todos[index] = newTask;
              showMenu();
            });
          } else {
            console.log("❌ Invalid task number.");
            showMenu();
          }
        });
      }
      break;

    case "4": // DELETE
      if (todos.length === 0) {
        console.log("\n⚠️  No tasks available to delete.");
        showMenu();
      } else {
        console.log("\n📋 Select the task number to delete:");
        todos.forEach((item, index) => {
          console.log(`${index + 1}. ${item}`);
        });

        readLine.question("\n👉 Enter task number: ", (num) => {
          const index = parseInt(num) - 1;
          if (index >= 0 && index < todos.length) {
            console.log(`🗑️ Deleted: "${todos[index]}"`);
            todos.splice(index, 1); // remove task
          } else {
            console.log("❌ Invalid task number.");
          }
          showMenu();
        });
      }
      break;

    case "5": // EXIT
      console.log("\n👋 Good Bye! Have a productive day!");
      readLine.close();
      break;

    default:
      console.log("\n❌ Invalid Option! Please choose from 1–5.");
      showMenu();
      break;
  }
};

showMenu();
