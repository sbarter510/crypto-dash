import React, { useEffect, useState, useRef } from "react";
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
import Slider from "@mui/material/Slider";
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
  const [sliderVal, setSliderVal] = useState([0, 100]);
  const [range, setRange] = useState([0, 100]);

  const sliderRef = useRef();
  const sliderTwoRef = useRef();

  const coinName = useLocation();

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
          return setHistorical(() => {
            return res.data;
          });
        })
        .catch((e) => console.log(e));
    }

    // return () => {
    //   setHistorical([]);
    // };
  }, [data, coinName]);

  const sliderHandler = (e) => {
    var slider = e.target.value;
    const labelLength = historical.prices.length;

    setRange(() => {
      return [
        historical.prices[
          Math.floor(labelLength * (parseFloat(slider[0]) / 100))
        ][0],

        historical.prices[
          Math.floor(labelLength * (parseFloat(slider[1]) / 100))
        ][0],
      ];
    });

    setSliderVal(() => slider);
  };

  useEffect(() => {
    if (historical) {
      axios
        .get(
          `http://localhost:5000/dashboard/range/${coinName.state.coinName.toLowerCase()}/${
            range[0]
          }/${range[1]}`,
          { startDate: range[0], endDate: range[1] }
        )
        .then((res) => {
          console.log(res);

          return setHistorical(() => {
            return res.data;
          });
        });
    }
  }, [range]);

  function valuetext(value, marks) {
    return `This ran ${value}`;
  }
  const marks = [];
  if (historical) {
    const labels = historical.prices.map((p) => new Date(p[0]).toDateString());
    // console.log(labels);

    labels.map((date, idx) => {
      // console.log(date);
      if (idx % 365 === 0) {
        return marks.push({
          value: (idx / labels.length) * 100,
          label: date,
        });
      }
      return null;
    });

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
      <>
        <div className="dashboard-grid">
          <div className="description">
            <img id="dashboard-img" src={data.image.small} alt="logo" />
            <h1 id="dashboard-name">{data.name}</h1>
          </div>
          <div className="market-data">
            <p>
              Market cap: $
              {Intl.NumberFormat("en-US").format(
                data.market_data.market_cap.usd
              )}
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
        <div className="slider-container">
          <Slider
            value={sliderVal}
            getAriaValueText={valuetext}
            marks={marks}
            onChange={(e) => sliderHandler(e)}
            valueLabelDisplay="auto"
            ref={sliderRef}
          />
        </div>
      </>
    );
  } else {
    return <h2>Loading</h2>;
  }
}
