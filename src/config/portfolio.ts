export interface PortfolioConfig {
  personal: {
    name: string;
    initials: string;
    role: string;
    headline: string;
    college: string;
    collegeShort: string;
    location: string;
    careerGoal: string;
    availability: {
      status: string;
      isAvailable: boolean;
    };
    bio: string;
    aboutText: string[];
  };
  contact: {
    email: string;
    github: string;
    linkedin: string;
    leetcode: string;
    codechef: string;
    location: string;
  };
  resume: {
    available: boolean;
    url: string;
  };
  meta: {
    title: string;
    description: string;
    tagline: string;
  };
}

export const portfolioConfig: PortfolioConfig = {
  personal: {
    name: "Om Sultane",
    initials: "OS",
    role: "Computer Engineering Student",
    headline: "Computer Engineering Student | Aspiring Software Engineer",
    college: "R.C. Patel Institute of Technology (RCPIT), Shirpur",
    collegeShort: "RCPIT, Shirpur",
    location: "Shirpur, Maharashtra, India",
    careerGoal: "Aspiring Software Engineer / Java Backend Developer",
    availability: {
      status: "Available for Internships & Collaborations",
      isAvailable: true,
    },
    bio: "I enjoy building practical applications, solving programming problems, and learning how backend systems work. Currently strengthening my Java, DSA, and backend development skills.",
    aboutText: [
      "I am an enthusiastic Computer Engineering student at R.C. Patel Institute of Technology, Shirpur, deeply fascinated by software engineering, object-oriented systems, and backend development.",
      "My journey started with hands-on web development where I learned how interactive client applications connect to robust server-side systems and databases.",
      "Currently, I am dedicated to mastering Java, Data Structures & Algorithms, and modern backend architectures with Spring Boot, with the objective of building scalable, reliable, and meaningful software solutions."
    ],
  },
  contact: {
    email: "omsultane@gmail.com", // Configurable email address
    github: "https://github.com/OmSultane",
    linkedin: "https://www.linkedin.com/in/om-sultane", // Configurable LinkedIn profile URL
    leetcode: "https://leetcode.com/u/azJP3uuoXi/",
    codechef: "https://www.codechef.com/users/pride_clam_66",
    location: "Shirpur, Maharashtra, India",
  },
  resume: {
    available: false, // Set to true when resume file is added to public/resume.pdf
    url: "/resume.pdf",
  },
  meta: {
    title: "Om Sultane | Portfolio",
    description: "Personal portfolio website of Om Sultane, Computer Engineering student and aspiring software engineer.",
    tagline: "Designed with curiosity. Built with code.",
  },
};
