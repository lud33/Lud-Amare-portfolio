import React, { useCallback, useEffect, useRef, useState } from "react";
import streaker1 from "./streaker1.png";
import streaker2 from "./streaker2.png";
import streaker3 from "./streaker3.png";
import streaker4 from "./streaker4.png";
import pic1 from "./pic1.png";
import pic2 from "./pic2.png";
import pic3 from "./pic3.png";
import pic4 from "./pic4.png";
import movies1 from "./movies1.png";
import movies2 from "./movies2.png";
import ethsl1 from "./ethsl1.png";
import ethsl2 from "./ethsl2.png";
import ethsl3 from "./ethsl3.png";

const projects = {
  stricker: [
    { src: streaker1, alt: "Streaker dashboard showing today's habits", screen: "Dashboard" },
    { src: streaker2, alt: "Streaker habit list and completion controls", screen: "Habits" },
    { src: streaker3, alt: "Streaker analytics and account settings", screen: "Analytics" },
    { src: streaker4, alt: "Streaker goals and progress overview", screen: "Goals" },
  ],
  pic: [
    { src: pic1, alt: "Partner In Crime event discovery feed", screen: "Discover" },
    { src: pic2, alt: "Partner In Crime meetup creation form", screen: "Create a PIC" },
    { src: pic3, alt: "Partner In Crime matched-user conversation", screen: "Chat" },
    { src: pic4, alt: "Partner In Crime profile and meetup activity", screen: "Profile" },
  ],
  esl: [
    { src: ethsl1, alt: "Ethiopian Sign Language learning course overview", screen: "Courses" },
    { src: ethsl2, alt: "Ethiopian Sign Language interactive quiz", screen: "Quiz" },
    { src: ethsl3, alt: "Ethiopian Sign Language learner progress", screen: "Progress" },
  ],
  movie: [
    { src: movies1, alt: "Movie Explorer titles with ratings and genres", screen: "Explore" },
    { src: movies2, alt: "Movie Explorer title details and trailer", screen: "Movie details" },
  ],
};

const projectDetails = [
  {
    id: "stricker",
    title: "Streaker",
    summary: "A habit and goal tracker for personal accountability.",
    description:
      "A personal accountability app for building habits, setting goals and seeing progress over time. Its React + TypeScript frontend connects to a Laravel 12 API for authentication, habits, completions and goals.",
    features: [
      "Register and log in; create habits and mark them complete with date and time.",
      "Set goals, track progress, view analytics and achievements, and manage account settings.",
    ],
    tags: ["React", "TypeScript", "Laravel 12", "REST API"],
    role: "Full-stack developer",
  },
  {
    id: "pic",
    title: "Partner In Crime",
    summary: "A social meetup app for finding people to do things with.",
    description:
      "A place to discover and organize meetups, connect with other attendees and coordinate plans in real time.",
    features: [
      "Discover feed of event listings; create a PIC with title, date, time, location, category and description.",
      "Request to join someone else's event, then chat with matched users to coordinate details.",
      "Keep track of your own PICs, notifications and profile.",
    ],
    tags: ["Full-stack", "Real-time chat", "Personal project"],
    role: "Full-stack developer",
  },
  {
    id: "esl",
    title: "Ethiopian Sign Language E-Learning",
    summary: "Interactive sign language courses with progress tracking.",
    description:
      "Backend developer on a learning platform built to make Ethiopian Sign Language education structured and accessible.",
    features: [
      "Built the core backend in Python Django, including secure authentication and course and level unlocking logic.",
      "Implemented interactive quizzes and learner progress tracking.",
      "Worked on frontend integration, testing, debugging and backend performance optimization.",
    ],
    tags: ["Python", "Django", "REST API"],
    role: "Backend developer",
  },
  {
    id: "movie",
    title: "Movie Explorer",
    summary: "A responsive way to explore films, ratings, genres and trailers.",
    description:
      "Full-stack developer. The React.js frontend uses a Node.js backend to securely handle TMDB API requests.",
    features: [
      "Browse movie details including ratings, genres and trailers.",
      "Responsive interface for browsing across devices.",
    ],
    tags: ["React.js", "Node.js", "TMDB API"],
    role: "Full-stack developer",
  },
];

const experience = [
  {
    date: "07/2026 to Present",
    role: "Full-Stack Developer",
    organization: "Kaba Communication · Addis Ababa",
    details: [
      "Build responsive, type-safe interfaces with React and TypeScript; backend services, database workflows and RESTful APIs with PHP and Laravel.",
      "Deliver end-to-end features connecting client-side interfaces to server-side business logic.",
      "Contribute to the design and refinement of digital products from functional requirements and user needs.",
      "Use Git and collaborative practices to keep software reliable and maintainable.",
    ],
  },
  {
    date: "07/2025 to 08/2025",
    role: "Web Development Intern",
    organization: "Saiket Systems · Remote",
    details: [
      "Built responsive front-end features in HTML, CSS and JavaScript.",
      "Helped maintain and debug company web apps and improved responsiveness across devices.",
    ],
  },
  {
    date: "06/2025 to 09/2025",
    role: "Intern, IP & Transmission Backbone",
    organization: "Ethio Telecom · Gonder",
    details: [
      "Learned routing, switching and backbone networking.",
      "Supported engineers with troubleshooting and documentation.",
    ],
  },
];

const researchWork = [
  {
    date: "02/2026 to 05/2026",
    role: "Video Editor",
    organization: "Fidel Tutorial · Addis Ababa",
    description:
      "Edit educational videos for digital learning platforms, improving pacing, clarity and visual presentation in collaboration with instructors.",
  },
  {
    date: "02/2026 to 05/2026",
    role: "Junior Video Editor",
    organization: "Southern Africa Embrace Foundation · Remote",
    description:
      "Edited short-form media telling social impact stories for international remote teams.",
  },
  {
    date: "12/2025 to 04/2026",
    role: "Research and Documentation",
    organization: "YeMuya Weg · Addis Ababa",
    details: [
      "Designed and ran quantitative and qualitative surveys for community-based research.",
      "Organized and analyzed datasets to find trends, and wrote concise technical summaries for stakeholders.",
      "Documented findings in clear, accessible outputs.",
    ],
  },
  {
    date: "10/2025 to 01/2026",
    role: "Graphic Designer",
    organization: "Addis Ababa University Radio FM 99.4",
    description: "Designed branding and promotional visuals for the radio broadcast.",
  },
  {
    date: "12/2024 to 03/2025",
    role: "Graphic Designer",
    organization: "Ethiopian Space Science Society (ESSS) · Addis Ababa",
    description:
      "Designed visuals for outreach programs and events, plus promotional materials for public awareness campaigns.",
  },
];

const skills = [
  ["Languages", "Python, JavaScript (ES6+), TypeScript, PHP, C++, HTML5, CSS3"],
  ["Frontend", "React.js, Tailwind CSS"],
  ["Backend & APIs", "Laravel, Django, Node.js, RESTful APIs"],
  ["Databases", "MySQL and multi-entity database workflows"],
  ["Tools", "Git, GitHub, Postman, VS Code, Figma"],
  ["Data & research", "Survey design, quantitative and qualitative data collection, dataset organization, data analysis, technical summaries"],
  ["Design & media", "Photoshop, Illustrator, CapCut, video editing, graphic design"],
  ["Networking", "Cisco CCNA routing, switching and backbone networking"],
];

function getSavedTheme() {
  try {
    const saved = localStorage.getItem("lud-portfolio-theme");
    return saved === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <article className="timeline-item" key={`${item.date}-${item.role}`}>
          <div className="timeline-date">{item.date}</div>
          <div>
            <h3>{item.role}</h3>
            <p className="timeline-org">{item.organization}</p>
            {item.description && <p>{item.description}</p>}
            {item.details && (
              <ul>
                {item.details.map((d) => <li key={d}>{d}</li>)}
              </ul>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

function ProjectGallery({ project, onOpen }) {
  const images = projects[project.id];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = images[selectedIndex];

  return (
    <div className="gallery" aria-label={`${project.title} screenshots`}>
      <button
        className="gallery-open"
        type="button"
        aria-label={`Open ${selected.screen} screenshot in a larger view`}
        onClick={() => onOpen(project.id, selectedIndex)}
      >
        <img
          className="gallery-main"
          src={selected.src}
          alt={selected.alt}
          loading="lazy"
        />
      </button>
      <div className="gallery-thumbs" aria-label="Choose a screenshot">
        {images.map((image, index) => (
          <button
            className="thumb-button"
            type="button"
            key={image.screen}
            aria-label={`Show ${image.screen} screenshot`}
            aria-current={index === selectedIndex ? "true" : "false"}
            onClick={() => setSelectedIndex(index)}
          >
            <img className="thumb-image" src={image.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
      <p className="gallery-caption">Click the image to view full size.</p>
    </div>
  );
}

function ProjectRow({ project, isOpen, onToggle, onOpenLightbox }) {
  const triggerId = `trigger-${project.id}`;
  const panelId = `panel-${project.id}`;
  const isEven = ["pic", "movie"].includes(project.id);

  return (
    <article className="project">
      <h3 className="project-heading">
        <button
          className="project-trigger"
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span>
            <span className="project-title">{project.title}</span>
            <span className="project-summary">{project.summary}</span>
          </span>
          <span className="project-indicator" aria-hidden="true">+</span>
        </button>
      </h3>
      <div
        className={`project-panel${isOpen ? " is-open" : ""}`}
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="panel-inner">
          <div className="project-content">
            <div className={`project-body${isEven ? " reverse" : ""}`}>
              <ProjectGallery project={project} onOpen={onOpenLightbox} />
              <div>
                <p style={{ font: "500 .72rem/1 var(--sans)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--coral)", marginBottom: ".75rem" }}>
                  {project.role}
                </p>
                <p className="project-description">{project.description}</p>
                <ul className="feature-list">
                  {project.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <ul className="tag-list" aria-label="Technologies">
                  {project.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Lightbox({ gallery, imageIndex, onClose, onStep }) {
  const closeButton = useRef(null);
  const image = gallery?.[imageIndex];

  useEffect(() => {
    if (!image) return undefined;
    closeButton.current?.focus();
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onStep(-1);
      if (e.key === "ArrowRight") onStep(1);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [Boolean(image), onClose, onStep]);

  if (!image) return null;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Project screenshot viewer"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <button className="lightbox-close" ref={closeButton} type="button" aria-label="Close" onClick={onClose}>×</button>
      <button className="lightbox-nav lightbox-prev" type="button" aria-label="Previous" onClick={() => onStep(-1)}>‹</button>
      <div className="lightbox-inner">
        <img className="lightbox-image" src={image.src} alt={image.alt} />
        <p className="lightbox-caption">{image.screen} · {imageIndex + 1} of {gallery.length}</p>
      </div>
      <button className="lightbox-nav lightbox-next" type="button" aria-label="Next" onClick={() => onStep(1)}>›</button>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(getSavedTheme);
  const [openProject, setOpenProject] = useState("stricker");
  const [lightbox, setLightbox] = useState(null);
  const [progress, setProgress] = useState(0);
  const lastFocused = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content =
      theme === "dark" ? "#0e1520" : "#faf7f2";
    try { localStorage.setItem("lud-portfolio-theme", theme); } catch {}
  }, [theme]);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const targets = document.querySelectorAll(
      "main > section:not(.hero), .project, .timeline-item, .skill-row, .background-block"
    );
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); observer.unobserve(e.target); } }),
      { threshold: 0.07, rootMargin: "0px 0px -28px 0px" }
    );
    targets.forEach((t) => { t.classList.add("reveal-on-scroll"); observer.observe(t); });
    return () => { observer.disconnect(); targets.forEach((t) => t.classList.remove("reveal-on-scroll", "is-visible")); };
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    requestAnimationFrame(() => lastFocused.current?.focus());
  }, []);

  const openLightbox = useCallback((projectId, imageIndex) => {
    lastFocused.current = document.activeElement;
    setLightbox({ gallery: projects[projectId], imageIndex });
  }, []);

  const stepLightbox = useCallback((dir) => {
    setLightbox((cur) => cur ? { ...cur, imageIndex: (cur.imageIndex + dir + cur.gallery.length) % cur.gallery.length } : cur);
  }, []);

  return (
    <>
      <div className="progress-track" aria-hidden="true">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#home" aria-label="Lud Amare Endale, home">
            Lud Amare <span>Endale</span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#research">Research &amp; media</a>
            <a href="#background">Background</a>
            <a href="#contact">Contact</a>
            <button
              className="theme-toggle"
              type="button"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              onClick={() => setTheme((c) => c === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? "☀ Light" : "☾ Dark"}
            </button>
          </nav>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-bg-shape hero-bg-shape-1" aria-hidden="true" />
          <div className="hero-bg-shape hero-bg-shape-2" aria-hidden="true" />
          <p className="hero-eyebrow">
            <span className="star">✦</span>
            Full-stack software engineer · Addis Ababa, Ethiopia
          </p>
          <h1 id="hero-title">
            <span className="name-word">Lud</span>{" "}
            <span className="name-word">Amare</span>
            <span className="hero-rule" aria-hidden="true" />
          </h1>
          <p className="hero-intro">
            I build web applications and APIs with React, TypeScript, Laravel and Django —
            turning requirements into products people can actually use.
          </p>
          <div className="hero-meta">
            <span><span className="dot" />Available for work</span>
            <span>Addis Ababa, Ethiopia</span>
            <span>BSc Computer Science · AAU</span>
          </div>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#work">Explore my work ↗</a>
            <a className="btn btn-outline" href="#contact">Let's connect</a>
          </div>
        </section>

        {/* ── Work ── */}
        <section id="work" aria-labelledby="work-title">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title">Projects</h2>
          <p className="section-note">
            A selection of products I've built and contributed to across software, learning and community.
          </p>
          <div className="project-list">
            {projectDetails.map((project) => (
              <ProjectRow
                key={project.id}
                project={project}
                isOpen={openProject === project.id}
                onToggle={() => setOpenProject((c) => c === project.id ? null : project.id)}
                onOpenLightbox={openLightbox}
              />
            ))}
          </div>
        </section>

        {/* ── Experience ── */}
        <section id="experience" aria-labelledby="experience-title">
          <p className="eyebrow">Career</p>
          <h2 id="experience-title">Experience</h2>
          <Timeline items={experience} />
        </section>

        {/* ── Research ── */}
        <section id="research" aria-labelledby="research-title">
          <p className="eyebrow">Beyond code</p>
          <h2 id="research-title">Research &amp; media</h2>
          <Timeline items={researchWork} />
        </section>

        {/* ── Background ── */}
        <section id="background" aria-labelledby="background-title">
          <p className="eyebrow">About</p>
          <h2 id="background-title">Skills &amp; background</h2>
          <div className="skills-list">
            {skills.map(([label, items]) => (
              <div className="skill-row" key={label}>
                <h3>{label}</h3>
                <p>{items}</p>
              </div>
            ))}
          </div>
          <div className="background-block">
            <h3>Education</h3>
            <p>
              <strong>BSc in Computer Science</strong> · Addis Ababa University, 2023 to 2026<br />
              Cumulative GPA 3.51/4.00 · Major GPA 3.58/4.00
            </p>
            <p>Solved 400+ LeetCode problems focused on data structures, algorithms and optimization.</p>
          </div>
          <div className="background-block">
            <h3>Certifications</h3>
            <ul>
              <li>Cisco CCNA v7 (Switching, Routing and Wireless Essentials)</li>
              <li>FreeCodeCamp HTML &amp; CSS Basics</li>
              <li>AAIT Graphic Design Certification</li>
            </ul>
          </div>
          <div className="background-block">
            <h3>Languages spoken</h3>
            <p>Amharic (native), English (fluent), Ethiopian Sign Language (beginner)</p>
          </div>
          <div className="background-block">
            <h3>Leadership</h3>
            <p>
              <strong>Student Council President (CNCS) and Ambassador</strong> · Addis Ababa University, 2024 to 2025
            </p>
            <p>
              Led campus-wide initiatives with diverse stakeholders, advocated for student needs,
              and worked with university administration on academic and structural challenges.
            </p>
            <p>
              <strong>National Youth Ambassador of Ethics</strong> with the Federal Ethics and
              Anti-Corruption Commission, and safeguarding member of the e-SHE Youth Advisory Group.
            </p>
          </div>
        </section>

        {/* ── Contact ── */}
        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="contact-inner">
            <p className="eyebrow" style={{ color: "rgba(240,236,228,.45)" }}>Get in touch</p>
            <h2 id="contact-title">
              Let's create something <em>meaningful.</em>
            </h2>
            <p>
              Open to software engineering work, as well as roles in data,
              digital transformation and knowledge management.
            </p>
            <a className="email-link" href="mailto:ludamare4@gmail.com">
              ludamare4@gmail.com
            </a>
          </div>
        </section>
      </main>

      <footer>Designed and built by Lud Amare Endale · Addis Ababa, Ethiopia</footer>

      {lightbox && (
        <Lightbox
          gallery={lightbox.gallery}
          imageIndex={lightbox.imageIndex}
          onClose={closeLightbox}
          onStep={stepLightbox}
        />
      )}
    </>
  );
}
