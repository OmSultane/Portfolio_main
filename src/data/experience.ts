export interface TimelineItem {
  id: string;
  type: 'experience' | 'education';
  title: string;
  organization: string;
  location: string;
  period: string;
  mode?: string;
  technologies?: string[];
  description: string;
  keyPoints?: string[];
}

export const timelineData: TimelineItem[] = [
  {
    id: "softanic-internship",
    type: "experience",
    title: "Web Development Intern",
    organization: "Softanic Solutions",
    location: "Offline Internship",
    period: "Approx. 3 Months",
    mode: "In-Person / Offline",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    description: "Gained practical exposure to web development by working with frontend technologies, PHP, and MySQL. Developed an understanding of how frontend interfaces connect with backend logic and databases.",
    keyPoints: [
      "Worked with frontend fundamentals (HTML, CSS, JavaScript) to construct responsive page layouts.",
      "Developed an understanding of server-side integration and database communications using PHP and MySQL.",
      "Gained foundational software development workflows and debugging techniques in a team setting."
    ]
  },
  {
    id: "rcpit-education",
    type: "education",
    title: "Bachelor of Technology in Computer Engineering",
    organization: "R.C. Patel Institute of Technology (RCPIT)",
    location: "Shirpur, Maharashtra",
    period: "Undergraduate Program",
    description: "Pursuing Computer Engineering with a focus on core software fundamentals, Object-Oriented Programming (Java), Data Structures & Algorithms, and Database Management Systems.",
    keyPoints: [
      "Core Coursework: Data Structures, Algorithms, Object-Oriented Programming (Java), Database Management Systems (DBMS), Operating Systems.",
      "Active participant in technical learning, hands-on programming projects, and coding problem solving.",
      "Aspiring to build reliable, high-performance software engineering solutions."
    ]
  }
];
