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
  Tooltip,
  Legend
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
      console.log(props.miniLineData[coin.id].prices[0]);

      const labels = props.miniLineData[coin.id].prices.map((p) =>
        new Date(p[0]).toDateString()
      );
      const data = {
        labels,
        data: props.miniLineData[`${coin.id}`].prices.map((p) => p[1]),
        datasets: [
          {
            label: "",
            data: props.miniLineData[`${coin.id}`].prices.map((p) => p[1]),
            color: "rgb(0, 99, 132)",
            lineColor: "rgb(0, 150, 132)",

            fillColor: "rgba(0, 99, 132, 0.2)",
            backgroundColor: "rgb(0, 99, 99)",
          },
        ],
      };

      return (
        <>
          <div className="coinInfo" key={coin.id}>
            <img src={coin.image.small} alt={`${coin.image.name}`} />
            <h3>{coin.name}</h3>
          </div>
          <div className="miniLine">
            <LineChart data={data} />
          </div>
          <div className="summary">
            <p
              style={{
                color: `${
                  coin.market_data.price_change_percentage_24h < 0
                    ? "red"
                    : "blue"
                }`,
              }}
            >
              {coin.market_data.price_change_percentage_24h}
            </p>
          </div>
        </>
      );
    });
  };

  return (
    <div className="coinGrid">
      {/* {props.loaded ? displayCoins() : <h2>loading</h2>} */}
      {allCoinsLoaded ? displayCoins() : <p>loading</p>}
    </div>
  );
}
