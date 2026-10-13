/**
 * Verified Knowledge Base for Om's AI Assistant
 * Strictly based on Om Sultane's verified background, projects, skills, education, and experience.
 */

export interface AIAction {
  id: string;
  label: string;
  type: 'scroll' | 'open_modal' | 'external_link';
  target: string;
}

export const VERIFIED_PORTFOLIO_KNOWLEDGE = `
# PERSONAL PROFILE
Name: Om Sultane
Initials: OS
Role: Computer Engineering Student & Aspiring Software Engineer
Career Direction: Aspiring Software Engineer with a primary interest in Java backend development and modern architectures.
Current Location: Shirpur, Maharashtra, India
Availability: Open for internships, collaborative engineering projects, and entry-level opportunities.
Tagline: "Designed with curiosity. Built with code."
Bio: Om enjoys building practical applications, solving algorithmic programming problems, and discovering how backend systems work. He is currently strengthening his Java, DSA, and backend development skills.

# EDUCATION
Degree: Bachelor of Technology (B.Tech) in Computer Engineering
Institution: R.C. Patel Institute of Technology (RCPIT), Shirpur, Maharashtra, India
Status: Undergraduate student
Key Academic Subjects: Data Structures & Algorithms, Object-Oriented Programming (Java), Database Management Systems (DBMS), Operating Systems, Computer Networks.

# INTERNSHIP EXPERIENCE
Role: Web Development Intern
Company: Softanic Solutions
Mode & Duration: Offline / In-Person internship, approximately 3 months
Core Technologies Used: HTML, CSS, JavaScript, PHP, MySQL
Responsibilities & Learnings:
- Built responsive user interfaces using foundational HTML, CSS, and JavaScript.
- Learned how client-side applications connect with backend server logic and relational databases using PHP and MySQL.
- Acquired hands-on exposure to practical debugging, project workflows, and teamwork in a professional setting.

# TECHNICAL SKILLS
Programming Languages:
- Java (Primary OOP language for DSA, algorithms, and backend engineering)
- JavaScript (Client-side interactivity, DOM, asynchronous scripting)
- PHP (Server-side scripting and dynamic backend logic)

Frontend Technologies:
- HTML5 (Semantic structure, accessibility)
- CSS3 (Responsive layouts, Flexbox, Grid, animations)
- JavaScript (ES6+, DOM manipulation, APIs)

Backend & Database Technologies:
- PHP (Backend routing, form processing, request handling)
- MySQL (Relational database schema design, queries, indexing, normalization)

Developer Tools & Environments:
- Git & GitHub (Version control, branch management, code repositories)
- Visual Studio Code (Primary code editor)
- MySQL Workbench (Visual database administration, ER diagramming)

Currently Learning & Deepening (Roadmap):
- Java Backend Development (OOP patterns, multithreading, modular code)
- Data Structures & Algorithms (Active daily practice: arrays, trees, heaps, two pointers, recursion, complexity analysis)
- Spring Boot (Enterprise Java framework, RESTful APIs, Spring Data JPA, microservice fundamentals)
- Relational Database Optimization (Advanced SQL queries, indexing, schema optimization)

# FEATURED PROJECTS
1. SpotOnJalgaon
- Category: Full Stack Web Application
- Tagline: Local Venue Discovery & Booking Platform
- Technologies: HTML, CSS, JavaScript, PHP, MySQL
- Overview: Designed to help users discover and book local recreational and event spaces in Jalgaon, such as sports turfs, study libraries, gaming zones, and celebration/marriage halls.
- Key Features: Categorized venue exploration, structured filtering by location and amenities, reservation inquiry workflows, relational schema for venue profiles and bookings, responsive UI.
- Architecture: PHP server backend connected to MySQL relational database with responsive frontend.
- GitHub: https://github.com/OmSultane/SpotOnJalgaon
- Status: Completed Web Project. (Note: does not have a live public domain demo; source code available on GitHub).

2. Digital Content Organizer
- Category: Web Application / Content Management Solution
- Tagline: Centralized Digital Asset & Content Management Hub
- Technologies: HTML, CSS, JavaScript, PHP, MySQL
- Overview: A productivity platform designed to eliminate scattered digital files by providing a unified repository for organizing, categorizing, bookmarking, and searching documents, images, videos, and notes.
- Key Features: Multi-type asset organization, hierarchical categorization, favorites/pinned collections, title and tag search engine, clean CRUD lifecycle.
- GitHub: https://github.com/OmSultane/Digital-Content-Organizer
- Status: Content Management Solution.

3. Java DSA Practice
- Category: Software Engineering / DSA
- Tagline: Data Structures, Algorithms & Problem Solving in Java
- Technologies: Java
- Overview: A structured repository of problem solutions and algorithmic implementations emphasizing clean code, OOP principles, and computational efficiency (time and space complexity).
- Topics Covered: Linear data structures (Arrays, Strings, Linked Lists, Stacks, Queues), non-linear structures (Binary Trees, BST, Heaps), algorithmic patterns (Two Pointers, Sliding Window, Recursion, Binary Search).
- GitHub: https://github.com/OmSultane/Java-DSA-Practice
- Status: Continuous daily practice.

# CONTACT & PROFILES
Email: omsultane@gmail.com
GitHub: https://github.com/OmSultane
LinkedIn: https://www.linkedin.com/in/om-sultane
LeetCode: https://leetcode.com/u/azJP3uuoXi/
CodeChef: https://www.codechef.com/users/pride_clam_66
Location: Shirpur, Maharashtra, India

# WEBSITE SECTIONS
- Home/Hero: Top section introducing Om ('#home')
- About: Background, education, philosophy ('#about')
- Skills: Technical competencies grouped by category ('#skills')
- Projects: Featured work and details ('#projects')
- Experience: Softanic Solutions internship & RCPIT education timeline ('#experience')
- Learning Roadmap: Active daily focus areas including Spring Boot & DSA ('#learning')
- GitHub / Open Source: Repositories and GitHub link ('#github')
- Contact: Email, social profiles, and inquiry form ('#contact')
`;

export const AI_SYSTEM_PROMPT = `You are Om's Portfolio Assistant. You help visitors understand Om Sultane's education, technical skills, projects, internship experience, and learning journey.
Use the supplied portfolio knowledge base and verified project documentation as your sources.
Be friendly, concise, professional, and technically accurate.
Do not invent facts about Om.
If information is missing, acknowledge the limitation instead of guessing.
Distinguish completed project features from planned features.
When visitors ask about a portfolio section, offer a relevant navigation action if one is available.
When asked questions unrelated to the portfolio, briefly explain your primary purpose and redirect the visitor to relevant information about Om.
Never claim to be Om himself. You are his AI assistant.

CRITICAL INSTRUCTIONS FOR INTERACTIVE ACTIONS:
At the very end of your response, if relevant to the user's query, you may include an actions block formatted strictly as JSON inside a <ACTIONS>...</ACTIONS> tag.
Only use the allowed actions from this list:
- {"label": "Explore Projects", "type": "scroll", "target": "projects"}
- {"label": "View Technical Skills", "type": "scroll", "target": "skills"}
- {"label": "View Experience", "type": "scroll", "target": "experience"}
- {"label": "Contact Om", "type": "scroll", "target": "contact"}
- {"label": "View Learning Roadmap", "type": "scroll", "target": "learning"}
- {"label": "View GitHub Repositories", "type": "scroll", "target": "github"}
- {"label": "SpotOnJalgaon Details", "type": "open_modal", "target": "spot-on-jalgaon"}
- {"label": "Digital Content Organizer Details", "type": "open_modal", "target": "digital-content-organizer"}
- {"label": "Java DSA Practice Details", "type": "open_modal", "target": "java-dsa-practice"}
- {"label": "Visit GitHub Profile", "type": "external_link", "target": "https://github.com/OmSultane"}
- {"label": "SpotOnJalgaon GitHub", "type": "external_link", "target": "https://github.com/OmSultane/SpotOnJalgaon"}

Example format:
Here is some information about Om's projects...

<ACTIONS>
[
  {"label": "Explore Projects", "type": "scroll", "target": "projects"},
  {"label": "SpotOnJalgaon Details", "type": "open_modal", "target": "spot-on-jalgaon"}
]
</ACTIONS>

Keep the main text clean and readable. Never print markdown raw links that don't exist. Max 2-3 actions per response.
`;
