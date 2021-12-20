import { Line } from "react-chartjs-2";

import React from "react";

//need to figure out ticks
export default function LineChart(props) {
  return (
    <Line
      data={props.data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        borderWidth: "2",
        borderColor: "rgb(0, 99, 132)",
        pointRadius: 0,
        animation: false,
        plugins: {
          legend: {
            display: false,
          },
        },

        scales: {
          myScale: {
            display: false,
          },
          x: {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 1,
              maxRotation: 45,
              display: false,
            },
          },
          y: {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 1,
              maxRotation: 45,
              display: false,
            },
          },
        },
      }}
    />
  );
}
