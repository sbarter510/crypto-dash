import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { useLocation } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import LineChart from "./Line/Line";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard(props) {
  const [data, setData] = useState();
  const [historical, setHistorical] = useState();

  const coinName = useLocation();
  console.log(coinName.state.coinName.toLowerCase());

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/dashboard/${coinName.state.coinName.toLowerCase()}`
      )
      .then((res) => {
        return setData(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (data) {
      axios
        .get(
          `http://localhost:5000/historical/${coinName.state.coinName.toLowerCase()}`
        )
        .then((res) => {
          return setHistorical(res.data);
        })
        .catch((e) => console.log(e));
    }
  }, [data, coinName]);

  if (historical) {
    const labels = historical.prices.map((p) => new Date(p[0]).toDateString());
    const chartData = {
      labels,
      datasets: [
        {
          label: `Historical ${data.name} data`,
          data: historical.prices.map((p) => p[1]),
          borderColor: "rgb(255, 99, 132)",
          lineColor: "rgb(255, 99, 132)",
        },
      ],
    };
    return (
      <div className="dashboard-grid">
        <div className="description">
          <img id="dashboard-img" src={data.image.small} alt="logo" />
          <h1 id="dashboard-name">{data.name}</h1>
        </div>
        <div className="market-data">
          <p>
            Market cap: $
            {Intl.NumberFormat("en-US").format(data.market_data.market_cap.usd)}
          </p>
          <p>
            Total Volume: $
            {Intl.NumberFormat("en-US").format(
              data.market_data.total_volume.usd
            )}
          </p>
        </div>
        <div className="chart">
          <LineChart data={chartData} />
        </div>
      </div>
    );
  } else {
    return <h2>Loading</h2>;
  }
}
