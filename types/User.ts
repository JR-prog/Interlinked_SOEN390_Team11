import type { Timestamp } from 'firebase/firestore';

export type User = {
  awards?: Award[];
  bio?: string;
  certifications?: Certification[];
  codingLanguages?: string[];
  courses?: Course[];
  coverPhoto?: string;
  education?: Education[];
  email: string;
  experience?: WorkExperience[];
  languages?: Language[];
  linkedUserIds?: string[];
  name: string;
  phone?: string;
  profilePicture?: string;
  projects?: Project[];
  recommendations?: Recommendation[];
  skills?: string[];
  socials?: {
    github?: string;
    instagram?: string;
  };
  volunteering?: VolunteeringExperience[];
  isPrivate?: boolean;
};

type Award = {
  title: string;
  description?: string;
  date: Timestamp;
};

type Certification = {
  name: string;
  issuer: string;
  date: Timestamp;
  link?: string;
};

type Course = {
  title: string;
  courseNo?: string;
  description?: string;
};

type Education = {
  program: string;
  name: string;
  location: string;
  description?: string;
  image?: string;
  startDate: Timestamp;
  endDate?: Timestamp;
};

type Experience = {
  title: string;
  location: string;
  description?: string;
  image?: string;
  startDate: Timestamp;
  endDate?: Timestamp;
};

interface WorkExperience extends Experience {
  employer: string;
}

interface VolunteeringExperience extends Experience {
  organization: string;
}

export type Language = {
  title: string;
  proficiency?: string;
};

type Project = {
  title: string;
  collaborators?: {
    name: User['name'];
    profilePicture?: User['profilePicture'];
    id: string;
  }[];
  repoLink?: string;
  demoLink?: string;
  description?: string;
  startDate: Timestamp;
  endDate?: Timestamp;
  image?: string;
};

type Recommendation = {
  title: string;
  description: string;
  recommender: User;
};
