"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ districts, onSelectDistrict }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      const filtered = districts.filter((district) =>
        district.toLowerCase().includes(term.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (district) => {
    setSearchTerm(district);
    setSuggestions([]);
    onSelectDistrict(district);
  };

  return (
    // পজিশনিং ঠিক করা হয়েছে: মাঝখানে (left-1/2 -translate-x-1/2) এবং উপরে একটু গ্যাপ (top-4)
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[450px] z-[1000]">
      
      {/* ইনপুট কন্টেইনার */}
      <div className="relative flex items-center w-full h-14 rounded-full shadow-2xl bg-white overflow-hidden border border-gray-200">
        
        {/* আইকন (বাম পাশে) */}
        <div className="pl-4 text-gray-400">
          <FaSearch />
        </div>

        <input
          type="text"
          placeholder="Search by district name..."
          className="w-full h-full px-4 text-gray-700 outline-none placeholder-gray-400 font-medium"
          value={searchTerm}
          onChange={handleSearch}
        />

        {/* সার্চ বাটন (ডান পাশে - ডেমোর মতো ডিজাইন) */}
        <button className="h-full px-8 bg-[#84cc16] hover:bg-[#65a30d] text-white font-bold text-sm transition-colors uppercase tracking-wider">
          Search
        </button>
      </div>

      {/* সাজেশন ড্রপডাউন */}
      {suggestions.length > 0 && (
        <ul className="menu bg-white w-full mt-2 rounded-xl shadow-2xl border border-gray-100 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2">
          {suggestions.map((district) => (
            <li key={district}>
              <button 
                onClick={() => handleSelect(district)}
                className="hover:bg-gray-50 text-gray-700 font-medium px-5 py-3 border-b border-gray-50 last:border-none flex items-center gap-3"
              >
                 <span className="text-red-500">📍</span> {district}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;