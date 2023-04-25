import * as React from "react";

function MapControls(props) {
  return (
    <div className="control-panel">
      <>
        <h3>Epave</h3>
        <h4>{props.properties.nom ? props.properties.nom : "Inconnu"}</h4>
        <p>
          Type :{" "}
          {props.properties.caract_bat
            ? props.properties.caract_bat
            : "Inconnu"}
        </p>
        <p>
          Prof. {props.properties.brassiage ? (props.properties.brassiage*1.8288).toFixed() + 'm' : 'inconnu'}
        </p>
      </>
      <hr />
    </div>
  );
}

export default React.memo(MapControls);
