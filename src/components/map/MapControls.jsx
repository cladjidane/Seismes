import * as React from "react";

function MapControls(props) {
  const date = new Date(props.properties.Date).toLocaleDateString(
    'fr'
  );
  return (
    <div className="control-panel">
      {props.type === "point" ? (
        <>
          <h3>Séisme</h3>
          <h4>{props.properties.Country}</h4>
          <p>Date : {date}</p>
          <p>Magnitude : {props.properties.Magnitude}</p>
          <p>Profondeur : {props.properties.Depth}</p>
        </>
      ) : (
        <>
        <h3>Plaque</h3>
        {props.properties.PlateName}</>
      )}
      <hr />
    </div>
  );
}

export default React.memo(MapControls);
