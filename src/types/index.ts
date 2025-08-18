export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  url?: string;
  abstract?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  image?: string;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string[];
  technologies?: string[];
}