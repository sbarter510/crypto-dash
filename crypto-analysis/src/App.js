import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";
import AllCoins from "./components/Dashboard/AllCoins/AllCoins";

function App() {
  axios.defaults.headers = {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  };
  //currently only getting bitcoin data
  const [data, setData] = useState();
  const [historical, setHistorical] = useState();
  const [allData, setAllData] = useState([]);
  const [miniLineData, setMiniLineData] = useState({});
  const [isLoading, setIsLoading] = useState({ isLoading: true });
  const [loaded, setLoaded] = useState({ loaded: false });

  // useEffect(() => {
  //   let fetchData = async () => {
  //     await axios
  //       .get("http://localhost:5000/")
  //       .then((res) => {
  //         return setData(res.data);
  //       })
  //       .catch((e) => console.log(e));
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   let fetchData = async () => {
  //     await axios
  //       .get("http://localhost:5000/historical")
  //       .then((res) => {
  //         return setHistorical(res.data);
  //       })
  //       .catch((e) => console.log(e));
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/all")
      .then((res) => {
        return setAllData(() => res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (allData) {
      allData.map((coin) => {
        return axios
          .post(
            "http://localhost:5000/fetchmarketchart",
            { coinId: coin.id },
            { headers: { "content-type": "application/json" } }
          )
          .then((res) => {
            setMiniLineData((prevState) => {
              return { ...prevState, [coin.id]: res.data };
            });
          })
          .catch((e) => console.log(e));
      });
    }
  }, [allData]);

  useEffect(() => {
    if (miniLineData) {
      return setIsLoading(() => {
        return { isLoading: false };
      });
    } else {
      return null;
    }
  }, [miniLineData]);

  useEffect(() => {
    if (isLoading.isLoading === false) {
      setLoaded(() => {
        return { loaded: true };
      });
    }
  }, [isLoading]);

  return (
    <div className="App">
      <div className="container">
        {loaded.loaded && (
          <AllCoins
            data={allData}
            miniLineData={miniLineData}
            loaded={loaded.loaded}
          />
        )}
        {/* {data && historical ? (
          <Dashboard data={data} historical={historical} />
        ) : null} */}
      </div>
    </div>
  );
}

export default App;
