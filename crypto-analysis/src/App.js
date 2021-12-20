import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";
import AllCoins from "./components/Dashboard/AllCoins/AllCoins";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import useWithRouter from "./hooks/useWithRouter";

function App() {
  axios.defaults.headers = {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  };
  //currently only getting bitcoin data

  const [allData, setAllData] = useState([]);
  const [miniLineData, setMiniLineData] = useState({});
  const [miniLineRange, setMiniLineRange] = useState({ days: "1" });
  const [isLoading, setIsLoading] = useState({ isLoading: true });
  const [loaded, setLoaded] = useState({ loaded: false });

  useEffect(() => {
    axios
      .get("http://localhost:5000/all")
      .then((res) => {
        return setAllData(() => res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  //TODO: Update the coin summary based on time scale

  useEffect(() => {
    if (allData) {
      allData.map(async (coin) => {
        return axios
          .post(
            "http://localhost:5000/fetchmarketchart",
            { coinId: coin.id, days: miniLineRange.days },
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
  }, [allData, miniLineRange.days]);

  useEffect(() => {
    if (miniLineData) {
      return setIsLoading(() => {
        return { isLoading: false };
      });
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
    <Router>
      <div className="App">
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <AllCoins
                  data={allData}
                  miniLineData={miniLineData}
                  loaded={loaded.loaded}
                  setMiniLineRange={setMiniLineRange}
                />
              }
            >
              {/* {loaded.loaded && (
              <AllCoins
                data={allData}
                miniLineData={miniLineData}
                loaded={loaded.loaded}
              />
              )} */}
            </Route>
            <Route path="/:coin" element={<Dashboard />}></Route>
          </Routes>
          {/* {data && historical ? (
          <Dashboard data={data} historical={historical} />
        ) : null} */}
        </div>
      </div>
    </Router>
  );
}

export default App;
