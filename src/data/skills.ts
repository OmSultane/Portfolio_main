export interface SkillItem {
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'learning' | 'tools';
  description?: string;
  badge?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    subtitle: "Core languages used for problem solving and application development",
    skills: [
      { name: "Java", category: "languages", description: "Primary OOP language for DSA and backend engineering" },
      { name: "JavaScript", category: "languages", description: "Client-side interactivity and asynchronous scripting" },
      { name: "PHP", category: "languages", description: "Server-side scripting and dynamic backend logic" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    subtitle: "Building responsive, user-friendly, and accessible interfaces",
    skills: [
      { name: "HTML5", category: "frontend", description: "Semantic markup and document structure" },
      { name: "CSS3", category: "frontend", description: "Modern styling, flexbox, grid, and responsiveness" },
      { name: "JavaScript (ES6+)", category: "frontend", description: "DOM manipulation, event handling, and APIs" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Database",
    subtitle: "Server architecture, data storage, and query execution",
    skills: [
      { name: "PHP", category: "backend", description: "Backend routing, business logic, and request processing" },
      { name: "MySQL", category: "backend", description: "Relational database schema design, indexing, and SQL queries" },
    ],
  },
  {
    id: "learning",
    title: "Currently Learning & Deepening",
    subtitle: "Active study areas and high-priority engineering competencies",
    skills: [
      { name: "Data Structures & Algorithms", category: "learning", badge: "Active Practice", description: "Problem solving, arrays, trees, graphs, recursion, and complexity analysis" },
      { name: "Java Backend Development", category: "learning", badge: "Core Focus", description: "Object-oriented design patterns, multithreading, and RESTful architectures" },
      { name: "Spring Boot", category: "learning", badge: "In Progress", description: "Enterprise framework for microservices, Spring Data JPA, and REST APIs" },
    ],
  },
  {
    id: "tools",
    title: "Developer Tools & Environment",
    subtitle: "Version control and development workflow tools",
    skills: [
      { name: "Git", category: "tools", description: "Distributed version control and branch management" },
      { name: "GitHub", category: "tools", description: "Collaborative code hosting, open source, and workflows" },
      { name: "Visual Studio Code", category: "tools", description: "Primary editor for web development and scripting" },
      { name: "MySQL Workbench", category: "tools", description: "Visual database administration, ER diagramming, and query optimization" },
    ],
  },
];
