import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { useEffect, useState } from "react";

function App() {
  // Définiton des variable d'état local (useState())
  const [loading, setLoading] = useState(true);
  const [seismes, setSeismes] = useState(null);

  // Définition de l'effet qui s'execute uniquement au chargement du composant
  useEffect(() => {
    const url = "https://isenapi.koality.pw/api/seismes/5000";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setSeismes(json.seismes);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []); // <- c'est le tableau vide qui permet de définir que cet effet ne se declanche qu'une fois

  // rendu
  if (loading) return <p>Chargement ...</p>;
  return (
    <div className="p-4">
      {seismes &&
        seismes.map((seisme, i) => (
          <div key={`seisme-${i}`} className="col">
            <div className="card shadow-sm mb-4">

              <div className="card-body">
                <p className="card-text">
                  {seisme.pays}
                  <span
                    className="float-end rounded-circle"
                    style={{
                      height: "20px",
                      width: "20px",
                      background: "gray",
                    }}
                  ></span>
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    {new Date(seisme.instant).toLocaleDateString("fr")}
                  </small>
                  <small className="text-muted">Mag. {seisme.mag}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default App;
