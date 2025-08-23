import https from "https";
import chalk from "chalk";

const url = `https://official-joke-api.appspot.com/random_joke`;

const getJoke = () => {
  let data = "";

  https
    .get(url, (res) => {
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const joke = JSON.parse(data);

          console.log(chalk.green("\nHere is a random joke:"));
          console.log(chalk.red(joke.setup));
          console.log(chalk.blue.bold(joke.punchline));
        } catch (err) {
          console.error(chalk.bgRed.white("Error parsing joke data"), err);
        }
      });
    })
    .on("error", (err) => {
      console.error(chalk.bgRed.white("Request failed:"), err.message);
    });
};

getJoke();
