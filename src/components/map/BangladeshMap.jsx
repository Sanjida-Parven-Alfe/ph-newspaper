"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

// Leaflet Icon Fix
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// District Coordinates
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

// Fly To Logic
function FlyToLocation({ location }) {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 11, {
        animate: true,
        duration: 1.5
      });
    }
  }, [location, map]);
  return null;
}

const BangladeshMap = ({ newsData = [] }) => {
  const [targetLocation, setTargetLocation] = useState(null);

  // Group news by district
  const districtNewsMap = {};
  newsData.forEach(news => {
    if (news.district && districtCoordinates[news.district]) {
      if (!districtNewsMap[news.district]) {
        districtNewsMap[news.district] = [];
      }
      districtNewsMap[news.district].push(news);
    }
  });

  const activeDistricts = Object.keys(districtNewsMap);

  const handleSelectDistrict = (districtName) => {
    const coords = districtCoordinates[districtName];
    if (coords) {
      setTargetLocation(coords);
    }
  };

  const handleMarkerClick = (coords) => {
    setTargetLocation(coords);
  };

  return (
    // ✅ Main Wrapper (Relative Parent)
    <div className="relative w-full h-[600px] bg-base-200 rounded-xl shadow-xl">
      
      {/* 🔍 Search Bar - এখন ম্যাপ কন্টেইনারের বাইরে কিন্তু উপরে ভাসছে */}
      <SearchBar 
        districts={Object.keys(districtCoordinates)} 
        onSelectDistrict={handleSelectDistrict} 
      />

      {/* 🗺️ Map Container - Overflow Hidden এখানে অ্যাপ্লাই করা হয়েছে */}
      <div className="w-full h-full rounded-xl overflow-hidden z-0">
        <MapContainer 
          center={[23.6850, 90.3563]} 
          zoom={7} 
          scrollWheelZoom={true} 
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <FlyToLocation location={targetLocation} />

          {activeDistricts.map((district) => {
            const coords = districtCoordinates[district];
            const newsList = districtNewsMap[district];

            return (
              <Marker 
                key={district} 
                position={[coords.lat, coords.lng]} 
                icon={icon}
                eventHandlers={{
                  click: () => handleMarkerClick(coords),
                }}
              >
                <Popup className="min-w-[260px]">
                  <div className="p-1">
                    <div className="flex justify-between items-center border-b pb-2 mb-2">
                      <h3 className="text-lg font-bold text-red-600">{district}</h3>
                      <span className="badge badge-sm badge-neutral text-white">
                        {newsList.length} News
                      </span>
                    </div>
                    
                    <div className="flex flex-col gap-3 max-h-48 overflow-y-auto mb-3">
                      {newsList.slice(0, 3).map(news => (
                        <Link 
                          key={news._id} 
                          href={`/news/${news.category}/${news._id}`} 
                          className="flex items-start gap-2 hover:bg-gray-100 p-1.5 rounded-lg transition group"
                        >
                           <div className="w-12 h-10 relative rounded overflow-hidden flex-shrink-0 border border-gray-200">
                             <Image 
                               src={news.image || "https://placehold.co/100"} 
                               alt="thumb" 
                               fill 
                               className="object-cover" 
                             />
                           </div>
                           <div>
                             <h4 className="text-xs font-bold text-gray-800 group-hover:text-red-600 line-clamp-2 leading-tight">
                               {news.title}
                             </h4>
                             <span className="text-[10px] text-gray-500">
                               {new Date(news.createdAt).toLocaleDateString()}
                             </span>
                           </div>
                        </Link>
                      ))}
                    </div>

                    <div className="text-center pt-1 border-t">
                      <Link 
                        href={`/saradesh/${district}`} 
                        className="btn btn-xs btn-primary w-full text-white font-bold"
                      >
                        View All News of {district} ➜
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default BangladeshMap;