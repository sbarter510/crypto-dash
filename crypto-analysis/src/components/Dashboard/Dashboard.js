import React from "react";
import "./dashboard.css";
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
  const labels = props.historical.prices.map((p) =>
    new Date(p[0]).toDateString()
  );
  const data = {
    labels,
    datasets: [
      {
        label: `Historical ${props.data.name} data`,
        data: props.historical.prices.map((p) => p[1]),
        borderColor: "rgb(255, 99, 132)",
        lineColor: "rgb(255, 99, 132)",
      },
    ],
  };

  return (
    <div className="dashboard-grid">
      <div className="description">
        <img id="dashboard-img" src={props.data.image.small} alt="logo" />
        <h1 id="dashboard-name">{props.data.name}</h1>
      </div>
      <div className="market-data">
        <p>
          Market cap: $
          {Intl.NumberFormat("en-US").format(
            props.data.market_data.market_cap.usd
          )}
        </p>
        <p>
          Total Volume: $
          {Intl.NumberFormat("en-US").format(
            props.data.market_data.total_volume.usd
          )}
        </p>
      </div>
      <div className="chart">
        <LineChart data={data} />
      </div>
    </div>
  );
}
