export interface TeamMember {
  id: number;
  name: string;
  position: string;
  description: string;
  image: string;
  certifications: string[];
  experience: string;
  specialties: string[];
}

export interface CompanyValue {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Facility {
  id: number;
  name: string;
  description: string;
  image: string;
  features: string[];
  area: string;
}

export interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  image?: string;
  milestone: boolean;
}
