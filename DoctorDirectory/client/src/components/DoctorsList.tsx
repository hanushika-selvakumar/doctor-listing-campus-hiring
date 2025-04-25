import { Doctor } from "@/types/doctor";
import DoctorCard from "./DoctorCard";
import FilterTag from "./FilterTag";
import { Button } from "@/components/ui/button";
import { XCircle, Search, AlertCircle, Scale } from "lucide-react";
import { useState } from "react";

interface DoctorsListProps {
  doctors: Doctor[];
  filteredDoctors: Doctor[];
  isLoading: boolean;
  isError: boolean;
  searchQuery: string;
  consultationType: string | null;
  specialties: string[];
  sortBy: string | null;
  clearFilters: () => void;
  toggleCompare?: (doctor: Doctor) => void;
  compareList?: Doctor[];
}

export default function DoctorsList({
  doctors,
  filteredDoctors,
  isLoading,
  isError,
  searchQuery,
  consultationType,
  specialties,
  sortBy,
  clearFilters,
  toggleCompare,
  compareList = []
}: DoctorsListProps) {
  const getSortLabel = (sort: string) => {
    switch (sort) {
      case "fees":
        return "Fees (Low to High)";
      case "experience":
        return "Experience (High to Low)";
      default:
        return sort;
    }
  };

  if (isLoading) {
    return (
      <div className="flex-grow flex flex-col justify-center items-center py-20">
        <div className="loader rounded-full border-4 border-primary/20 h-16 w-16 mb-6 pulse-animation"></div>
        <p className="text-neutral-600 text-lg animate-pulse">Loading doctors...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-grow py-8">
        <div className="bg-destructive/10 text-destructive p-6 rounded-2xl flex flex-col items-center shadow-sm border border-destructive/20">
          <div className="bg-destructive/20 p-3 rounded-full mb-4">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">Unable to load doctors</h3>
          <p className="text-center mb-4">We encountered a problem while loading the doctor data. Please try again later.</p>
          <Button 
            variant="outline" 
            className="border-destructive/30 text-destructive hover:bg-destructive/10"
            onClick={() => window.location.reload()}
          >
            Refresh page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow">
      {/* Applied Filters */}
      {(searchQuery || consultationType || specialties.length > 0 || sortBy) && (
        <div className="mb-4 flex flex-wrap gap-2">
          {searchQuery && (
            <FilterTag 
              label={`Search: ${searchQuery}`} 
              onRemove={() => {
                const urlParams = new URLSearchParams(window.location.search);
                urlParams.delete("q");
                window.history.pushState({}, "", `${window.location.pathname}?${urlParams.toString()}`);
                window.dispatchEvent(new Event("popstate"));
              }} 
            />
          )}
          
          {consultationType && (
            <FilterTag 
              label={consultationType} 
              onRemove={() => {
                const urlParams = new URLSearchParams(window.location.search);
                urlParams.delete("type");
                window.history.pushState({}, "", `${window.location.pathname}?${urlParams.toString()}`);
                window.dispatchEvent(new Event("popstate"));
              }} 
            />
          )}
          
          {specialties.map(specialty => (
            <FilterTag 
              key={specialty} 
              label={specialty} 
              onRemove={() => {
                const urlParams = new URLSearchParams(window.location.search);
                const currentSpecialties = urlParams.getAll("specialty");
                urlParams.delete("specialty");
                
                currentSpecialties.forEach(s => {
                  if (s !== specialty) {
                    urlParams.append("specialty", s);
                  }
                });
                
                window.history.pushState({}, "", `${window.location.pathname}?${urlParams.toString()}`);
                window.dispatchEvent(new Event("popstate"));
              }} 
            />
          ))}
          
          {sortBy && (
            <FilterTag 
              label={`Sort: ${getSortLabel(sortBy)}`} 
              onRemove={() => {
                const urlParams = new URLSearchParams(window.location.search);
                urlParams.delete("sort");
                window.history.pushState({}, "", `${window.location.pathname}?${urlParams.toString()}`);
                window.dispatchEvent(new Event("popstate"));
              }} 
            />
          )}
        </div>
      )}
      
      {/* Results Count */}
      <div className="mb-6">
        <p className="text-neutral-700 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full inline-flex items-center shadow-sm border border-gray-100 transition-all">
          <svg className="w-4 h-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Showing <span className="font-bold text-primary mx-1">{filteredDoctors.length}</span> of{" "}
          <span className="font-bold text-primary mx-1">{doctors.length}</span> doctors
          {(searchQuery || consultationType || specialties.length > 0 || sortBy) && (
            <span className="ml-3 text-xs text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
              Filters applied
            </span>
          )}
        </p>
      </div>
      
      {/* Empty State */}
      {filteredDoctors.length === 0 && (
        <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-neutral-700 mb-2">No matches found</h3>
          <p className="text-neutral-600 mb-6 max-w-md mx-auto">We couldn't find any doctors matching your current search criteria</p>
          <Button 
            className="mt-4 bg-gradient-to-r from-primary to-accent text-white shadow-md hover:shadow-lg transition-all" 
            onClick={clearFilters}
          >
            Clear all filters
          </Button>
        </div>
      )}
      
      {/* Doctor Cards */}
      <div className="space-y-6">
        {filteredDoctors.map((doctor) => (
          <DoctorCard 
            key={doctor.id} 
            doctor={doctor} 
            toggleCompare={toggleCompare}
            isInCompareList={compareList?.some(d => d.id === doctor.id)}
          />
        ))}
      </div>
    </div>
  );
}
