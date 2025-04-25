import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Search } from "lucide-react";
import { Doctor } from "@/types/doctor";
import { Input } from "@/components/ui/input";

interface AutocompleteSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  doctors: Doctor[];
}

export default function AutocompleteSearch({ 
  searchQuery, 
  setSearchQuery, 
  doctors 
}: AutocompleteSearchProps) {
  const [inputValue, setInputValue] = useState(searchQuery);
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Filter doctors by name and limit to top 3 matches
    const filtered = doctors
      .filter(doctor => doctor.name.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 3);

    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchQuery(inputValue);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: Doctor) => {
    setInputValue(suggestion.name);
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="relative">
        <Input
          data-testid="autocomplete-input"
          type="text"
          placeholder="Search doctors by name..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full pl-5 pr-12 py-2.5 border rounded-full shadow-sm search-input text-base"
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-primary">
          <Search size={20} />
        </span>
      </div>
      
      {showSuggestions && (
        <div className="absolute z-10 w-full mt-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <ul className="max-h-60 overflow-auto rounded-md py-1">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                data-testid="suggestion-item"
                className="px-5 py-3 hover:bg-primary/5 cursor-pointer transition-colors flex items-center"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                  </svg>
                </div>
                <span className="font-medium">{suggestion.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
