export const sourceSeismes = (seismes) => {
  const features = seismes.map((seisme) => {
    return {
      type: "Feature",
      properties: {
        Country: seisme.pays,
        Date: seisme.instant,
        Magnitude: seisme.mag,
        Depth: seisme.profondeur,
      },
      geometry: {
        type: "Point",
        coordinates: [seisme.lon, seisme.lat],
      },
    };
  });

  return {
    type: "FeatureCollection",
    features: features,
  };
};
