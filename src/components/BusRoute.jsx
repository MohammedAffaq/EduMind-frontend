import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Bus, Home, MapPin } from 'lucide-react';

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

// Custom Icons
const busIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20]
});

const homeIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/25/25694.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

const stopIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// Component to handle map clicks for setting home location
const SetHomeMarker = ({ onSetHome, isSettingHome }) => {
  useMapEvents({
    click(e) {
      if (isSettingHome) {
        onSetHome(e.latlng);
      }
    },
  });
  return null;
};

// Component to update map center when bus moves
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, map.getZoom());
    }
  }, [center, map]);
  return null;
};

const BusRoute = ({ busLocation, routePath, stops, homeLocation, onSetHome, isSettingHome }) => {
  const center = busLocation ? [busLocation.lat, busLocation.lng] : [12.9716, 77.5946];

  return (
    <div className="h-full w-full rounded-xl overflow-hidden border border-gray-200 shadow-inner relative z-0">
      <MapContainer center={center} zoom={14} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={center} />
        <SetHomeMarker onSetHome={onSetHome} isSettingHome={isSettingHome} />

        {/* Route Path */}
        {routePath && <Polyline positions={routePath} color="blue" weight={4} opacity={0.6} />}

        {/* Bus Marker */}
        {busLocation && (
          <Marker position={[busLocation.lat, busLocation.lng]} icon={busIcon}>
            <Popup>School Bus<br/>Speed: {busLocation.speed}</Popup>
          </Marker>
        )}

        {/* Home Marker */}
        {homeLocation && (
          <Marker position={[homeLocation.lat, homeLocation.lng]} icon={homeIcon}>
            <Popup>Home Location</Popup>
          </Marker>
        )}

      </MapContainer>
      {isSettingHome && <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg z-[1000] text-sm font-bold animate-pulse">Click on map to set Home</div>}
    </div>
  );
};

export default BusRoute;