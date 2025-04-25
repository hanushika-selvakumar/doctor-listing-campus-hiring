import { useQuery } from "@tanstack/react-query";
import AutocompleteSearch from "@/components/AutocompleteSearch";
import FilterPanel from "@/components/FilterPanel";
import DoctorsList from "@/components/DoctorsList";
import { useDoctorFilters } from "@/hooks/useDoctorFilters";
import { Search, HeartPulse, Users, Stethoscope, Scale, X, ChevronUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Doctor } from "@/types/doctor";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function Home() {
  const {
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
  } = useDoctorFilters();
  
  // State for doctor comparison feature
  const [showComparison, setShowComparison] = useState(false);
  const [compareList, setCompareList] = useState<Doctor[]>([]);
  
  // Function to toggle a doctor in comparison list
  const toggleCompare = (doctor: Doctor) => {
    if (compareList.some(d => d.id === doctor.id)) {
      setCompareList(prev => prev.filter(d => d.id !== doctor.id));
    } else {
      if (compareList.length < 3) {
        setCompareList(prev => [...prev, doctor]);
      }
    }
  };

  const { data: doctors, isLoading, isError } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const response = await fetch("/api/doctors");
      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }
      return response.json();
    },
  });

  return (
    <>
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-10 border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white shadow-md">
              <Stethoscope className="h-5 w-5" />
            </div>
            <h1 className="ml-3 text-2xl font-bold gradient-text">Doctor Finder</h1>
          </div>
          
          <div className="relative w-full max-w-md ml-4 hidden md:block">
            <AutocompleteSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              doctors={doctors || []}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-primary/10">
        <div className="container mx-auto px-4 py-10 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Find the <span className="gradient-text">Perfect Doctor</span> for Your Health Needs
              </h1>
              <p className="text-neutral-600 text-lg mb-6">
                Search from our curated list of qualified healthcare professionals specializing in various fields of medicine.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                    <HeartPulse size={18} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium">Qualified Specialists</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center mr-2">
                    <Users size={18} className="text-secondary" />
                  </div>
                  <span className="text-sm font-medium">Multiple Specialists</span>
                </div>
              </div>
              
              <div className="md:hidden w-full mb-6">
                <AutocompleteSearch 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  doctors={doctors || []}
                />
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/5 rounded-full"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/5 rounded-full"></div>
                
                {/* Main illustration */}
                <div className="relative w-72 h-72 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
                  <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-primary/10 to-accent/10"></div>
                  <div className="absolute top-8 left-0 right-0 flex justify-center">
                    <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center border-4 border-white">
                      <Stethoscope className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                  <div className="absolute top-32 left-0 right-0 text-center">
                    <h3 className="text-lg font-bold gradient-text">Find Your Doctor</h3>
                    <p className="text-sm text-neutral-600 mt-1 px-6">Specialized care just a search away</p>
                  </div>
                  <div className="absolute bottom-8 left-6 right-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="h-2 w-24 bg-primary/20 rounded-full"></div>
                          <div className="h-2 w-16 bg-accent/20 rounded-full mt-1"></div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center mr-2">
                          <svg className="h-4 w-4 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="h-2 w-32 bg-primary/20 rounded-full"></div>
                          <div className="h-2 w-20 bg-accent/20 rounded-full mt-1"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-neutral-800">Browse Doctors</h2>
              <p className="text-neutral-600 mt-1">Use filters to find doctors that match your specific requirements</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-primary/20 hover:bg-primary/5"
                onClick={clearFilters}
              >
                <Search size={16} />
                <span>Reset Filters</span>
              </Button>
              
              {compareList.length > 0 && (
                <Button
                  className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-white relative group overflow-hidden"
                  onClick={() => setShowComparison(!showComparison)}
                >
                  <span className="relative z-10 flex items-center">
                    <Scale size={16} className="mr-1" />
                    Compare ({compareList.length})
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%] group-hover:animate-shimmer"></span>
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Doctor Comparison Panel */}
        {showComparison && compareList.length > 0 && (
          <div className="mb-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-4 px-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale size={18} className="text-primary" />
                <h3 className="font-bold text-lg">Doctor Comparison</h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-neutral-500 hover:text-primary"
                onClick={() => setShowComparison(false)}
              >
                <X size={18} />
              </Button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {compareList.map((doctor) => (
                  <Card key={doctor.id} className="relative bg-white border-primary/10 shadow-sm">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute top-2 right-2 text-neutral-400 hover:text-primary h-8 w-8 p-0"
                      onClick={() => toggleCompare(doctor)}
                    >
                      <X size={16} />
                    </Button>
                    
                    <div className="p-4 flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/15 to-accent/15 rounded-full flex items-center justify-center mb-3">
                        <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                        </svg>
                      </div>
                      <h4 className="font-bold mb-1">{doctor.name}</h4>
                      <div className="text-sm text-neutral-600 mb-2">
                        {doctor.speciality && doctor.speciality.length > 0 ? doctor.speciality[0] : "General"}
                      </div>
                      
                      <div className="w-full border-t border-gray-100 my-3"></div>
                      
                      <div className="w-full space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-neutral-500">Experience:</span>
                          <span className="text-sm font-medium">{doctor.experience} years</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-neutral-500">Fees:</span>
                          <span className="text-sm font-medium">{doctor.fees}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-neutral-500">Type:</span>
                          <span className="text-sm font-medium">{doctor.type}</span>
                        </div>
                      </div>
                      
                      <div className="w-full border-t border-gray-100 my-3"></div>
                      
                      <Button className="w-full mt-2 bg-gradient-to-r from-primary to-accent text-white">
                        Book Appointment
                      </Button>
                    </div>
                  </Card>
                ))}
                
                {compareList.length < 3 && (
                  <div className="border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center p-6 h-full min-h-[250px]">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users size={20} className="text-primary/50" />
                      </div>
                      <p className="text-neutral-500 text-sm">
                        Add {3 - compareList.length} more doctor{compareList.length === 2 ? '' : 's'} to compare
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {compareList.length > 1 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl">
                  <h4 className="text-lg font-bold mb-3 flex items-center">
                    <CheckCircle2 size={18} className="mr-2 text-secondary" />
                    Comparison Summary
                  </h4>
                  <ul className="space-y-2">
                    {compareList.length > 1 && (
                      <li className="flex items-start">
                        <div className="w-5 h-5 mt-0.5 mr-2 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                          <CheckCircle2 size={12} />
                        </div>
                        <span className="text-sm">
                          <span className="font-medium">{compareList[0].name}</span> has {
                            Number(compareList[0].experience) > Number(compareList[1].experience) ? 'more' : 'less'
                          } experience than <span className="font-medium">{compareList[1].name}</span>
                        </span>
                      </li>
                    )}
                    {compareList.length > 1 && (
                      <li className="flex items-start">
                        <div className="w-5 h-5 mt-0.5 mr-2 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                          <CheckCircle2 size={12} />
                        </div>
                        <span className="text-sm">
                          <span className="font-medium">{
                            compareList.sort((a, b) => {
                              const aFees = parseInt(a.fees.toString().replace(/[^\d]/g, "") || "0");
                              const bFees = parseInt(b.fees.toString().replace(/[^\d]/g, "") || "0");
                              return aFees - bFees;
                            })[0].name
                          }</span> offers the most affordable consultation fee
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <FilterPanel 
            consultationType={consultationType}
            setConsultationType={setConsultationType}
            selectedSpecialties={specialties}
            toggleSpecialty={toggleSpecialty}
            selectedLanguages={languages}
            toggleLanguage={toggleLanguage}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* Doctor List */}
          <DoctorsList 
            doctors={doctors || []}
            filteredDoctors={filteredDoctors}
            isLoading={isLoading}
            isError={isError}
            searchQuery={searchQuery}
            consultationType={consultationType}
            specialties={specialties}
            sortBy={sortBy}
            clearFilters={clearFilters}
            toggleCompare={toggleCompare}
            compareList={compareList}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary/95 via-primary/90 to-accent/95 text-white py-8 mt-16 relative overflow-hidden shadow-md">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/10 via-white/20 to-white/10"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-white/5 -mr-20 -mb-20"></div>
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/5 -ml-20 -mt-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-inner">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <h2 className="ml-3 text-2xl font-bold">Doctor Finder</h2>
              </div>
              <p className="text-white/70 max-w-xs">
                The easiest way to find and connect with the right healthcare professionals for your medical needs.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li className="hover:translate-x-1 transition-transform">
                  <a href="#" className="text-white/80 hover:text-white transition-colors">Home</a>
                </li>
                <li className="hover:translate-x-1 transition-transform">
                  <a href="#" className="text-white/80 hover:text-white transition-colors">About Us</a>
                </li>
                <li className="hover:translate-x-1 transition-transform">
                  <a href="#" className="text-white/80 hover:text-white transition-colors">Services</a>
                </li>
                <li className="hover:translate-x-1 transition-transform">
                  <a href="#" className="text-white/80 hover:text-white transition-colors">Contact</a>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-white/10 p-2 rounded-full mr-3 mt-0.5">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-white/80">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white/10 p-2 rounded-full mr-3 mt-0.5">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-white/80">support@doctorfinder.com</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white/10 p-2 rounded-full mr-3 mt-0.5">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-white/80">1234 Healthcare Ave, Medical District, CA 90210</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-white/10 text-center text-white/60 text-sm">
            <p>© {new Date().getFullYear()} Doctor Finder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}