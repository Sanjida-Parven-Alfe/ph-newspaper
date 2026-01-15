"use client";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { FaTimes, FaArrowRight, FaMapMarkerAlt } from "react-icons/fa"; 

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const districtInfo = {
  "Dhaka": { coords: { lat: 23.8103, lng: 90.4125 }, division: "Dhaka Division" },
  "Chittagong": { coords: { lat: 22.3569, lng: 91.7832 }, division: "Chittagong Division" },
  "Sylhet": { coords: { lat: 24.8949, lng: 91.8687 }, division: "Sylhet Division" },
  "Rajshahi": { coords: { lat: 24.3636, lng: 88.6241 }, division: "Rajshahi Division" },
  "Khulna": { coords: { lat: 22.8456, lng: 89.5403 }, division: "Khulna Division" },
  "Barishal": { coords: { lat: 22.7010, lng: 90.3535 }, division: "Barishal Division" },
  "Rangpur": { coords: { lat: 25.7439, lng: 89.2752 }, division: "Rangpur Division" },
  "Mymensingh": { coords: { lat: 24.7471, lng: 90.4203 }, division: "Mymensingh Division" },
  "Cox's Bazar": { coords: { lat: 21.4272, lng: 92.0058 }, division: "Chittagong Division" },
  "Gazipur": { coords: { lat: 24.0023, lng: 90.4264 }, division: "Dhaka Division" },
  "Bogura": { coords: { lat: 24.8481, lng: 89.3730 }, division: "Rajshahi Division" },
  "Comilla": { coords: { lat: 23.4607, lng: 91.1809 }, division: "Chittagong Division" },
  "Jessore": { coords: { lat: 23.1634, lng: 89.2182 }, division: "Khulna Division" },
  "Faridpur": { coords: { lat: 23.6071, lng: 89.8407 }, division: "Dhaka Division" },
  "Gopalganj": { coords: { lat: 23.0051, lng: 89.8265 }, division: "Dhaka Division" }
};

function MapController({ location }) {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 9, {
        animate: true,
        duration: 1.5,
        paddingTopLeft: [0, 0] 
      });
    }
  }, [location, map]);
  return null;
}

const BangladeshMap = ({ newsData = [] }) => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [targetLocation, setTargetLocation] = useState(null);

  const districtNewsMap = {};
  newsData.forEach(news => {
    if (news.district && districtInfo[news.district]) {
      if (!districtNewsMap[news.district]) {
        districtNewsMap[news.district] = [];
      }
      districtNewsMap[news.district].push(news);
    }
  });

  const activeDistricts = Object.keys(districtNewsMap);

  const handleSelectDistrict = (districtName) => {
    const info = districtInfo[districtName];
    if (info) {
      setTargetLocation(info.coords);
      setSelectedDistrict({
        name: districtName,
        division: info.division,
        news: districtNewsMap[districtName] || []
      });
    }
  };

  return (
    <div className="relative w-full h-[650px] bg-base-200 rounded-xl shadow-xl overflow-hidden flex">
      
      <SearchBar 
        districts={Object.keys(districtInfo)} 
        onSelectDistrict={handleSelectDistrict} 
      />

      <div className="flex-grow h-full z-0 relative">
        <MapContainer 
          center={[23.6850, 90.3563]} 
          zoom={7} 
          scrollWheelZoom={true} 
          className="w-full h-full"
          zoomControl={false} 
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapController location={targetLocation} />

          {activeDistricts.map((district) => {
            const info = districtInfo[district];
            
            return (
              <Marker 
                key={district} 
                position={[info.coords.lat, info.coords.lng]} 
                icon={icon}
                eventHandlers={{
                  click: () => handleSelectDistrict(district), 
                }}
              >
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      {selectedDistrict && (
        <div className="absolute right-4 top-20 bottom-4 w-80 md:w-96 bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl z-[1000] flex flex-col animate-in slide-in-from-right duration-300 border border-gray-100">
          
          <div className="p-6 border-b border-gray-100 relative bg-gradient-to-br from-white to-gray-50">
            <button 
              onClick={() => setSelectedDistrict(null)}
              className="absolute top-4 right-4 btn btn-circle btn-xs btn-ghost text-gray-400 hover:bg-gray-200"
            >
              <FaTimes />
            </button>

            <span className="text-xs font-bold text-red-500 tracking-widest uppercase mb-1 block">
              Sara Desh
            </span>
            <h2 className="text-3xl font-bold text-gray-800 mb-1">
              {selectedDistrict.name}
            </h2>
            <p className="text-sm text-gray-500 font-medium italic">
              ({selectedDistrict.division})
            </p>

            <div className="mt-4 flex gap-3 items-start">
               <span className="text-4xl font-serif text-red-500 leading-none">T</span>
               <p className="text-xs text-gray-600 leading-relaxed">
                 o spotlight development, challenges, and opportunities in every district, 
                 the "Sara Desh" page curates stories from local readers and correspondents across {selectedDistrict.name}.
               </p>
            </div>
          </div>

          <div className="px-6 py-3 bg-gray-50 flex justify-between items-center border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-700 uppercase">District Coverage</h3>
            <span className="text-xs font-semibold text-gray-400">{selectedDistrict.news.length} Stories</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {selectedDistrict.news.slice(0, 5).map((news) => (
              <Link 
                key={news._id} 
                href={`/news/${news.category}/${news._id}`}
                className="block group bg-white p-3 rounded-xl border border-gray-100 hover:border-red-100 hover:shadow-md transition-all"
              >
                <div className="flex gap-3">
                  <div className="w-20 h-16 relative rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                    <Image 
                      src={news.image || "https://placehold.co/150"} 
                      alt={news.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-red-500 uppercase block mb-1">
                      {news.category}
                    </span>
                    <h4 className="text-sm font-bold text-gray-800 leading-tight line-clamp-2 group-hover:text-red-600 transition-colors">
                      {news.title}
                    </h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="p-4 border-t border-gray-100 bg-white">
            <Link 
              href={`/saradesh/${selectedDistrict.name}`} 
              className="btn btn-primary w-full text-white normal-case rounded-xl shadow-lg shadow-primary/30 flex items-center justify-between group"
            >
              <span>View All Stories</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};

export default BangladeshMap;