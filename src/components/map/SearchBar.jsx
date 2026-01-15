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
    <div className="absolute top-4 left-4 right-4 md:left-12 md:w-80 z-[1000]">
      <div className="relative">
        <input
          type="text"
          placeholder="Search District..."
          className="input input-bordered w-full shadow-lg pr-12 rounded-full border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white/95 backdrop-blur-sm h-12 text-sm"
          value={searchTerm}
          onChange={handleSearch}
        />
        
        <button className="absolute right-2 top-2 btn btn-sm btn-circle btn-primary text-white shadow-md border-none hover:bg-primary-focus">
          <FaSearch className="w-4 h-4" />
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="menu bg-white/95 backdrop-blur-md w-full mt-2 rounded-xl shadow-xl border border-base-200 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2">
          {suggestions.map((district) => (
            <li key={district}>
              <button 
                onClick={() => handleSelect(district)}
                className="hover:bg-primary/10 hover:text-primary font-medium px-4 py-2 flex items-center gap-2"
              >
                <span className="text-red-500 text-lg">📍</span> {district}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;