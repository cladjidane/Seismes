import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner, Stack } from "react-bootstrap";

import "./App.css";

import Home from "./pages/Home";
import List from "./pages/List";
// Data fake
import sourceEpaves from "./datas/epaves-ouest-france.json";

function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("home");
  const [epaves, setEpaves] = useState(null);

  useEffect(() => {
    // const url = "https://isenapi.koality.pw/api/epaves";
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(url);
    //     const json = await response.json();
    //     setEpaves(json.epaves);
    //     setLoading(false);
    //   } catch (error) {
    //     console.log("error", error);
    //   }
    // };

    // fetchData();
    setEpaves(sourceEpaves)
    setLoading(false);
  }, []);

  const changePage = (page) => {
    window.location.href = "#";
    setPage(page);
  };

  if (loading)
    return (
      <Stack>
        <Spinner
          animation="border"
          variant="primary"
          className="mx-auto mt-5"
        />
      </Stack>
    );
  if (page === "home") {
    return <Home epaves={epaves} changePage={changePage}></Home>;
  } else if (page === "list") {
    return <List epaves={epaves} changePage={changePage}></List>;
  }
}

export default App;
