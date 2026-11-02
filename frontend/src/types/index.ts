export interface SkillItem {
  id: string;
  name: string;
  category: 'backend' | 'frontend' | 'database' | 'devops';
  icon: string;
  proficiency: number; // 0 - 100
  description: string;
  color: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: 'Full-stack' | 'Java & Spring' | 'React & Frontend';
  tags: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  architecture: {
    frontend: string[];
    backend: string[];
    database: string[];
    deployment: string[];
  };
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  type: 'work' | 'education';
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  skills: string[];
}

export interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  id: number;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  timestamp: string;
}
