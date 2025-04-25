import { Doctor } from "@/types/doctor";
import { BriefcaseIcon, CheckCircle, Star, Clock, Calendar, Heart, MapPin, PhoneCall, Scale } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

interface DoctorCardProps {
  doctor: Doctor;
  toggleCompare?: (doctor: Doctor) => void;
  isInCompareList?: boolean;
}

export default function DoctorCard({ doctor, toggleCompare, isInCompareList = false }: DoctorCardProps) {
  // Extract years from experience string or default to 0
  const experienceYears = doctor.experience ? parseInt(doctor.experience.toString()) || 0 : 0;
  const [isLiked, setIsLiked] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Available time slots for booking
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM", "5:00 PM"
  ];
  
  // Handle appointment booking
  const handleBookAppointment = () => {
    if (date && selectedTimeSlot) {
      setBookingSuccess(true);
      // In a real app, this would call an API to book the appointment
      setTimeout(() => {
        setBookingSuccess(false);
      }, 3000);
    }
  };
  
  return (
    <Card 
      data-testid="doctor-card" 
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden card-hover-effect border border-gray-100 fade-in relative group"
    >
      {/* Favorite button overlay */}
      <button 
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md border border-gray-100 transition-all hover:scale-110"
      >
        <Heart size={16} className={`${isLiked ? 'fill-red-500 text-red-500' : 'text-neutral-400'}`} />
      </button>
      
      {/* Highlight badge for special doctors */}
      {experienceYears > 10 && (
        <div className="absolute -left-2 top-4 bg-gradient-to-r from-primary to-accent text-white text-xs px-3 py-1 rounded-r-full shadow-md">
          <span className="relative z-10">Premium Doctor</span>
          <div className="absolute -bottom-2 -left-1 border-t-8 border-r-8 border-t-transparent border-r-primary/60"></div>
        </div>
      )}
      
      {/* Top accent line with gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
      
      <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-primary/15 to-accent/15 rounded-2xl flex items-center justify-center overflow-hidden shadow-sm border border-primary/10 relative group-hover:scale-105 transition-all duration-300">
            {/* Decorative circles */}
            <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-primary/20 group-hover:bg-primary/40 transition-all"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-accent/20 group-hover:bg-accent/40 transition-all"></div>
            
            {doctor.photo ? (
              <img 
                src={doctor.photo} 
                alt={`Dr. ${doctor.name}`} 
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name || "Doctor")}&background=dbeafe&color=2563eb&size=128`;
                }}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                {doctor.name_initials ? (
                  <span className="text-lg font-bold text-primary">{doctor.name_initials}</span>
                ) : (
                  <svg className="h-10 w-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                  </svg>
                )}
              </div>
            )}
          </div>
          
          {/* Rating indicator */}
          <div className="mt-2 flex items-center justify-center">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-medium ml-1 text-neutral-700">4.{experienceYears % 10}</span>
            <span className="text-xs text-neutral-500 ml-1">({50 + experienceYears})</span>
          </div>
        </div>
        
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
            <div>
              <h3 data-testid="doctor-name" className="text-lg font-bold text-neutral-800 transition-colors gradient-text">
                {doctor.name || "Doctor"}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span data-testid="doctor-experience" className="text-sm bg-primary/5 text-primary font-medium px-3 py-1 rounded-full flex items-center shadow-sm">
                  <BriefcaseIcon className="mr-1.5" size={14} /> {experienceYears} years exp
                </span>
                <span className="text-sm bg-secondary/5 text-secondary font-medium px-3 py-1 rounded-full flex items-center shadow-sm">
                  <MapPin className="mr-1.5" size={14} /> 2.5 km away
                </span>
              </div>
            </div>
            
            <div className="mt-2 sm:mt-0">
              <Badge 
                className="bg-gradient-to-r from-secondary to-secondary/80 text-white border-0 shadow-sm animate-pulse" 
                variant="outline"
              >
                Available today
              </Badge>
            </div>
          </div>
          
          <div className="mb-4 space-y-3">
            {/* Specialties */}
            <div data-testid="doctor-specialty" className="flex flex-wrap gap-1.5">
              {doctor.specialities && doctor.specialities.length > 0 ? 
                doctor.specialities.map((specialty, index) => (
                  <span 
                    key={index} 
                    className="bg-accent/5 px-2.5 py-1 rounded-full text-xs font-medium text-accent shadow-sm border border-accent/10 hover:bg-accent/10 hover:scale-105 transition-all cursor-pointer"
                  >
                    {specialty.name}
                  </span>
                )) : doctor.speciality && doctor.speciality.length > 0 ?
                doctor.speciality.map((specialty, index) => (
                  <span 
                    key={index} 
                    className="bg-accent/5 px-2.5 py-1 rounded-full text-xs font-medium text-accent shadow-sm border border-accent/10 hover:bg-accent/10 hover:scale-105 transition-all cursor-pointer"
                  >
                    {specialty}
                  </span>
                )) : 
                <span className="bg-accent/5 px-2.5 py-1 rounded-full text-xs font-medium text-accent shadow-sm border border-accent/10">
                  General
                </span>
              }
            </div>
            
            {/* Languages */}
            {doctor.languages && doctor.languages.length > 0 && (
              <div className="flex items-center">
                <span className="text-xs text-neutral-500 mr-2 flex items-center">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15s-2.133 1.133-4 2c-2.496 1.167-4.5 2-8 2-5.113 0-6.5-1.5-6.5-1.5"></path>
                    <path d="M21 5s-2 4.5-8 4.5-8.5-4-8.5-4"></path>
                    <line x1="3" y1="5" x2="21" y2="5"></line>
                    <line x1="3" y1="19" x2="21" y2="19"></line>
                  </svg>
                  Languages:
                </span>
                <div className="flex flex-wrap gap-1">
                  {doctor.languages.map((language, index) => (
                    <span key={index} className="text-xs font-medium text-secondary bg-secondary/5 px-1.5 py-0.5 rounded">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Clinic location */}
            {doctor.clinic && (
              <div className="flex items-start">
                <span className="text-xs text-neutral-500 mr-2 mt-0.5 flex-shrink-0 flex items-center">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Clinic:
                </span>
                <span className="text-xs text-neutral-600 font-medium">
                  {doctor.clinic.name}{doctor.clinic.address && `, ${doctor.clinic.address.locality}, ${doctor.clinic.address.city}`}
                </span>
              </div>
            )}
            
            {/* Brief introduction */}
            {doctor.doctor_introduction && (
              <div className="mt-1 text-xs text-neutral-600 italic border-l-2 border-primary/20 pl-2">
                {doctor.doctor_introduction.length > 150 
                  ? `${doctor.doctor_introduction.substring(0, 150)}...` 
                  : doctor.doctor_introduction
                }
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-4 mb-3 sm:mb-0">
              <div className="flex items-center space-x-3">
                {doctor.video_consult && (
                  <div className="flex items-center">
                    <div className="bg-secondary/10 text-secondary p-1 rounded-full mr-2">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14v-4z" />
                        <rect x="3" y="6" width="12" height="12" rx="2" ry="2" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-neutral-700">
                      Video Consult
                    </span>
                  </div>
                )}
                
                {doctor.in_clinic && (
                  <div className="flex items-center">
                    <div className="bg-secondary/10 text-secondary p-1 rounded-full mr-2">
                      <CheckCircle size={16} />
                    </div>
                    <span className="text-sm font-medium text-neutral-700">
                      In Clinic
                    </span>
                  </div>
                )}
                
                {!doctor.video_consult && !doctor.in_clinic && (
                  <div className="flex items-center">
                    <div className="bg-secondary/10 text-secondary p-1 rounded-full mr-2">
                      <CheckCircle size={16} />
                    </div>
                    <span className="text-sm font-medium text-neutral-700">
                      {doctor.type || "Consultation"}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center text-neutral-600">
                <Clock size={14} className="mr-1 text-primary/70" />
                <span className="text-xs">Today</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full shadow-sm border border-primary/5">
                <span data-testid="doctor-fee" className="font-bold text-lg gradient-text">{doctor.fees || "₹500"}</span>
                <span className="ml-1.5 text-xs text-neutral-500">consultation fee</span>
              </div>
              
              {/* Booking Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      <Calendar size={16} className="mr-2" />
                      Book
                    </span>
                    {/* Button highlight effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%] group-hover:animate-shimmer"></span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="gradient-text text-center">Book Appointment</DialogTitle>
                    <DialogDescription className="text-center pt-2">
                      {bookingSuccess ? (
                        <div className="text-green-600 bg-green-50 p-4 rounded-lg flex flex-col items-center">
                          <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
                          <p className="font-medium text-green-800">Appointment Confirmed!</p>
                          <p className="text-sm text-green-600">Your appointment with {doctor.name} has been scheduled.</p>
                        </div>
                      ) : (
                        <span>Schedule a consultation with Dr. {doctor.name?.split(' ')[1] || 'Doctor'}</span>
                      )}
                    </DialogDescription>
                  </DialogHeader>
                  
                  {!bookingSuccess && (
                    <>
                      <div className="grid gap-4 py-4">
                        <div className="flex flex-col space-y-2">
                          <Label className="font-medium">Select Date</Label>
                          <div className="border rounded-xl p-2 bg-white">
                            <CalendarComponent
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                              className="mx-auto"
                            />
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                          <Label className="font-medium">Available Time Slots</Label>
                          <RadioGroup value={selectedTimeSlot || ""} onValueChange={setSelectedTimeSlot}>
                            <div className="grid grid-cols-3 gap-2">
                              {timeSlots.map((slot) => (
                                <div key={slot} className="flex items-center">
                                  <RadioGroupItem
                                    value={slot}
                                    id={`slot-${slot}`}
                                    className="peer sr-only"
                                  />
                                  <Label
                                    htmlFor={`slot-${slot}`}
                                    className="flex items-center justify-center px-3 py-2 text-sm border rounded-lg cursor-pointer peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary hover:bg-primary/5 transition-colors"
                                  >
                                    {slot}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="phone">Contact Number</Label>
                          <Input id="phone" placeholder="Enter your phone number" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button 
                          onClick={handleBookAppointment} 
                          className="w-full bg-gradient-to-r from-primary to-accent text-white"
                          disabled={!date || !selectedTimeSlot}
                        >
                          Confirm Appointment
                        </Button>
                      </DialogFooter>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick contact buttons */}
      <div className="flex border-t border-gray-100">
        <button className="flex-1 py-3 flex justify-center items-center text-primary hover:bg-primary/5 transition-colors">
          <PhoneCall size={16} className="mr-2" />
          <span className="text-sm font-medium">Call</span>
        </button>
        <div className="w-px bg-gray-100"></div>
        <button className="flex-1 py-3 flex justify-center items-center text-primary hover:bg-primary/5 transition-colors">
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
          </svg>
          <span className="text-sm font-medium">Chat</span>
        </button>
        <div className="w-px bg-gray-100"></div>
        {toggleCompare && (
          <button 
            className={`flex-1 py-3 flex justify-center items-center ${
              isInCompareList 
                ? "bg-primary/10 text-primary font-medium" 
                : "text-primary hover:bg-primary/5"
            } transition-colors`}
            onClick={() => toggleCompare(doctor)}
          >
            <Scale size={16} className="mr-2" />
            <span className="text-sm font-medium">
              {isInCompareList ? "Remove" : "Compare"}
            </span>
          </button>
        )}
      </div>
    </Card>
  );
}
