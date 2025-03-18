import React, { useState } from 'react';

export default function SearchBar({ className }) {
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    performanceType: [],
    venueType: [],
    genre: [],
    revenueSplit: []
  });

  // Filter options
  const filterOptions = {
    performanceType: ["Music", "Comedy", "Poetry & Spoken Word", "Dance", "Theater", "Experimental & Visual", "Other"],
    venueType: ["Bar", "Café", "Club", "Pub", "Restaurant", "Live Music Venue", "Theater", "Art Gallery", "Community Center", "Cultural Space", "Outdoor Venue", "Concert Hall", "Jazz Club", "Underground Venue", "Co-working Space", "Bookstore", "Hotel Lounge", "Rooftop Venue", "Pop-up Space", "Other"],
    genre: ["Rock", "Pop", "Hip-Hop", "Jazz", "Classical", "Electronic", "Folk", "Reggae", "Blues", "Indie", "Funk", "R&B", "Soul", "Punk", "Metal", "Alternative", "Experimental", "House", "Techno", "Country", "Latin", "Gospel", "Orchestral", "Afrobeats", "K-Pop", "Other"],
    revenueSplit: ["100/0", "80/20", "70/30", "50/50", "Other"]
  };

  // Handlers
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const toggleFilter = (filterType, value) => {
    setFilters(prevFilters => {
      const currentValues = prevFilters[filterType];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prevFilters,
        [filterType]: newValues
      };
    });
  };

  const handleSearch = () => {
    console.log("Searching with:", { searchTerm, location, filters });
    // Will connect to backend later
  };

  const resetFilters = () => {
    setFilters({
      performanceType: [],
      venueType: [],
      genre: [],
      revenueSplit: []
    });
  };

  return (
    <div className={`mt-8 ${className}`}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search for artists, venues, or events..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-6 py-4 bg-offwhite/10 backdrop-blur-sm border border-offwhite/30 rounded-3xl text-offwhite placeholder-offwhite/70 focus:outline-none focus:ring-2 focus:ring-green"
        />
        
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-20 top-1/2 transform -translate-y-1/2 text-offwhite/80 hover:text-offwhite"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
        </button>
        
        <button 
          onClick={handleSearch}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green hover:text-greenHover"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
      
      {showFilters && (
        <div className="mt-4 p-5 bg-offwhite/10 backdrop-blur-md border border-offwhite/30 rounded-xl text-offwhite">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="font-medium mb-2">Performance Type</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filterOptions.performanceType.map(option => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.performanceType.includes(option)}
                      onChange={() => toggleFilter('performanceType', option)}
                      className="w-4 h-4 rounded border-offwhite/50 text-green focus:ring-green bg-transparent"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Venue Type</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filterOptions.venueType.map(option => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.venueType.includes(option)}
                      onChange={() => toggleFilter('venueType', option)}
                      className="w-4 h-4 rounded border-offwhite/50 text-green focus:ring-green bg-transparent"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Music Genre</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filterOptions.genre.map(option => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.genre.includes(option)}
                      onChange={() => toggleFilter('genre', option)}
                      className="w-4 h-4 rounded border-offwhite/50 text-green focus:ring-green bg-transparent"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Revenue Split % (Artist/Venue)</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {filterOptions.revenueSplit.map(option => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.revenueSplit.includes(option)}
                      onChange={() => toggleFilter('revenueSplit', option)}
                      className="w-4 h-4 rounded border-offwhite/50 text-green focus:ring-green bg-transparent"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Location</h4>
                <input
                  type="text"
                  placeholder="City or zip code"
                  value={location}
                  onChange={handleLocationChange}
                  className="w-full px-3 py-2 bg-offwhite/10 border border-offwhite/30 rounded-md text-offwhite placeholder-offwhite/70 focus:outline-none focus:ring-1 focus:ring-green"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6 gap-4">
            <button 
              onClick={resetFilters}
              className="px-4 py-2 text-offwhite/80 hover:text-offwhite text-sm"
            >
              Reset Filters
            </button>
            <button 
              onClick={handleSearch}
              className="px-5 py-2 bg-green hover:bg-greenHover text-offwhite font-medium rounded-3xl transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
