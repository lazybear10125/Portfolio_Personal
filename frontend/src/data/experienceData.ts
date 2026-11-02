import type { ExperienceItem } from '../types';

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: 'exp-1',
    type: 'work',
    title: 'Senior Full-stack Developer',
    organization: 'Apex Solutions Corp',
    location: 'Ho Chi Minh City, Vietnam',
    period: '2023 - Present',
    description: 'Lead architect for scalable cloud services and modern web applications. Spearheaded the migration from legacy monolith to Java 21 Spring Boot microservices with React TypeScript frontends.',
    achievements: [
      'Architected high-concurrency microservices handling over 5M API requests daily with 99.98% uptime.',
      'Reduced initial page load time by 45% using Vite code-splitting and dynamic imports in React.',
      'Mentored 6 junior/intern developers in Clean Code, Git workflows, and Spring Security best practices.',
    ],
    skills: ['Java 21', 'Spring Boot 3', 'React', 'TypeScript', 'Docker', 'MySQL', 'Tailwind CSS'],
  },
  {
    id: 'exp-2',
    type: 'work',
    title: 'Full-stack Developer',
    organization: 'Vanguard Software Lab',
    location: 'Da Nang, Vietnam',
    period: '2021 - 2023',
    description: 'Designed and deployed RESTful APIs, relational database schemas, and responsive dashboards for enterprise clients across fintech and logistics.',
    achievements: [
      'Designed over 40+ REST API endpoints with Spring Boot and Spring Data JPA.',
      'Optimized MySQL queries and database indexing, reducing slow query times by 60%.',
      'Implemented automated CI/CD deployment pipelines using Docker and GitHub Actions.',
    ],
    skills: ['Spring Boot', 'Hibernate', 'React', 'JavaScript', 'MySQL', 'Git', 'Postman'],
  },
  {
    id: 'exp-3',
    type: 'work',
    title: 'Frontend Developer Intern & Associate',
    organization: 'PixelCraft Digital',
    location: 'Ho Chi Minh City, Vietnam',
    period: '2020 - 2021',
    description: 'Focused on converting UI/UX designs into pixel-perfect, accessible, and responsive web components using HTML5, CSS3, JavaScript, and React.',
    achievements: [
      'Delivered 15+ production landing pages and SPA interfaces adhering to WCAG 2.1 accessibility standards.',
      'Authored reusable UI component kits with Tailwind CSS and CSS Grid.',
    ],
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS', 'Git'],
  },
  {
    id: 'edu-1',
    type: 'education',
    title: 'Bachelor of Science in Computer Science',
    organization: 'University of Information Technology (VNU-HCM)',
    location: 'Ho Chi Minh City, Vietnam',
    period: '2017 - 2021',
    description: 'Graduated with Distinction (GPA 3.6/4.0). Focused on Software Engineering, Relational Database Management Systems, Data Structures & Algorithms, and Distributed Computing.',
    achievements: [
      'Top 5% Graduate in Software Engineering Department.',
      'First Prize in Faculty Hackathon: Distributed Real-time Incident Tracker.',
      'Published graduation thesis on Optimized ORM Strategies in High-Throughput Relational Databases.',
    ],
    skills: ['Data Structures', 'Algorithms', 'OOP', 'Database Systems', 'Java', 'Web Technologies'],
  },
];
