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
  coin = coin.replace(" ", "");

  try {
    const coinData = await CoinGeckoClient.coins.fetch(coin, {});
    if (coinData) {
      res.json(coinData.data);
    } else {
      res.json(coinData.response);
    }
  } catch (e) {
    console.log(e);
  }
});

//TODO: Error handling in case coin is not returned (some not returning historical data)
//Todo make range calls to coingecko api
app.get("/historical/:coin", async (req, res) => {
  var coin = req.params.coin;
  coin = coin.replace(" ", "");
  try {
    const historical = await CoinGeckoClient.coins.fetchMarketChart(coin, {
      days: "max",
    });

    res.json(historical.data);
  } catch (e) {
    console.log(e);
  }
});

app.get("/dashboard/range/:coin/:startDate/:endDate", async (req, res) => {
  var coin = req.params.coin;
  var startDate = req.params.startDate;
  var endDate = req.params.endDate;

  coin = coin.replace(" ", "");
  try {
    const historical = await CoinGeckoClient.coins.fetchMarketChartRange(coin, {
      from: parseInt(startDate.slice(0, 10)),
      to: parseInt(endDate.slice(0, 10)),
    });
    console.log(res);

    res.json(historical.data);
  } catch (e) {
    console.log(e);
  }
});

app.post("/all", async (req, res) => {
  let pageNumber = req.body.pageNumber;
  try {
    const allCoins = await CoinGeckoClient.coins.all({
      per_page: 10,
      page: pageNumber,
    });

    return res.json(allCoins.data);
  } catch (e) {
    console.log("that one", e.message);
  }
});

//fetch market chart 24 hour
app.post("/fetchmarketchart", async (req, res) => {
  try {
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
