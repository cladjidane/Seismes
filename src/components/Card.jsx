import { colorPalet } from "../helpers";

export const Card = (seisme) => (
  <div className="col">
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <p className="card-text">
          {seisme.pays}{" "}
          <span
            className="float-end rounded-circle"
            style={{
              height: "20px",
              width: "20px",
              background: colorPalet[Math.round(seisme.mag)],
            }}
          ></span>
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            {new Date(seisme.instant).toLocaleDateString("fr")}
          </small>
          <small>Mag. {seisme.mag}</small>
        </div>
      </div>
    </div>
  </div>
);
