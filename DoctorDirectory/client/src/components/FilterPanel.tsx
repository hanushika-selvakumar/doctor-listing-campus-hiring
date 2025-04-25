import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Doctor } from "@/types/doctor";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Video, Briefcase, SlidersHorizontal, Stethoscope, Pill, ArrowDownAZ, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FilterPanelProps {
  consultationType: string | null;
  setConsultationType: (type: string | null) => void;
  selectedSpecialties: string[];
  toggleSpecialty: (specialty: string) => void;
  selectedLanguages: string[];
  toggleLanguage: (language: string) => void;
  sortBy: string | null;
  setSortBy: (sort: string | null) => void;
}

export default function FilterPanel({
  consultationType,
  setConsultationType,
  selectedSpecialties,
  toggleSpecialty,
  selectedLanguages,
  toggleLanguage,
  sortBy,
  setSortBy
}: FilterPanelProps) {
  const [allSpecialties, setAllSpecialties] = useState<string[]>([]);
  const [allLanguages, setAllLanguages] = useState<string[]>([]);
  
  // Fetch doctors data to extract specialties
  const { data: doctors } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const response = await fetch("/api/doctors");
      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }
      return response.json();
    },
  });
  
  // Extract unique specialties and languages from doctors data
  useEffect(() => {
    if (doctors && doctors.length > 0) {
      const specialtiesSet = new Set<string>();
      const languagesSet = new Set<string>();
      
      doctors.forEach((doctor: Doctor) => {
        // Extract specialties from new API format (specialities array of objects with name property)
        if (doctor.specialities && Array.isArray(doctor.specialities)) {
          doctor.specialities.forEach((specialty) => {
            if (specialty.name) {
              specialtiesSet.add(specialty.name);
            }
          });
        }
        
        // Also support old format for backward compatibility
        if (doctor.speciality && Array.isArray(doctor.speciality)) {
          doctor.speciality.forEach((specialty: string) => {
            specialtiesSet.add(specialty);
          });
        }
        
        // Extract languages
        if (doctor.languages && Array.isArray(doctor.languages)) {
          doctor.languages.forEach((language: string) => {
            languagesSet.add(language);
          });
        }
      });
      
      setAllSpecialties(Array.from(specialtiesSet).sort());
      setAllLanguages(Array.from(languagesSet).sort());
    }
  }, [doctors]);
  return (
    <aside className="w-full md:w-64 lg:w-72 flex-shrink-0 bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
      
      <div className="p-6 pt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold gradient-text">Filters</h2>
          <SlidersHorizontal size={20} className="text-primary/70" />
        </div>
        
        {/* Consultation Mode Filter */}
        <div className="mb-8">
          <div data-testid="filter-header-moc" className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-700 flex items-center">
              <Video className="w-4 h-4 mr-2 text-primary" />
              Consultation Mode
            </h3>
            
            {consultationType && (
              <Badge variant="outline" className="text-xs border-primary/20 text-primary/70 ml-auto">
                {consultationType}
              </Badge>
            )}
          </div>
          
          <div className="bg-primary/5 rounded-xl p-3 border border-primary/10">
            <RadioGroup
              value={consultationType || ""}
              onValueChange={(value) => setConsultationType(value || null)}
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-2 transition-all hover:translate-x-1 bg-white/80 rounded-lg px-3 py-2 shadow-sm">
                  <RadioGroupItem 
                    data-testid="filter-video-consult" 
                    value="Video Consult" 
                    id="video-consult" 
                    className="text-secondary border-secondary"
                  />
                  <Label htmlFor="video-consult" className="text-sm text-neutral-700 cursor-pointer flex items-center">
                    <Video size={14} className="mr-2 text-secondary" />
                    Video Consult
                  </Label>
                </div>
                <div className="flex items-center space-x-2 transition-all hover:translate-x-1 bg-white/80 rounded-lg px-3 py-2 shadow-sm">
                  <RadioGroupItem 
                    data-testid="filter-in-clinic" 
                    value="In Clinic" 
                    id="in-clinic" 
                    className="text-secondary border-secondary"
                  />
                  <Label htmlFor="in-clinic" className="text-sm text-neutral-700 cursor-pointer flex items-center">
                    <Stethoscope size={14} className="mr-2 text-secondary" />
                    In Clinic
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        {/* Speciality Filter */}
        <div className="mb-8">
          <div data-testid="filter-header-speciality" className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-700 flex items-center">
              <Pill className="w-4 h-4 mr-2 text-primary" />
              Speciality
            </h3>
            
            {selectedSpecialties.length > 0 && (
              <Badge className="bg-secondary/70 text-white text-xs">
                {selectedSpecialties.length} selected
              </Badge>
            )}
          </div>
          
          <div className="bg-primary/5 rounded-xl p-3 border border-primary/10">
            <div className="max-h-60 overflow-y-auto pr-2 space-y-2 scrollbar-thin">
              {allSpecialties.length > 0 ? (
                allSpecialties.map((specialty: string) => (
                  <div 
                    key={specialty} 
                    className={`flex items-center space-x-2 transition-all hover:translate-x-1 bg-white/80 rounded-lg px-3 py-2 shadow-sm ${
                      selectedSpecialties.includes(specialty) ? 'border-l-2 border-secondary' : ''
                    }`}
                  >
                    <Checkbox 
                      data-testid={`filter-specialty-${specialty.replace('/', '-')}`}
                      id={`specialty-${specialty}`}
                      checked={selectedSpecialties.includes(specialty)}
                      onCheckedChange={() => toggleSpecialty(specialty)}
                      className="text-secondary border-secondary data-[state=checked]:bg-secondary"
                    />
                    <Label 
                      htmlFor={`specialty-${specialty}`}
                      className="text-sm text-neutral-700 cursor-pointer"
                    >
                      {specialty}
                    </Label>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-neutral-500 text-sm animate-pulse flex flex-col items-center">
                  <Briefcase className="h-6 w-6 mb-2 text-primary/30" />
                  Loading specialties...
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Language Filter */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-700 flex items-center">
              <svg className="w-4 h-4 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15s-2.133 1.133-4 2c-2.496 1.167-4.5 2-8 2-5.113 0-6.5-1.5-6.5-1.5"></path>
                <path d="M21 5s-2 4.5-8 4.5-8.5-4-8.5-4"></path>
                <line x1="3" y1="5" x2="21" y2="5"></line>
                <line x1="3" y1="19" x2="21" y2="19"></line>
              </svg>
              Languages
            </h3>
            
            {selectedLanguages && selectedLanguages.length > 0 && (
              <Badge className="bg-secondary/70 text-white text-xs">
                {selectedLanguages.length} selected
              </Badge>
            )}
          </div>
          
          <div className="bg-primary/5 rounded-xl p-3 border border-primary/10">
            <div className="max-h-40 overflow-y-auto pr-2 space-y-2 scrollbar-thin">
              {allLanguages.length > 0 ? (
                allLanguages.map((language: string) => (
                  <div 
                    key={language} 
                    className={`flex items-center space-x-2 transition-all hover:translate-x-1 bg-white/80 rounded-lg px-3 py-2 shadow-sm ${
                      selectedLanguages && selectedLanguages.includes(language) ? 'border-l-2 border-secondary' : ''
                    }`}
                  >
                    <Checkbox 
                      id={`language-${language}`}
                      checked={selectedLanguages && selectedLanguages.includes(language)}
                      onCheckedChange={() => toggleLanguage(language)}
                      className="text-secondary border-secondary data-[state=checked]:bg-secondary"
                    />
                    <Label 
                      htmlFor={`language-${language}`}
                      className="text-sm text-neutral-700 cursor-pointer"
                    >
                      {language}
                    </Label>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-neutral-500 text-sm animate-pulse flex flex-col items-center">
                  <svg className="h-6 w-6 mb-2 text-primary/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15s-2.133 1.133-4 2c-2.496 1.167-4.5 2-8 2-5.113 0-6.5-1.5-6.5-1.5"></path>
                    <path d="M21 5s-2 4.5-8 4.5-8.5-4-8.5-4"></path>
                    <line x1="3" y1="5" x2="21" y2="5"></line>
                    <line x1="3" y1="19" x2="21" y2="19"></line>
                  </svg>
                  Loading languages...
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Sort Filter */}
        <div className="mb-8">
          <div data-testid="filter-header-sort" className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-neutral-700 flex items-center">
              <ArrowUpDown className="w-4 h-4 mr-2 text-primary" />
              Sort By
            </h3>
            
            {sortBy && (
              <Badge variant="outline" className="text-xs border-primary/20 text-primary/70">
                {sortBy === "fees" ? "Price" : "Experience"}
              </Badge>
            )}
          </div>
          
          <div className="bg-primary/5 rounded-xl p-3 border border-primary/10">
            <RadioGroup
              value={sortBy || ""}
              onValueChange={(value) => setSortBy(value || null)}
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-2 transition-all hover:translate-x-1 bg-white/80 rounded-lg px-3 py-2 shadow-sm">
                  <RadioGroupItem 
                    data-testid="sort-fees" 
                    value="fees" 
                    id="sort-fees" 
                    className="text-secondary border-secondary"
                  />
                  <Label htmlFor="sort-fees" className="text-sm text-neutral-700 cursor-pointer flex items-center">
                    <ArrowDownAZ size={14} className="mr-2 text-secondary" />
                    Fees (Low to High)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 transition-all hover:translate-x-1 bg-white/80 rounded-lg px-3 py-2 shadow-sm">
                  <RadioGroupItem 
                    data-testid="sort-experience" 
                    value="experience" 
                    id="sort-experience" 
                    className="text-secondary border-secondary"
                  />
                  <Label htmlFor="sort-experience" className="text-sm text-neutral-700 cursor-pointer flex items-center">
                    <Briefcase size={14} className="mr-2 text-secondary" />
                    Experience (High to Low)
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        {/* Reset Button */}
        {(consultationType || selectedSpecialties.length > 0 || selectedLanguages.length > 0 || sortBy) && (
          <Button 
            onClick={() => {
              setConsultationType(null);
              setSortBy(null);
              selectedSpecialties.forEach(specialty => toggleSpecialty(specialty));
              selectedLanguages.forEach(language => toggleLanguage(language));
            }}
            variant="outline"
            className="w-full border-primary/20 text-primary hover:bg-primary/5 mt-2"
          >
            Reset All Filters
          </Button>
        )}
      </div>
    </aside>
  );
}
