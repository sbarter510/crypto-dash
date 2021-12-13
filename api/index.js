const express = require("express");
const CoinGecko = require("coingecko-api");
const { response } = require("express");
const CORS = require("cors");

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

app = express();
app.use(CORS());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const bitcoin = await CoinGeckoClient.coins.fetch("bitcoin", {});

    res.json(bitcoin.data);
  } catch (e) {
    console.log(e);
  }
});

app.get("/historical", async (req, res) => {
  try {
    const historical = await CoinGeckoClient.coins.fetchMarketChart("bitcoin", {
      days: "max",
    });
    console.log(historical);
    res.json(historical.data);
  } catch (e) {
    console.log(e);
  }
});

app.listen("5000", () => {
  console.log("Server is running on port 5000");
});
