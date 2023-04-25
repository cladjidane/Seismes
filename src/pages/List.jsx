import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Card } from "../components/Card";
import { Filter } from "../components/Filter";

const perPage = 50;

function List({ epaves }) {
  const [epavesFiltered, setEpavesFiltered] = useState(epaves.features);
  const [next, setNext] = useState(perPage);

  const [filtres, setFiltres] = useState({});

  useEffect(() => {
    if (!epaves.features) return;
    let newEpaves = epaves.features.filter((epave, i) => {
      let correspondance = true;
      for (let critere in filtres) {
        if (filtres[critere].value === "") continue;
        switch (filtres[critere].type) {
          case "between":
            if (
              epave.properties[critere] < filtres[critere].value[0] ||
              epave.properties[critere] > filtres[critere].value[1]
            )
              correspondance = false;
            break;
          case "egal":
            if (epave.properties[critere] === null) {
              correspondance = false;
              break;
            }
            console.log(i)
            console.log(epave.properties[critere])
            console.log(filtres[critere].value)
            if (!epave.properties[critere].toLowerCase().includes(filtres[critere].value.toLowerCase()))
              correspondance = false;
            break;
        }
      }

      return correspondance;
    });
    setEpavesFiltered(newEpaves);
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

  const handleMoreEpaves = () => {
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
                  Toutes les épaves
                  <span class="text-secondary float-end">
                    {epavesFiltered.length}
                  </span>
                </h2>
                <div className="row row-cols-1">
                  {epavesFiltered.length > 0 ? (
                    epavesFiltered
                      .slice(0, next)
                      .map((epave, i) => <Card {...epave} key={`epave-${i}`} />)
                  ) : (
                    <p>Aucun résultat</p>
                  )}
                </div>
                <Button className="mt-4" onClick={handleMoreEpaves}>
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
                    field="type_obj"
                    label="Type de navire"
                    type="egal"
                    options={[
                      {
                        name: "Bateau de pêche, chalutier",
                        value: "Bateau de pêche, chalutier",
                      },
                      { name: "Bateau à vapeur", value: "Bateau à vapeur" },
                      { name: "Remorqueur", value: "Remorqueur" },
                      { name: "Navire marchand", value: "Navire marchand" },
                      { name: "Sous-marin", value: "Sous-marin" },
                    ]}
                  />

                  <Filter
                    onChange={handleFiltresChange}
                    field="brassiage"
                    label="Profondeur"
                    type="between"
                    options={[
                      { name: "Moins de 10 mètres", value: [0, 10 / 1.829] },
                      {
                        name: "Entre 10 et 20 mètres",
                        value: [10 / 1.829, 20 / 1.829],
                      },
                      {
                        name: "Entre 20 et 30 mètres",
                        value: [20 / 1.829, 30 / 1.829],
                      },
                      {
                        name: "Entre 30 et 40 mètres",
                        value: [30 / 1.829, 40 / 1.829],
                      },
                      {
                        name: "Entre 40 et 50 mètres",
                        value: [40 / 1.829, 50 / 1.829],
                      },
                      {
                        name: "Entre 50 et 60 mètres",
                        value: [50 / 1.829, 60 / 1.829],
                      },
                      {
                        name: "Entre 60 et 70 mètres",
                        value: [60 / 1.829, 70 / 1.829],
                      },
                      {
                        name: "Plus de 80 mètres",
                        value: [70 / 1.829, 2000 / 1.829],
                      },
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
