const express = require("express");
const CoinGecko = require("coingecko-api");
const { response } = require("express");
const CORS = require("cors");

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

app = express();
app.use(CORS());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/dashboard/:coin", async (req, res) => {
  var coin = req.params.coin;
  try {
    const coinData = await CoinGeckoClient.coins.fetch(coin, {});

    res.json(coinData.data);
  } catch (e) {
    console.log(e);
  }
});

app.get("/historical/:coin", async (req, res) => {
  var coin = req.params.coin;
  try {
    const historical = await CoinGeckoClient.coins.fetchMarketChart(coin, {
      days: "max",
    });
    console.log(historical);
    res.json(historical.data);
  } catch (e) {
    console.log(e);
  }
});

app.get("/all", async (req, res) => {
  try {
    const allCoins = await CoinGeckoClient.coins.all({
      per_page: 10,
    });
    // console.log(allCoins);
    return res.json(allCoins.data);
  } catch (e) {
    console.log("that one", e.message);
  }
});

//fetch market chart 24 hour
app.post("/fetchmarketchart", async (req, res) => {
  try {
    // console.log(typeof req.body.coinId);
    // console.log(req.body.days);
    const allCoins = await CoinGeckoClient.coins.fetchMarketChart(
      req.body.coinId,
      {
        days: req.body.days,
      }
    );
    return res.json(allCoins.data);
  } catch (e) {
    console.log("this one", e.message);
  }
});

app.listen("5000", () => {
  console.log("Server is running on port 5000");
});
