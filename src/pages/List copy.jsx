import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const fetchData = async (url, callback) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    callback(json);
  } catch (error) {
    console.log("error", error);
  }
};

function List({ changePage }) {
  const [seismes, setSeismes] = useState(null);
  const [seismesFiltered, setSeismesFiltered] = useState([]);
  const [country, setCountry] = useState(null);
  const [magnitude, setMagnitude] = useState(0);
  const [perPage, setPerPage] = useState(1000);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const url = `https://isenapi.koality.pw/api/seismes/${perPage}`;
    fetchData(url, (json) => {
      setSeismes(json.seismes);
      setSeismesFiltered(json.seismes);
      setLoading(false);
    });
  }, []);

  const onChange = (e) => {
    let newFilters = [...filters];

    if (e.target.value === "") {
      newFilters = newFilters.filter((value, index, arr) => {
        if (value === e.target.name) {
          arr.splice(index, 1);
          return true;
        }
        return false;
      });
    } else {
      if(!newFilters.includes(e.target.name)) newFilters = [...newFilters, e.target.name]
    }

    console.log(newFilters);

    let r = seismes.filter(function (item) {
      for (var key in newFilters) {
        if (item[key] === undefined || item[key] != e.target.value)
          return false;
      }
      return true;
    });

    setFilters(newFilters);
  };

  useEffect(() => {
    if (!country) return;
    let datas = seismesFiltered.length > 0 ? seismesFiltered : seismes;
    let newSeismes = datas.filter((seisme) => {
      return seisme.pays === country;
    });
    setSeismesFiltered(newSeismes);
  }, [country]);

  useEffect(() => {
    if (!magnitude) return;
    let datas = seismesFiltered.length > 0 ? seismesFiltered : seismes;
    let newSeismes = datas.filter((seisme) => {
      return seisme.mag >= magnitude && seisme.mag < parseInt(magnitude) + 1;
    });
    setSeismesFiltered(newSeismes);
  }, [magnitude]);

  if (loading) return <>Chargement ...</>;
  else
    return (
      <div className="App">
        <Header></Header>
        <main>
          <div className="py-5 bg-light">
            <div className="container">
              <h2>Tous les séismes</h2>
              <div class="row g-5">
                <div class="col-md-7 col-lg-8 order-md-last">
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {seismesFiltered.length > 0 ? (
                      seismesFiltered.map((seisme, i) => (
                        <div key={`seisme-${i}`} className="col">
                          <div className="card shadow-sm">
                            <div className="card-body">
                              <p className="card-text">{seisme.pays}</p>
                              <div className="d-flex justify-content-between align-items-center">
                                <small className="text-muted">
                                  {new Date(seisme.instant).toLocaleDateString(
                                    "fr"
                                  )}
                                </small>
                                <small className="text-muted">
                                  Mag. {seisme.mag}
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <>
                        <p>Aucun résultas</p>
                      </>
                    )}
                  </div>
                  <span onClick={() => changePage("list")}>Retour</span>
                </div>
                <div class="col-md-5 col-lg-4">
                  <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-primary">Filtres</span>
                  </h4>
                  <div class="col">
                    <label for="country" class="form-label">
                      Pays
                    </label>
                    <select
                      name="pays"
                      class="form-select"
                      id="country"
                      required
                      onChange={onChange}
                    >
                      <option value="">Choose...</option>
                      <option>Alaska</option>
                      <option>Nevada</option>
                      <option>Mexico</option>
                      <option>California</option>
                      <option>PapuaNewGuinea</option>
                      <option>NewZealand</option>
                    </select>
                    <div class="invalid-feedback">
                      Veuillez choisir un pays valide
                    </div>
                  </div>
                  <div class="col">
                    <label for="mag" class="form-label">
                      State
                    </label>
                    <select
                      name="mag"
                      class="form-select"
                      id="mag"
                      required
                      onChange={onChange}
                    >
                      <option value="">Choose...</option>
                      <option value="0">moins de 1</option>
                      <option value="1">entre 1 et 2</option>
                      <option value="2">entre 2 et 3</option>
                      <option value="3">entre 3 et 4</option>
                      <option value="4">entre 4 et 5</option>
                      <option value="5">entre 5 et 6</option>
                      <option value="6">entre 6 et 7</option>
                      <option value="7">entre 7 et 8</option>
                    </select>
                    <div class="invalid-feedback">
                      Veuillez choisir une magnitude valide
                    </div>
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
