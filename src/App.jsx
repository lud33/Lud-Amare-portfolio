import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
import CircularCarousel from "./CircularCarousel.jsx";
import WakeSlider from "./WakeSlider.jsx";
import DotField from "./DotField.jsx";

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
    intro: "Build habits. Keep momentum.",
    detail:
      "A focused place to create daily habits, set goals and track progress over time, built with a React and TypeScript frontend and a Laravel 12 API.",
    featureCards: [
      {
        title: "Authentication & tracking",
        description: "Sign in, create habits, and record completions with the date and time.",
      },
      {
        title: "Analytics & goals",
        description: "Set goals, follow progress, review analytics and achievements, and manage account settings.",
      },
    ],
    tags: ["React", "TypeScript", "Laravel 12", "REST API"],
    role: "Full-stack developer",
  },
  {
    id: "pic",
    title: "Partner In Crime",
    summary: "A social meetup app for finding people to do things with.",
    intro: "Find your people. Make a plan.",
    description:
      "Partner In Crime helps people find company for events and activities. Users can discover meetups, create their own, request to join, and chat with matched attendees to coordinate plans.",
    featureCards: [
      {
        title: "Discover & create",
        description: "Browse event listings or create a meetup with its time, place, category and details.",
      },
      {
        title: "Join & connect",
        description: "Request to join an event and chat with matched attendees to coordinate plans.",
      },
      {
        title: "Your activity",
        description: "Keep track of your own meetups, notifications and profile.",
      },
    ],
    tags: ["Full-stack", "Real-time chat", "Personal project"],
    role: "Full-stack developer",
  },
  {
    id: "esl",
    title: "Ethiopian Sign Language E-Learning",
    summary: "A React.js frontend for sign language courses and learner progress.",
    intro: "Learn. Practice. Progress.",
    description:
      "I contributed to ETHSL as a frontend developer, building React.js experiences for courses, quizzes and learner progress, with some backend support. The platform gives Ethiopian Sign Language learners a structured way to follow lessons and practice.",
    featureCards: [
      {
        title: "Courses & levels",
        description: "Browse courses and learning levels in a structured learning experience.",
      },
      {
        title: "Interactive quizzes",
        description: "Practice with quiz interfaces built for the learning platform.",
      },
      {
        title: "Progress & usability",
        description: "Follow learner progress through a refined, accessibility-minded interface.",
      },
    ],
    tags: ["React.js", "JavaScript", "Frontend", "Backend support"],
    role: "Frontend developer with backend support",
  },
  {
    id: "movie",
    title: "Movie Explorer",
    summary: "A responsive way to explore films, ratings, genres and trailers.",
    intro: "A better way to browse films.",
    description:
      "Movie Explorer brings film details, ratings, genres and trailers into a responsive browsing experience. Its React.js frontend works with a Node.js backend that securely handles requests to the TMDB API.",
    featureCards: [
      {
        title: "Explore film details",
        description: "Browse movie ratings, genres and trailers in one place.",
      },
      {
        title: "Responsive by design",
        description: "Use the browsing experience across screen sizes.",
      },
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

const themePhases = ["deep-dark", "soft-dark", "warm-dark", "soft-light", "warm-light", "pure-light"];
const themeLabels = ["Deep Dark", "Soft Dark", "Warm Dark", "Soft Light", "Warm Light", "Pure Light"];

function phaseForValue(value) {
  return Math.min(themePhases.length - 1, Math.floor((value * themePhases.length) / 101));
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

function ProjectGallery({ project, onOpen, isActive }) {
  const images = projects[project.id];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [motionStartIndex, setMotionStartIndex] = useState(0);
  const [motionKey, setMotionKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const selected = images[selectedIndex];
  const updateIndex = useCallback((index) => setSelectedIndex(index), []);
  const selectIndex = useCallback((index) => {
    setSelectedIndex(index);
    setMotionStartIndex(index);
    setMotionKey((key) => key + 1);
  }, []);
  const step = (direction) => {
    selectIndex((selectedIndex + direction + images.length) % images.length);
  };

  return (
    <div className="gallery" aria-label={`${project.title} screenshots`}>
      <CircularCarousel
        items={images}
        activeIndex={selectedIndex}
        motionStartIndex={motionStartIndex}
        motionKey={motionKey}
        onChange={updateIndex}
        onSelect={selectIndex}
        onOpen={(index) => onOpen(project.id, index)}
        onPhotoClick={() => setIsPaused(true)}
        isPaused={isPaused}
        cardWidth={380}
        interval={6}
        direction="left"
        pauseOnHover={false}
        focusOnClick
        draggable
        tilt={0}
        perspective={1800}
        depthFade={0.55}
        cornerRadius={12}
        isActive={isActive}
      />
      <div className="gallery-navigation">
        <div className="gallery-stepper" role="group" aria-label="Screenshot navigation">
          <button
            className="gallery-control"
            type="button"
            aria-label="Previous screenshot"
            onClick={() => step(-1)}
          >
            ‹
          </button>
          <button
            className="gallery-control"
            type="button"
            aria-label="Next screenshot"
            onClick={() => step(1)}
          >
            ›
          </button>
        </div>
        <span className="gallery-count" aria-live="polite">
          {selectedIndex + 1} / {images.length}
        </span>
        <div className="gallery-pagination" role="group" aria-label="Choose a screenshot">
          {images.map((image, index) => (
            <button
              className="gallery-dot"
              type="button"
              key={image.screen}
              aria-label={`Show ${image.screen} screenshot`}
              aria-current={index === selectedIndex ? "true" : "false"}
              onClick={() => selectIndex(index)}
            />
          ))}
        </div>
      </div>
      <p className="gallery-caption">Click a photo to pause the rotation; click the selected photo to view full size.</p>
    </div>
  );
}

function ProjectRow({ project, onOpenLightbox }) {
  const headingId = `project-${project.id}-title`;
  const panelId = `panel-${project.id}`;
  const projectRef = useRef(null);
  const hasEnteredView = useRef(false);
  const [isInView, setIsInView] = useState(false);
  const [hasPassed, setHasPassed] = useState(false);

  useEffect(() => {
    const projectElement = projectRef.current;
    if (!projectElement) return undefined;
    if (!("IntersectionObserver" in window)) {
      setIsInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        hasEnteredView.current = true;
        setIsInView(true);
        setHasPassed(false);
      } else if (hasEnteredView.current && entry.boundingClientRect.top < 0) {
        setIsInView(false);
        setHasPassed(true);
      }
    }, { threshold: 0 });

    observer.observe(projectElement);
    return () => observer.disconnect();
  }, []);

  return (
    <article className={`project${hasPassed ? " is-passed" : ""}`} ref={projectRef}>
      <div className="project-heading">
        <h3 className="project-title" id={headingId}>{project.title}</h3>
        <span className="project-heading-meta">
          <span className="project-summary">{project.summary}</span>
          <ul className="tag-list project-header-tags" aria-label="Technologies">
            {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        </span>
      </div>
      <div
        className={`project-panel${isInView ? " is-visible" : ""}`}
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        aria-hidden={!isInView}
        inert={!isInView}
      >
        <div className="panel-inner">
          <div className="project-content">
            <div className="project-body project-body-featured">
              <div className="project-details project-details-featured">
                <p className="project-role">{project.role}</p>
                <p className="project-description project-description-lead">{project.intro}</p>
                <p className="project-description project-description-featured">{project.description}</p>
                <div className="project-feature-cards">
                  {project.featureCards.map((feature, index) => (
                    <article className="project-feature-card" key={feature.title}>
                      <span className="project-feature-number" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <ProjectGallery project={project} onOpen={onOpenLightbox} isActive={isInView} />
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
  const [themePhase, setThemePhase] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [progress, setProgress] = useState(0);
  const [fontsReady, setFontsReady] = useState(false);
  const lastFocused = useRef(null);

  const handleHeroCollageMove = useCallback((event) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--collage-near-x", `${x * -5}px`);
    event.currentTarget.style.setProperty("--collage-near-y", `${y * -5}px`);
    event.currentTarget.style.setProperty("--collage-far-x", `${x * 3}px`);
    event.currentTarget.style.setProperty("--collage-far-y", `${y * 3}px`);
  }, []);

  const resetHeroCollage = useCallback((event) => {
    ["--collage-near-x", "--collage-near-y", "--collage-far-x", "--collage-far-y"]
      .forEach((property) => event.currentTarget.style.removeProperty(property));
  }, []);

  useEffect(() => {
    if (!document.fonts) {
      setFontsReady(true);
      return;
    }
    document.fonts.ready.then(() => setFontsReady(true));
  }, []);

  const handleThemeChange = useCallback((value) => {
    const nextPhase = phaseForValue(value);
    setThemePhase((current) => current === nextPhase ? current : nextPhase);
  }, []);

  useLayoutEffect(() => {
    document.documentElement.dataset.themePhase = themePhases[themePhase];
    const themeColors = ["#090d14", "#171c24", "#28211e", "#dce8f4", "#f4eadb", "#faf7f2"];
    document.querySelector('meta[name="theme-color"]').content = themeColors[themePhase];
  }, [themePhase]);

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
          <a className="wordmark" href="#home" aria-label="Lud Amare, home">
            Lud Amare
          </a>
          <nav aria-label="Main navigation">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#research">Research &amp; media</a>
            <a href="#background">Background</a>
            <a href="#contact">Contact</a>
            <WakeSlider
              min={0}
              max={100}
              step={1}
              bars={20}
              height={20}
              restHeight={4}
              gap={2}
              fillColor="#f5f5f5"
              trackColor="#27272a"
              sensitivity={1}
              reach={6}
              skew={0.6}
              glide={0.3}
              smoothing={100}
              showValue={false}
              value={0}
              phase={themeLabels[themePhase]}
              onChange={handleThemeChange}
              disabled={false}
            />
          </nav>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className={`hero${fontsReady ? " fonts-ready" : ""}`} id="home" aria-labelledby="hero-title">
          <div className="hero-background" aria-hidden="true">
            <DotField
              gradientFrom={themePhase < 3 ? "#79583D" : "#A98362"}
              gradientTo={themePhase < 3 ? "#C49A70" : "#D8B995"}
              dotRadius={1.5}
              dotSpacing={14}
              cursorRadius={240}
              bulgeStrength={0.6}
              glowRadius={160}
              pattern="grid"
              glowColor={themePhase < 3 ? "#D5B48D" : "#F0D9B9"}
              gradientAngle={135}
              twist={0}
              glowIntensity={0.8}
              baseOpacity={0.42}
              waveAmplitude={0}
              speed={1}
              sparkle={false}
              interactive
              holdToZoom
              intro
              lightMode={themePhase >= 3}
            />
            <div className="hero-background-overlay" />
          </div>
          <div className="hero-content">
            <div className="hero-composition">
              <div className="hero-main">
                <p className="hero-eyebrow">
                  Full-stack software engineer <span aria-hidden="true">·</span> Addis Ababa, Ethiopia
                </p>
                <h1 id="hero-title" className="hero-headline">
                  <span>Hello, I’m</span>
                  <span className="hero-name">Lud <em>Amare.</em></span>
                </h1>
                <p className="hero-intro">
                  I build web applications and APIs with React, TypeScript, Laravel, and Django — turning requirements into products people can actually use.
                </p>
                <ul className="hero-tech" aria-label="Technology stack">
                  <li>React</li>
                  <li>TypeScript</li>
                  <li>Laravel</li>
                  <li>Django</li>
                </ul>
                <div className="hero-meta">
                  <span>Addis Ababa, Ethiopia</span>
                  <span>BSc Computer Science · AAU</span>
                </div>
                <div className="hero-actions">
                  <a className="btn btn-primary" href="#work">Explore My Work <span aria-hidden="true">↗</span></a>
                  <a className="btn btn-outline" href="#contact">Let's Connect</a>
                </div>
              </div>
              <aside
                className="hero-collage"
                aria-label="A selection of project work"
                style={{ "--collage-accent": themePhase < 3 ? "#B89470" : "var(--hero-accent)" }}
                onPointerMove={handleHeroCollageMove}
                onPointerLeave={resetHeroCollage}
              >
                <div className="hero-collage-heading">
                  <span>Selected work</span>
                </div>
                <div className="hero-collage-stage">
                  <figure className="hero-print hero-print-streaker">
                    <img src={streaker1} alt="Streaker habit tracker dashboard" />
                    <figcaption><span>01 / Streaker</span><span>React · Laravel</span></figcaption>
                  </figure>
                  <figure className="hero-print hero-print-pic">
                    <img src={pic1} alt="Partner In Crime event discovery page" />
                    <figcaption><span>02 / Partner In Crime</span><span>Meetup app</span></figcaption>
                  </figure>
                  <figure className="hero-print hero-print-ethsl">
                    <img src={ethsl1} alt="Ethiopian Sign Language learning platform" />
                    <figcaption><span>03 / ETHSL</span><span>Learning platform</span></figcaption>
                  </figure>
                  <span className="hero-collage-annotation" aria-hidden="true">notes from the workbench</span>
                </div>
              </aside>
            </div>
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
          <div className="contact-background" aria-hidden="true">
            <DotField
              gradientFrom={themePhase < 3 ? "#6848D8" : "#A98362"}
              gradientTo={themePhase < 3 ? "#B77BE4" : "#D8B995"}
              dotRadius={1.5}
              dotSpacing={14}
              cursorRadius={240}
              bulgeStrength={0.6}
              glowRadius={160}
              pattern="grid"
              glowColor={themePhase < 3 ? "#A98BFF" : "#F0D9B9"}
              gradientAngle={135}
              twist={0}
              glowIntensity={0.8}
              baseOpacity={0.3}
              waveAmplitude={0}
              speed={1}
              sparkle={false}
              interactive
              holdToZoom
              intro
              lightMode={themePhase >= 3}
            />
          </div>
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

      <footer>Designed and built by Lud Amare · Addis Ababa, Ethiopia</footer>

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
