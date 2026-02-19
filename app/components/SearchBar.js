'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();

  // Debounced search
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        fetchSearchResults(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSearchResults = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://exercisedb.dev/api/v1/exercises/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSearchResults(data.data || []);
      setShowResults(true);
    } catch (error) {
      console.error('Error searching exercises:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExerciseClick = (exerciseId) => {
    router.push(`/${exerciseId}`);
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className={`search-wrapper ${isFocused ? 'focused' : ''}`}>
        <svg 
          className="search-icon" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          type="text"
          placeholder="Search exercises..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="search-input"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSearchResults([]);
              setShowResults(false);
            }}
            className="search-clear"
            aria-label="Clear search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="search-results">
          {isLoading ? (
            <div className="search-loading">Searching...</div>
          ) : searchResults.length > 0 ? (
            <>
              <div className="search-results-header">
                {searchResults.length} exercise{searchResults.length !== 1 ? 's' : ''} found
              </div>
              <div className="search-results-list">
                {searchResults.slice(0, 8).map((exercise) => (
                  <div
                    key={exercise.exerciseId}
                    className="search-result-item"
                    onClick={() => handleExerciseClick(exercise.exerciseId)}
                  >
                    <img 
                      src={exercise.gifUrl} 
                      alt={exercise.name}
                      className="search-result-image"
                    />
                    <div className="search-result-info">
                      <h4 className="search-result-name">{exercise.name}</h4>
                      <div className="search-result-meta">
                        {exercise.targetMuscles && exercise.targetMuscles[0] && (
                          <span className="search-result-muscle">{exercise.targetMuscles[0]}</span>
                        )}
                        {exercise.equipments && exercise.equipments[0] && (
                          <span className="search-result-equipment">{exercise.equipments[0]}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {searchResults.length > 8 && (
                <div className="search-results-footer">
                  Showing 8 of {searchResults.length} results
                </div>
              )}
            </>
          ) : (
            <div className="search-no-results">
              No exercises found for "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}

