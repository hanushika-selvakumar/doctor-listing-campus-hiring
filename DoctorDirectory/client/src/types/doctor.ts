interface Speciality {
  name: string;
}

interface Address {
  locality: string;
  city: string;
  address_line1: string;
  location: string;
  logo_url?: string;
}

interface Clinic {
  name: string;
  address: Address;
}

export interface Doctor {
  id: string | number;
  name: string;
  name_initials?: string;
  photo?: string;
  doctor_introduction?: string;
  specialities?: Speciality[];
  speciality?: string[]; // Keep for backward compatibility
  experience: string | number;
  fees: string;
  languages?: string[];
  clinic?: Clinic;
  video_consult?: boolean;
  in_clinic?: boolean;
  type?: string;
}
