# Om Sultane - Personal Portfolio Website

A modern, responsive, dark-themed personal portfolio built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**. Designed specifically for software engineering recruiters, hiring managers, and collaborators.

## 🚀 Key Highlights & Structure

- **Theme & Aesthetics**: Dark palette (`#07090e`, slate/charcoal) with electric indigo/violet accents, subtle glows, and clean typography (`Inter` + `JetBrains Mono`).
- **Data & UI Separation**: All personal information, projects, skills, and experience are isolated in dedicated datasets so updates are seamless:
  - `src/config/portfolio.ts`: Central configurations (Name, email, headline, social URLs, availability badge status, and resume toggle).
  - `src/data/skills.ts`: Categorized technical skills without misleading progress bars.
  - `src/data/projects.ts`: Featured projects (`SpotOnJalgaon`, `Digital Content Organizer`, `Java DSA Practice`) with features, tech tags, and details.
  - `src/data/experience.ts`: Softanic Solutions internship details and RCPIT Computer Engineering degree timeline.
- **Sections**:
  1. **Sticky Navigation Bar**: Smooth scrolling to `#home`, `#about`, `#skills`, `#projects`, `#experience`, `#contact`, active section highlighting, mobile drawer, and resume download support.
  2. **Hero Section**: Introductions, availability badge, call-to-actions, and an abstract developer architecture card (no fake portraits).
  3. **About Me**: Narrative introduction and 3 clean cards for Education, Development, and Current Focus.
  4. **Technical Skills**: Grouped into Programming Languages, Frontend, Backend, In Active Study (DSA, Spring Boot, Java Backend), and Developer Tools.
  5. **Featured Projects**: Interactive cards with custom architecture graphics, GitHub repo buttons, and a **"Details" modal** for deep dives into features and schema.
  6. **Experience & Education Timeline**: Detailed Softanic Solutions internship and RCPIT degree milestones.
  7. **Learning Journey ("What I'm Working On")**: Transparent daily roadmap of DSA, Java OOP, Spring Boot, and database optimization.
  8. **GitHub Showcase**: Genuine repository cards linking to [github.com/OmSultane](https://github.com/OmSultane) without synthetic star counts.
  9. **Contact Section**: Input validation, direct email copying, and real `mailto:` message dispatcher.
  10. **Footer**: Dynamic year, navigation links, social icons, and tagline.

## 🛠️ How to Run Locally

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

## ⚙️ How to Update Your Information

- **Add your resume**: Place `resume.pdf` inside the `public/` folder, then open `src/config/portfolio.ts` and set `resume.available: true`.
- **Update your LinkedIn or Email**: Open `src/config/portfolio.ts` and change `contact.linkedin` or `contact.email`.
- **Add or modify projects**: Edit `src/data/projects.ts` to add new repositories, screenshots, or live demo URLs.
