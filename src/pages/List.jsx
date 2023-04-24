import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Card } from "../components/Card";
import { Filter } from "../components/Filter";

const perPage = 50

function List({ seismes }) {
  const [seismesFiltered, setSeismesFiltered] = useState(seismes);
  const [next, setNext] = useState(perPage);

  const [filtres, setFiltres] = useState({});

  useEffect(() => {
    if (!seismes) return;
    let newSeismes = seismes.filter((seisme) => {
      let correspondance = true;
      for (let critere in filtres) {
        if (filtres[critere].value === "") continue;
        switch (filtres[critere].type) {
          case "between":
            if (
              seisme[critere] < filtres[critere].value[0] ||
              seisme[critere] > filtres[critere].value[1]
            )
              correspondance = false;
            break;
          case "egal":
            if (seisme[critere] !== filtres[critere].value)
              correspondance = false;
            break;
        }
      }

      return correspondance;
    });
    setSeismesFiltered(newSeismes);
  }, [filtres]);

  const handleFiltresChange = (e) => {
    const field = e.target.name;
    const fieldType = e.target.getAttribute("data-type");
    let fieldValue;
    switch (fieldType) {
      case "between":
        fieldValue = e.target.value.split(",");
        break;
      default:
        fieldValue = e.target.value;
        break;
    }

    setFiltres({
      ...filtres,
      [field]: { value: fieldValue, type: fieldType },
    });
  };

  const handleMoreSeismes = () => {
    setNext(next + perPage);
  };

  return (
    <div className="App">
      <Header></Header>
      <main>
        <div className="py-5 bg-light">
          <div className="container">
            <div class="row g-5">
              <div class="col-md-7 col-lg-8 order-md-last">
                <h2>
                  Tous les séismes
                  <span class="text-secondary float-end">{seismesFiltered.length}</span>
                </h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
                  {seismesFiltered.length > 0 ? (
                    seismesFiltered
                      .slice(0, next)
                      .map((seisme, i) => (
                        <Card {...seisme} key={`seisme-${i}`} />
                      ))
                  ) : (
                    <p>Aucun résultat</p>
                  )}
                </div>
                <Button className="mt-4" onClick={handleMoreSeismes}>
                  En voir +
                </Button>
              </div>

              <div class="col-md-5 col-lg-4">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                  <span class="text-primary">Filtres</span>
                </h4>
                <div class="col">
                  <Filter
                    onChange={handleFiltresChange}
                    field="pays"
                    type="egal"
                    options={[
                      { name: "Alaska", value: "Alaska" },
                      { name: "Mexico", value: "Mexico" },
                      { name: "California", value: "California" },
                      { name: "NewZealand", value: "NewZealand" },
                      { name: "Fiji", value: "Fiji" },
                    ]}
                  />

                  <Filter
                    onChange={handleFiltresChange}
                    field="mag"
                    type="between"
                    options={[
                      { name: "Moins de 1", value: [0, 1] },
                      { name: "Entre 1 et 2", value: [1, 2] },
                      { name: "Entre 2 et 3", value: [2, 3] },
                      { name: "Entre 3 et 4", value: [3, 4] },
                      { name: "Entre 4 et 5", value: [4, 5] },
                      { name: "Entre 5 et 6", value: [5, 6] },
                      { name: "Entre 6 et 7", value: [6, 7] },
                      { name: "Entre 7 et 8", value: [7, 8] },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default List;
