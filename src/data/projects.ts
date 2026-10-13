export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  category: 'Full Stack' | 'Web Application' | 'Software Engineering / DSA';
  githubUrl: string;
  liveDemoUrl?: string; // Only populated if an active deployment exists
  statusBadge: string;
  highlights: string[];
}

export const projectsData: Project[] = [
  {
    id: "spot-on-jalgaon",
    title: "SpotOnJalgaon",
    tagline: "Local Venue Discovery & Booking Platform",
    description: "A local venue discovery and booking platform designed to help users explore and book places such as turfs, libraries, gaming zones, and marriage halls in Jalgaon.",
    longDescription: "SpotOnJalgaon addresses the local need for discovering recreational, study, and event spaces in Jalgaon. Built with a full-stack PHP and MySQL architecture, it features categorized venue exploration, detailed venue profile displays, reservation workflows, and an intuitive responsive user interface.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    features: [
      "Venue Discovery with multi-category browsing (sports turfs, study libraries, gaming zones, celebration halls)",
      "Structured search and filtering by location, capacity, and amenities",
      "Interactive booking-related functionality and inquiry management",
      "Robust relational database schema for storing venue profiles, ratings, and booking requests",
      "Responsive frontend designed for mobile and desktop users alike"
    ],
    category: "Full Stack",
    githubUrl: "https://github.com/OmSultane/SpotOnJalgaon",
    liveDemoUrl: undefined, // No fake deployment link
    statusBadge: "Completed Web Project",
    highlights: ["Relational Database Design", "Multi-Category Filtering", "PHP Backend Integration"]
  },
  {
    id: "digital-content-organizer",
    title: "Digital Content Organizer",
    tagline: "Centralized Digital Asset & Content Management Hub",
    description: "A centralized platform for organizing, categorizing, searching, and accessing digital content such as documents, images, videos, and notes.",
    longDescription: "A productivity platform designed to eliminate scattered digital files by providing a unified repository with metadata tagging, category segregation, bookmarking/favorites, and rapid search and retrieval capabilities.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    features: [
      "Multi-type content organization for notes, media, documents, and reference links",
      "Custom categories and hierarchical tagging for easy folder-less grouping",
      "Favorites and pinned collection system for rapid access",
      "Full search and filter retrieval by title, extension, and upload timestamp",
      "Clean content management lifecycle (add, organize, view, archive)"
    ],
    category: "Web Application",
    githubUrl: "https://github.com/OmSultane/Digital-Content-Organizer",
    liveDemoUrl: undefined, // Configurable placeholder without fake claiming
    statusBadge: "Content Management Solution",
    highlights: ["Search & Retrieval Engine", "Custom Categorization", "Dynamic UI State"]
  },
  {
    id: "java-dsa-practice",
    title: "Java DSA Practice",
    tagline: "Data Structures, Algorithms & Problem Solving in Java",
    description: "A collection of Java solutions and practice programs developed while learning data structures, algorithms, and problem-solving techniques.",
    longDescription: "A structured repository of Java problem solutions emphasizing algorithmic efficiency, clean code architecture, and deep understanding of computer science fundamentals. Covers core algorithmic paradigms from sorting to tree traversals.",
    technologies: ["Java"],
    features: [
      "Linear data structures implementations (Arrays, Strings, Linked Lists, Stacks, Queues)",
      "Non-linear data structures exploration (Binary Trees, Binary Search Trees, Heaps)",
      "Core algorithmic techniques (Two Pointers, Sliding Window, Recursion, Binary Search)",
      "Time and space complexity analysis documented per solution",
      "Clean, modular Java class implementations following OOP best practices"
    ],
    category: "Software Engineering / DSA",
    githubUrl: "https://github.com/OmSultane/Java-DSA-Practice",
    liveDemoUrl: undefined,
    statusBadge: "Continuous Practice",
    highlights: ["Algorithmic Optimization", "OOP Principles", "LeetCode / Standard Patterns"]
  }
];
