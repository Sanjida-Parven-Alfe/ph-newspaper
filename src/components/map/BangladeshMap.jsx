"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css"; 
import L from "leaflet";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar"; 

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


const districtCoordinates = {
  "Dhaka": { lat: 23.8103, lng: 90.4125 },
  "Chittagong": { lat: 22.3569, lng: 91.7832 },
  "Sylhet": { lat: 24.8949, lng: 91.8687 },
  "Rajshahi": { lat: 24.3636, lng: 88.6241 },
  "Khulna": { lat: 22.8456, lng: 89.5403 },
  "Barishal": { lat: 22.7010, lng: 90.3535 },
  "Rangpur": { lat: 25.7439, lng: 89.2752 },
  "Mymensingh": { lat: 24.7471, lng: 90.4203 },
  "Cox's Bazar": { lat: 21.4272, lng: 92.0058 },
  "Gazipur": { lat: 24.0023, lng: 90.4264 },
  "Bogura": { lat: 24.8481, lng: 89.3730 },
  "Comilla": { lat: 23.4607, lng: 91.1809 },
  "Jessore": { lat: 23.1634, lng: 89.2182 },
  "Faridpur": { lat: 23.6071, lng: 89.8407 },
  "Gopalganj": { lat: 23.0051, lng: 89.8265 }
};

function FlyToLocation({ location }) {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 10, {
        animate: true,
        duration: 2
      });
    }
  }, [location, map]);
  return null;
}

const BangladeshMap = ({ newsData = [] }) => { 
  const [targetLocation, setTargetLocation] = useState(null);

  const handleSelectDistrict = (districtName) => {
    const coords = districtCoordinates[districtName];
    if (coords) {
      setTargetLocation(coords);
    }
  };

  const districtList = Object.keys(districtCoordinates);

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-2xl border border-base-300 bg-base-200">
      
      <SearchBar 
        districts={districtList} 
        onSelectDistrict={handleSelectDistrict} 
      />

      <MapContainer 
        center={[23.6850, 90.3563]} 
        zoom={7} 
        scrollWheelZoom={true} 
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <FlyToLocation location={targetLocation} />

        {Object.entries(districtCoordinates).map(([name, coords]) => (
          <Marker key={name} position={[coords.lat, coords.lng]} icon={icon}>
            <Popup>
              <span className="font-bold text-red-600">{name}</span>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
};

export default BangladeshMap;