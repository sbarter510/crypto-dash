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

import { Navigate, useNavigate } from "react-router-dom";
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
  const [active, setActive] = useState({
    day: true,
    week: "",
    month: "",
    year: "",
  });

  useEffect(() => {
    if (Object.keys(props.miniLineData).length === 10) {
      setAllCoinsLoaded(true);
    }
  }, [props.miniLineData]);

  const onClickHandler = (e) => {
    console.log(e.target.innerText);
    switch (e.target.innerText) {
      case "Day":
        setActive(() => {
          return { day: true, week: "", month: "", year: "" };
        });
        props.setMiniLineRange(() => {
          return { days: "1" };
        });
        break;
      case "Week":
        setActive(() => {
          return { day: "", week: true, month: "", year: "" };
        });
        props.setMiniLineRange(() => {
          return { days: "7" };
        });
        break;
      case "Month":
        setActive(() => {
          return { day: "", week: "", month: true, year: "" };
        });
        props.setMiniLineRange(() => {
          return { days: "30" };
        });
        break;
      case "Year":
        setActive(() => {
          return { day: "", week: "", month: "", year: true };
        });
        props.setMiniLineRange(() => {
          return { days: "365" };
        });
        break;
      default:
        return null;
    }
  };

  //useNavigate is a hook that allows us to navigate to a new page
  const navigate = useNavigate();

  const coinClickedHandler = (e) => {
    const coinName = e.target.innerText.split("\n")[0];
    return navigate("/" + coinName, { state: { coinName: coinName } });
  };

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
            <div className="info-flex" onClick={(e) => coinClickedHandler(e)}>
              <img
                src={coin.image.small}
                alt={`${coin.image.name}`}
                className="coin-logo"
              />
              <h2>{coin.name}</h2>
              <h3>
                $
                {Intl.NumberFormat("en-US").format(
                  coin.market_data.current_price.usd
                )}
              </h3>
            </div>
          </div>
          <div className="miniLine">
            <LineChart data={data} />
          </div>
          <div className="summary">
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
                  coin.market_data.total_volume.usd
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
      <div className="info-header">
        <h2>Coin</h2>
      </div>
      <div className="chart-header">
        <div
          className={`day-header ${active.day ? "active" : ""}`}
          onClick={(e) => onClickHandler(e)}
        >
          <h2>Day</h2>
        </div>
        <div
          className={`week-header ${active.week ? "active" : ""}`}
          onClick={(e) => onClickHandler(e)}
        >
          <h2>Week</h2>
        </div>
        <div
          className={`month-header ${active.month ? "active" : ""}`}
          onClick={(e) => onClickHandler(e)}
        >
          <h2>Month</h2>
        </div>
        <div
          className={`year-header ${active.year ? "active" : ""}`}
          onClick={(e) => onClickHandler(e)}
        >
          <h2>Year</h2>
        </div>
      </div>
      <div className="summary-header">
        <div>
          <h2>% Change</h2>
        </div>
        <div>
          <h2>Total Volume</h2>
        </div>
        <div>
          <h2>Market Cap</h2>
        </div>
      </div>

      {allCoinsLoaded ? displayCoins() : <p>loading</p>}
    </div>
  );
}
