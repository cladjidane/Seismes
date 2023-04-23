import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./pages/Home"
import List from "./pages/List"

function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("home");
  const [seismes, setSeismes] = useState(null);

  useEffect(() => {
    const url = "https://isenapi.koality.pw/api/seismes/50000";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setSeismes(json.seismes);
        setLoading(false)
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  const changePage = (page) => {
    setPage(page)
  }

  if (loading) return <>Chargement ...</>;
  if (page === "home") {
    return <Home seismes={seismes} changePage={changePage}></Home>
  }
  else if(page === "list") {
    return <List seismes={seismes} changePage={changePage}></List>
  }
}

export default App;
