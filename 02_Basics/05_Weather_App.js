import readline from "readline/promises";
import chalk from "chalk";

const APIKey = `706e259ab8fb31a1827d3a6ef48c9845`;
const Base_URL = `https://api.openweathermap.org/data/2.5/weather`;

const readLineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getWeather = async (city) => {
  const url = `${Base_URL}?q=${city}&appid=${APIKey}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found. Please check the city name.");
    }
    const weatherData = await response.json();

    console.log(chalk.blue.bold(`\nWeather Information:`));
    console.log(chalk.green(`City: ${weatherData.name}`));
    console.log(chalk.yellow(`Temperature: ${weatherData.main.temp} °C`));
    console.log(
      chalk.magenta(`Description: ${weatherData.weather[0].description}`)
    );
    console.log(chalk.cyan(`Humidity: ${weatherData.main.humidity}%`));
    console.log(chalk.red(`Wind Speed: ${weatherData.wind.speed} m/s\n`));
  } catch (error) {
    console.log(chalk.bgRed.white(error.message));
  }
};

const city = await readLineInterface.question(
  "Enter a City name to get its weather: "
); // ✅ await is needed here
await getWeather(city);
readLineInterface.close();
