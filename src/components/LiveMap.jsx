import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet with Webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to update map center when coordinates change
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, map.getZoom());
    }
  }, [center, map]);
  return null;
};

const LiveMap = ({ markers = [], center = [12.9716, 77.5946], zoom = 13 }) => {
  // Ensure we have valid center
  const validCenter = (markers.length > 0 && markers[0].lat && markers[0].lng) 
    ? [markers[0].lat, markers[0].lng] 
    : center;

  return (
    <div className="h-full w-full rounded-xl overflow-hidden border border-gray-200 shadow-inner relative z-0">
      <MapContainer 
        center={validCenter} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={validCenter} />

        {markers.map((marker, idx) => (
          marker.lat && marker.lng ? (
            <Marker key={idx} position={[marker.lat, marker.lng]}>
              <Popup>
                <strong>{marker.title}</strong><br />
                {marker.description}
              </Popup>
            </Marker>
          ) : null
        ))}
      </MapContainer>
    </div>
  );
};

export default LiveMap;