import readline from "readline/promises";
import chalk from "chalk";

const APIKey = `706e259ab8fb31a1827d3a6ef48c9845`;
const base_URL = `https://api.openweathermap.org/data/2.5/weather`;

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getWeather = async (city) => {
  const url = `${base_URL}?q=${city}&appid=${APIKey}&units=metric`;
  try {
    const resData = await fetch(url);
    if (!resData.ok) {
      throw new Error("City not found. Please check the city name.");
    }

    const weatherData = await resData.json();

    console.log(chalk.bold.cyan("\n🌤️  Weather Information"));
    console.log(chalk.green(`📍 City: ${weatherData.name}`));
    console.log(chalk.yellow(`🌡️  Temperature: ${weatherData.main.temp}°C`));
    console.log(
      chalk.magenta(`📝 Description: ${weatherData.weather[0].description}`)
    );
    console.log(chalk.blue(`💧 Humidity: ${weatherData.main.humidity}%`));
    console.log(chalk.red(`💨 Wind Speed: ${weatherData.wind.speed} m/s\n`));
  } catch (error) {
    console.log(chalk.bgRed.white(" Error: "), chalk.red(error.message));
  }
};

const city = await readLine.question(
  chalk.cyan("Enter a city name to get its weather info: ")
);

await getWeather(city);

readLine.close();
