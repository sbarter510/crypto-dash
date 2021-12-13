import React from "react";
import LineChart from "../Line/Line";

export default function Historical() {
  return (
    <div className="historical-grid">
      <div className="description">
        <img id="historical-img" src={props.data.image.small} alt="logo" />
        <h1 id="historical-name">{props.data.name}</h1>
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
