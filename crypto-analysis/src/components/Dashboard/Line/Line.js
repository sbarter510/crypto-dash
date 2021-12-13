import { Line } from "react-chartjs-2";

import React from "react";

//need to figure out ticks
export default function LineChart(props) {
  return (
    <Line
      data={props.data}
      options={{
        maintainAspectRatio: true,
        borderWidth: "2",
        pointRadius: 0,
        scales: {
          x: {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 12,
              maxRotation: 45,
            },
          },
        },
      }}
    />
  );
}
