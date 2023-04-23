import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

import { Mapheader } from "../components/map/Mapheader";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

function Home({ seismes, changePage }) {
  const _render = () => {
    const lastSeismes = seismes.slice(-6);
    
    return lastSeismes.map((seisme, i) => (
      <div key={`seisme-${i}`} className="col">
        <div className="card shadow-sm">
          <img
            alt="static Mapbox map of the San Francisco bay area"
            src={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-l+FF0000(${seisme.lon},${seisme.lat})/${seisme.lon},${seisme.lat},4,0.00,0.00/400x200@2x?access_token=pk.eyJ1IjoiamVvZnVuIiwiYSI6ImNrd3huZXZjMzAwMWkycXFtb29zeDMxdnMifQ.N0SyKbZ6Br7bCL0IPmUZIg`}
          />

          <div className="card-body">
            <p className="card-text">{seisme.pays}</p>
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">{new Date(seisme.instant).toLocaleDateString('fr')}</small>
              <small className="text-muted">Mag. {seisme.mag}</small>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="App">
      <Header></Header>
      <main>
        {seismes && <Mapheader seismes={seismes}></Mapheader>}
        <div className="album py-5 bg-light">
          <div className="container">
            <h2>Derniers séismes</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {seismes && _render()}
            </div>
            <Button variant="dark" className="my-5" onClick={() => changePage("list")}>
              Liste de tous les séismes
            </Button>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default Home;
