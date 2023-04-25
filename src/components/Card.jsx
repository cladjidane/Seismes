export const Card = (epave) => (
  <div className="col">
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <p className="card-title fw-bold">
          {epave.properties.nom ? epave.properties.nom : "Inconnu"}
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            Type{" "}
            {epave.properties.caract_bat
              ? epave.properties.caract_bat
              : "inconnu"}
          </small>
        </div>
        {epave.properties.circ_nauf && (
          <p className="text-danger">
            <hr />
            {epave.properties.circ_nauf}
          </p>
        )}
        {epave.properties.caract_obj && (
          <div>
            <hr />
            <h6>Notes</h6>
            <p className="card-text">{epave.properties.caract_obj}</p>
          </div>
        )}
      </div>
    </div>
  </div>
);
