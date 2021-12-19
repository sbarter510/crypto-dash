import React, { useEffect, useState, useCallback } from "react";
import "./allCoins.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";
import LineChart from "../Line/Line";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip
);

export default function AllCoins(props) {
  const [allCoinsLoaded, setAllCoinsLoaded] = useState(false);

  useEffect(() => {
    if (Object.keys(props.miniLineData).length === 10) {
      setAllCoinsLoaded(true);
    }
  }, [props.miniLineData]);

  const displayCoins = () => {
    return props.data.map((coin, index) => {
      const labels = props.miniLineData[coin.id].prices.map((p) =>
        new Date(p[0]).toDateString()
      );
      const data = {
        labels,
        datasets: [
          {
            label: "",
            data: props.miniLineData[`${coin.id}`].prices.map((p) => p[1]),
            width: 200,
            height: 100,
          },
        ],
      };

      return (
        <React.Fragment key={coin.id}>
          <div className="coinInfo">
            <div className="info-flex">
              <img
                src={coin.image.small}
                alt={`${coin.image.name}`}
                className="coin-logo"
              />
              <h2>{coin.name}</h2>
              <h3>${coin.market_data.current_price.usd}</h3>
            </div>
          </div>
          <div className="miniLine">
            <LineChart data={data} />
          </div>
          <div className="summary">
            <div>
              <h2>Percent Change</h2>
            </div>
            <div>
              <h2>Total Volume</h2>
            </div>
            <div>
              <h2>Market Cap</h2>
            </div>
            <div>
              <p
                style={{
                  color: `${
                    coin.market_data.price_change_percentage_24h < 0
                      ? "red"
                      : "green"
                  }`,
                }}
              >
                {parseFloat(
                  coin.market_data.price_change_percentage_24h
                ).toFixed(2)}
                %
              </p>
            </div>
            <div>
              <p>
                $
                {Intl.NumberFormat("en-US").format(
                  coin.market_data.market_cap.usd
                )}
              </p>
            </div>
            <div>
              <p>
                $
                {Intl.NumberFormat("en-US").format(
                  coin.market_data.market_cap.usd
                )}
              </p>
            </div>
          </div>
        </React.Fragment>
      );
    });
  };

  return (
    <div className="coinGrid">
      {allCoinsLoaded ? displayCoins() : <p>loading</p>}
    </div>
  );
}
