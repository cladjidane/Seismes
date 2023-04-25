export const layerPlatesBg = {
  id: "plaques-bg",
  type: "fill",
  source: "source-plates",
  paint: {
    "fill-color": "#0080ff",
    "fill-opacity": 0,
  },
};
export const layerPlatesBgHover = {
  id: "plaques-bg-hover",
  type: "fill",
  source: "source-plates",
  paint: {
    "fill-color": "red",
    "fill-opacity": 0.3,
  },
};
export const layerPlatesLines = {
  id: "plaques-lines",
  type: "line",
  source: "source-plates",
  layout: {},
  paint: {
    "line-color": "#000",
    "line-width": 1,
  },
};

export const layerSeismesPoints = {
  id: "seismes-points",
  type: "circle",
  source: "source-seismes",
  layout: {},
  paint: {
    "circle-radius": 8,
    "circle-color": "rgba(55,148,179,1)",
  },
};

export const clusterLayer = {
  id: "clusters",
  type: "circle",
  source: "source-seismes",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
        "step",
        ["get", "point_count"],
        "#fef2f2",
        0,
        "#fee2e2",
        10,
        "#fecaca",
        100,
        "#fca5a5",
        1000,
        "#ef4444",
        2000,
        "#dc2626",
        3000,
        "#b91c1c",
        4000,
        "#991b1b",
        5000,
        "#7f1d1d",
        6000,
        "#fef2f2",
      ],
    "circle-radius": ["step", ["get", "point_count"], 20, 10, 30, 75, 40],
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
};

export const clusterCountLayer = {
  id: "cluster-count",
  type: "symbol",
  source: "source-seismes",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};

export const unclusteredPointLayer = {
  id: "unclustered-point",
  type: "circle",
  source: "source-seismes",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#FFCC00",
    "circle-radius": 3,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
};
