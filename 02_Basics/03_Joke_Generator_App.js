import https from "https"   // Built-in Node.js module to make HTTPS requests
import chalk from "chalk"   // Library for coloring terminal output

// Function to fetch a random joke from the API
const getJoke = () => {
    // API endpoint for jokes
    const url = `https://official-joke-api.appspot.com/random_joke`  

    // Make a GET request to the API
    https.get(url, (response) => {
        let data = ""   // Variable to collect data chunks as they arrive

        // "data" event → triggered when a new chunk of data is received
        response.on("data", (chunk) => {
            data += chunk   // Append chunks into 'data' string
        })

        // "end" event → triggered when all data is fully received
        response.on("end", () => {
            const joke = JSON.parse(data)   // Convert JSON string into JS object
            console.log(joke)   // Print raw joke object for debugging

            // Show formatted joke output
            console.log(`Here is a Random ${joke.type} Joke:`)
            console.log(`${chalk.red(joke.setup)}`)    // Setup part of the joke (red)
            console.log(`${chalk.blue.bgBlue.bold(joke.punchline)}`) // Punchline (blue + bold)
        })

        // "error" event → handles network or response errors
        response.on("error", (err) => {
            console.log(`Error Fetching The Joke: ${err.message}`)
        })
    })
}

// Call the function to actually fetch and print the joke
getJoke();
