import * as React from "react";
import { useEffect, useState, useMemo, useCallback } from "react";

import Map, { Source, Layer, Popup, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./mapstyles";
import MapControls from "./MapControls";

export const Mapheader = ({ epaves }) => {
  const [hoverInfo, setHoverInfo] = useState(null);
  const [point, setPoint] = useState(null);
  const [cursor, setCursor] = useState('auto');

  const onHover = useCallback((event) => {
    const feature = event.features && event.features[0];
    if(!feature) return
    setHoverInfo({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
      type: 'point',
      properties: feature && feature.properties,
    });
  }, []);

  const onMouseEnter = useCallback(() => setCursor('pointer'), []);
  const onMouseLeave = useCallback(() => setCursor('auto'), []);

  return (
    <section className="w-100 position-relative">
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 1,
          renderWorldCopies: false,
        }}
        style={{ width: "100%", height: "80vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={
          "pk.eyJ1IjoiamVvZnVuIiwiYSI6ImNrd3huZXZjMzAwMWkycXFtb29zeDMxdnMifQ.N0SyKbZ6Br7bCL0IPmUZIg"
        }
        interactiveLayerIds={["unclustered-point"]}
        cursor={cursor}
        projection="globe"
        onClick={false}
        scrollZoom={false}
        onMouseMove={onHover}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <NavigationControl />

        <Source
          id="source-seismes"
          type="geojson"
          data={epaves}
          cluster={false}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </Map>

      {hoverInfo && <MapControls {...hoverInfo} />}
    </section>
  );
};
