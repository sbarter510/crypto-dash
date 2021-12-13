import axios from "axios";
import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";

function App() {
  //currently only getting bitcoin data
  const [data, setData] = useState();
  const [historical, setHistorical] = useState();

  useEffect(() => {
    let fetchData = async () => {
      await axios
        .get("http://localhost:5000/")
        .then((res) => {
          return setData(res.data);
        })
        .catch((e) => console.log(e));
    };

    fetchData();
  }, []);

  useEffect(() => {
    let fetchData = async () => {
      await axios
        .get("http://localhost:5000/historical")
        .then((res) => {
          return setHistorical(res.data);
        })
        .catch((e) => console.log(e));
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="container">
        {data && historical ? (
          <Dashboard data={data} historical={historical} />
        ) : null}
      </div>
    </div>
  );
}

export default App;
