// Require / Import EventEmitter Class
const EventEmitter = require("events");

// Create an Instance of EventEmitter
const emiiter = new EventEmitter();

// 1. Define an event listener (on) and emit it
emiiter.on("custom", () => {
    let arr = ['Apple', 'Mango', 'Banana', 'Orange'];
    arr.map((item) => console.log(item));
});

// Emit "custom" event → logs all fruits
// emiiter.emit("custom");


// 2. Event listener with a single argument
emiiter.addListener("greet", (userName) => {
    console.log(`Hello My Name is ${userName}`);
});

// Emit "greet" event → passes one argument
// emiiter.emit("greet", "Arslan");


// 3. Event listener with multiple arguments
emiiter.addListener("users", (...args) => {
    console.log(...args);
});

// Emit "users" event → logs multiple fruits
// emiiter.emit("users", "Apple", "Mango", "Banana", "Orange");


// 4. Event listener with an object argument
emiiter.addListener("greet2", (arg) => {
    console.log(`Hello ${arg.name}, You're a ${arg.prof}`);
});

// Emit "greet2" event → passes object with properties
// emiiter.emit("greet2", { name: "Arslan", prof: "Software Developer" });

// Challenge Part 👍
// Create a new instance of EventEmitter
const eventEmitter = new EventEmitter();

// Object to store counts of each event type
const eventCounts = {};

// Function to register a generic listener for an event
function registerEvent(eventName) {
  // Initialize counter for event if not exists
  eventCounts[eventName] = 0;

  // Listen for the event and increment count each time triggered
  eventEmitter.on(eventName, (data) => {
    eventCounts[eventName]++; 
    console.log(`Event: ${eventName}, Data:`, data);
  });
}

// Register four custom events
registerEvent('user-login');
registerEvent('user-logout');
registerEvent('user-purchase');
registerEvent('profile-update');

// Special event to log summary of all event counts
eventEmitter.on('summary', () => {
  console.log("\n===== Event Summary =====");
  for (const [event, count] of Object.entries(eventCounts)) {
    console.log(`${event} was triggered ${count} times`);
  }
});

// Emit events multiple times with different data
eventEmitter.emit('user-login', { username: 'Alice' });
eventEmitter.emit('user-logout', { username: 'Alice' });
eventEmitter.emit('user-login', { username: 'Bob' });
eventEmitter.emit('user-purchase', { username: 'Alice', item: 'Laptop' });
eventEmitter.emit('profile-update', { username: 'Bob', field: 'email' });
eventEmitter.emit('user-purchase', { username: 'Bob', item: 'Phone' });

// Trigger summary event at the end
eventEmitter.emit('summary');

