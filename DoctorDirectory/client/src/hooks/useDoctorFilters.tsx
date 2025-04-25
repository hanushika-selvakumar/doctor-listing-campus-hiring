import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Doctor } from "@/types/doctor";
import { useQuery } from "@tanstack/react-query";

export function useDoctorFilters() {
  const [location, setLocation] = useLocation();
  
  // State for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [consultationType, setConsultationType] = useState<string | null>(null);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  
  // Fetch doctors data from our backend API
  const { data: doctors = [], isLoading, isError } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const response = await fetch("/api/doctors");
      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }
      return response.json();
    },
  });
  
  // Parse URL params on mount and when location changes
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Parse search query
    const query = urlParams.get("q");
    setSearchQuery(query || "");
    
    // Parse consultation type
    const type = urlParams.get("type");
    setConsultationType(type);
    
    // Parse specialties
    const specialtyParams = urlParams.getAll("specialty");
    setSpecialties(specialtyParams);
    
    // Parse sort option
    const sort = urlParams.get("sort");
    setSortBy(sort);
  }, [location]);
  
  // Apply filters when doctors data or filter states change
  useEffect(() => {
    if (!doctors || doctors.length === 0) {
      setFilteredDoctors([]);
      return;
    }
    
    let results = [...doctors];
    
    // Apply search filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      results = results.filter(doctor => 
        doctor.name && doctor.name.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Apply consultation type filter
    if (consultationType) {
      if (consultationType === "Video Consult") {
        results = results.filter(doctor => doctor.video_consult === true);
      } else if (consultationType === "In Clinic") {
        results = results.filter(doctor => doctor.in_clinic === true);
      } else {
        // Legacy filter for backward compatibility
        results = results.filter(doctor => 
          doctor.type && doctor.type.includes(consultationType)
        );
      }
    }
    
    // Apply specialty filters
    if (specialties.length > 0) {
      results = results.filter(doctor => {
        // Check in new API format (specialities array of objects with name property)
        if (doctor.specialities && Array.isArray(doctor.specialities)) {
          return specialties.some(specialty => 
            doctor.specialities.some((s: {name: string}) => s.name === specialty)
          );
        }
        
        // Also check in old format for backward compatibility
        if (doctor.speciality && Array.isArray(doctor.speciality)) {
          return specialties.some(specialty => 
            doctor.speciality.includes(specialty)
          );
        }
        
        return false;
      });
    }
    
    // Apply language filters
    if (languages.length > 0) {
      results = results.filter(doctor => {
        if (doctor.languages && Array.isArray(doctor.languages)) {
          return languages.some(language => 
            doctor.languages.includes(language)
          );
        }
        return false;
      });
    }
    
    // Apply sorting
    if (sortBy) {
      if (sortBy === "fees") {
        results.sort((a, b) => {
          if (!a.fees) return 1;
          if (!b.fees) return -1;
          // Handle various fee formats by extracting numbers
          const aFees = parseInt(a.fees.toString().replace(/[^\d]/g, "") || "0");
          const bFees = parseInt(b.fees.toString().replace(/[^\d]/g, "") || "0");
          return aFees - bFees; // Ascending order
        });
      } else if (sortBy === "experience") {
        results.sort((a, b) => {
          if (!a.experience) return 1;
          if (!b.experience) return -1;
          // Handle various experience formats
          const aExp = parseInt(a.experience.toString().replace(/[^\d]/g, "") || "0");
          const bExp = parseInt(b.experience.toString().replace(/[^\d]/g, "") || "0");
          return bExp - aExp; // Descending order (higher experience first)
        });
      }
    }
    
    setFilteredDoctors(results);
  }, [doctors, searchQuery, consultationType, specialties, languages, sortBy]);
  
  // Update URL when filters change
  useEffect(() => {
    if (location === "/") {
      const urlParams = new URLSearchParams();
      
      if (searchQuery) {
        urlParams.set("q", searchQuery);
      }
      
      if (consultationType) {
        urlParams.set("type", consultationType);
      }
      
      specialties.forEach(specialty => {
        urlParams.append("specialty", specialty);
      });
      
      languages.forEach(language => {
        urlParams.append("language", language);
      });
      
      if (sortBy) {
        urlParams.set("sort", sortBy);
      }
      
      const newUrl = `${window.location.pathname}${urlParams.toString() ? "?" + urlParams.toString() : ""}`;
      window.history.pushState({}, "", newUrl);
    }
  }, [searchQuery, consultationType, specialties, languages, sortBy, location]);
  
  // Handle popstate event for browser navigation
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      
      setSearchQuery(urlParams.get("q") || "");
      setConsultationType(urlParams.get("type"));
      setSpecialties(urlParams.getAll("specialty"));
      setLanguages(urlParams.getAll("language"));
      setSortBy(urlParams.get("sort"));
    };
    
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  
  // Toggle a specialty filter
  const toggleSpecialty = (specialty: string) => {
    setSpecialties(prev => {
      if (prev.includes(specialty)) {
        return prev.filter(s => s !== specialty);
      } else {
        return [...prev, specialty];
      }
    });
  };
  
  // Toggle a language filter
  const toggleLanguage = (language: string) => {
    setLanguages(prev => {
      if (prev.includes(language)) {
        return prev.filter(l => l !== language);
      } else {
        return [...prev, language];
      }
    });
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setConsultationType(null);
    setSpecialties([]);
    setLanguages([]);
    setSortBy(null);
    
    // Also clear URL params
    window.history.pushState({}, "", window.location.pathname);
  };
  
  return {
    searchQuery,
    setSearchQuery,
    consultationType,
    setConsultationType,
    specialties,
    toggleSpecialty,
    languages,
    toggleLanguage,
    sortBy,
    setSortBy,
    clearFilters,
    filteredDoctors,
  };
}
