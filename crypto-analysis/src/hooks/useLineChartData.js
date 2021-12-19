const useLineChartData = (coin, miniLineData) => {
  const labels = miniLineData[coin.id].prices.map((p) =>
    new Date(p[0]).toDateString()
  );
  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: miniLineData[`${coin.id}`].prices.map((p) => p[1]),
        lineColor: "rgb(0, 99, 132)",
        color: "rgb(0, 99, 132)",
        options: {
          scales: {
            xAxes: [
              {
                ticks: {
                  display: false,
                },
              },
            ],
          },
        },
      },
    ],
  };
  return data;
};

export default useLineChartData;
