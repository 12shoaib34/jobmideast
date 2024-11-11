import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { getLat, getLng } from "../../utils/helper";

export const Map = ({ location, data }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map && location) {
      map.setView([getLat(location), getLng(location)], 7);
    }
  }, [location]);

  return (
    <MapContainer
      zoom={16}
      scrollWheelZoom={false}
      center={[getLat(location), getLng(location)]}
      whenCreated={setMap}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
      />
      {data && (
        <Marker position={[getLat(location), getLng(location)]}>
          <Popup>{data.companyName}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};
