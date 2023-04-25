import { colorPalet } from "../helpers";

export const Card = (epave) => (
  <div className="col">
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <p className="card-text">
          {epave.properties.nom ? epave.properties.nom : "Inconnu"}
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">Type {epave.properties.caract_bat ? epave.properties.caract_bat : 'inconnu'}</small>
        </div>
      </div>
    </div>
  </div>
);
