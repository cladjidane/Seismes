import { colorPalet } from "./helpers";
import Badge from "react-bootstrap/Badge";

export const Card = (seisme) => (
  <div className="col">
    <div className="card shadow-sm">
      <div className="card-body">
        <p className="card-text">{seisme.pays}</p>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            {new Date(seisme.instant).toLocaleDateString("fr")}
          </small>
          <small>
            Mag.
            <span  style={{
            height: "10px",
            background: colorPalet[Math.round(seisme.mag)],
          }}>{seisme.mag}</span>
          </small>
        </div>
      </div>
    </div>
  </div>
);
