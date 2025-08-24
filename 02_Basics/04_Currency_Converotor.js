import https from "https";
import readline from "readline";
import chalk from "chalk";

const readLineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const APIKey = `2586a3e8d5b80c99ed2b09da`;
const URL = `https://v6.exchangerate-api.com/v6/${APIKey}/latest/USD`;

const convertCurrency = (amount, rate) => {
  return (amount * rate).toFixed(2);
};

https.get(URL, (response) => {
  let data = "";
  // with the help of this response we can listen
  // data, end, error Events
  response.on("data", (chunk) => {
    data += chunk;
  });

  response.on("end", () => {
    const currencyRates = JSON.parse(data).conversion_rates;

    console.log(currencyRates);
    readLineInterface.question("Enter Amount in USD: ", (amount) => {
      readLineInterface.question("Enter The Target Currency: ", (currency) => {
        const rate = currencyRates[currency.toUpperCase()];
        if (rate) {
          console.log(
            chalk.bgBlue.white(
              `${amount} USD is Approximately ${convertCurrency(
                amount,
                rate
              )} ${currency}`
            )
          );
        } else {
          console.log("Invalid Currency Code");
        }
        readLineInterface.close();
      });
    });
  });
});
