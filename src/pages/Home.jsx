import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

import { Mapheader } from "../components/map/Mapheader";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { colorPalet } from "../helpers";


function Home({ epaves, changePage }) {
  const _renderCards = () => {
    const lastEpaves = epaves.features.filter((epave => epave.properties.nom)).slice(-6);

    return lastEpaves.map((epave, i) => (
      <div key={`epave-${i}`} className="col">
        <div className="card shadow-sm">
          <img
            alt="static Mapbox map of the San Francisco bay area"
            src={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-l+FF0000(${epave.geometry.coordinates[0]},${epave.geometry.coordinates[1]})/${epave.geometry.coordinates[0]},${epave.geometry.coordinates[1]},4,0.00,0.00/400x200@2x?access_token=pk.eyJ1IjoiamVvZnVuIiwiYSI6ImNrd3huZXZjMzAwMWkycXFtb29zeDMxdnMifQ.N0SyKbZ6Br7bCL0IPmUZIg`}
          />

          <div className="card-body">
            <p className="card-text">
              {epave.properties.nom ? epave.properties.nom : "Inconnu"}
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">Type {epave.properties.caract_bat ? epave.properties.caract_bat : 'inconnu'}</small>
              <small className="text-muted">Prof. {epave.properties.brassiage ? (epave.properties.brassiage*1.8288).toFixed() + 'm' : 'inconnu'}</small>
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
        {epaves && <Mapheader epaves={epaves}></Mapheader>}
        <div className="album py-5 bg-light">
          <div className="container">
            <h2>Dernières épaves</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {epaves && _renderCards()}
            </div>
            <Button
              variant="dark"
              className="my-5"
              onClick={() => changePage("list")}
            >
              Liste de toutes les épaves
            </Button>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default Home;
