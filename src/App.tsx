import { motion, useScroll, useSpring } from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Download,
  GitBranch as Github,
  GraduationCap,
  Contact as Linkedin,
  Mail,
  MapPin,
  Menu,
  Orbit,
  Rocket,
  Satellite,
  Sparkles,
  TerminalSquare,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { SpaceBackground } from './components/space/SpaceBackground'
import ExperienceSection from './components/experience/ExperienceSection'
import './styles/experience.css'

const navItems = ['home', 'about', 'skills', 'projects', 'experience', 'contact']

const skills = [
  { name: 'Java', level: 78 },
  { name: 'Python', level: 88 },
  { name: 'SQL', level: 74 },
  { name: 'JavaScript', level: 80 },
  { name: 'React + TypeScript', level: 82 },
  { name: 'LangChain + CrewAI', level: 86 },
  { name: 'NLP + RAG', level: 84 },
  { name: 'Node.js', level: 76 },
]

const projects = [
  {
    number: '01',
    title: 'ClauseAI',
    subtitle: 'Multi-Agent Legal Contract Analysis',
    description:
      'A coordinated AI-agent system that breaks contracts into sections, routes termination, indemnity and jurisdiction tasks to specialized agents, remembers earlier context and returns structured risk insights.',
    stack: ['Python', 'LangChain', 'CrewAI', 'Prompt Engineering'],
    icon: BrainCircuit,
    accent: 'violet',
  },
  {
    number: '02',
    title: 'AI Resume Analyzer',
    subtitle: 'Instant NLP Resume Intelligence',
    description:
      'A Streamlit application that parses uploaded PDF resumes, extracts skills, education and experience, categorizes the content using NLP and presents clean candidate comparisons instantly.',
    stack: ['Python', 'Streamlit', 'NLP', 'PDF Parsing'],
    icon: Satellite,
    accent: 'cyan',
  },
  {
    number: '03',
    title: 'VisionNet',
    subtitle: 'Deep-Learning Object Recognition',
    description:
      'An internship project focused on multi-object recognition, covering dataset preparation, image preprocessing, model experimentation, testing and practical deep-learning workflow collaboration.',
    stack: ['Python', 'Deep Learning', 'Computer Vision', 'Testing'],
    icon: Orbit,
    accent: 'pink',
  },
]

function useActiveSection() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const sections = navItems
      .map((id) => document.getElementById(id))
      .filter((item): item is HTMLElement => Boolean(item))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0.05, 0.25, 0.6] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return active
}

function Reveal({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65 }}
    >
      {children}
    </motion.section>
  )
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <Reveal className="section-heading">
      <span className="eyebrow"><Sparkles size={14} /> {eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection = useActiveSection()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handlePointer = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`)
    }
    window.addEventListener('pointermove', handlePointer)
    return () => window.removeEventListener('pointermove', handlePointer)
  }, [])

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="app-shell">
      <SpaceBackground />
      
      <div className="portfolio-content">
        <div className="cosmic-noise" />
        <div className="cursor-glow" />
        <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <header className="topbar">
        <button className="brand" onClick={() => goTo('home')} aria-label="Go to home">
          <span className="brand-orbit"><span /></span>
          <span>VICTOR<span className="brand-dot">.</span>AI</span>
        </button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item}
              className={activeSection === item ? 'active' : ''}
              onClick={() => goTo(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <a className="status-pill" href="mailto:mvictorvengatesh@gmail.com">
          <span /> Available for opportunities
        </a>

        <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {menuOpen && (
        <motion.nav
          className="mobile-nav"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => (
            <button key={item} onClick={() => goTo(item)}>{item}</button>
          ))}
        </motion.nav>
      )}

      <main>
        <motion.section
          id="home"
          className="hero section-wrap"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="hero-grid">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, x: -48 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mission-label"><span>MISSION 01</span><i /> AI FRONTIER</div>
              <p className="hero-kicker">Hello, I’m</p>
              <h1>
                M. VICTOR
                <span>VENGATESH</span>
              </h1>
              <div className="role-line">
                <span className="role-bracket">[</span>
                AI/ML ENGINEER · FULL-STACK EXPLORER
                <span className="typing-cursor" />
                <span className="role-bracket">]</span>
              </div>
              <p className="hero-summary">
                I build intelligent applications using NLP, LLM workflows, multi-agent systems and modern web technologies—turning ambitious ideas into practical, explainable products.
              </p>
              <div className="hero-actions">
                <button className="primary-cta" onClick={() => goTo('projects')}>
                  Explore my universe <Rocket size={18} />
                </button>
                <a 
                  className="secondary-cta" 
                  href="/resume/Victor_Vengatesh_Resume.pdf" 
                  download="Victor_Vengatesh_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >                 
                  Download resume <Download size={18} />                                                    
                </a>
              </div>
              <div className="social-row">
                <a href="https://github.com/victorvengatesh" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
                <a href="https://linkedin.com/in/victorvengatesh" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
                <a href="mailto:mvictorvengatesh@gmail.com" aria-label="Email"><Mail /></a>
                <span className="signal-line" />
                <span>TRANSMISSION OPEN</span>
              </div>
            </motion.div>

            <motion.div
              className="hero-hud"
              initial={{ opacity: 0, scale: 0.88, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.15, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hud-ring ring-one" />
              <div className="hud-ring ring-two" />
              <div className="hud-cross horizontal" />
              <div className="hud-cross vertical" />
              <div className="hud-core">
                <span>CORE PROFILE</span>
                <strong>AI × WEB</strong>
                <small>ONLINE</small>
              </div>
              <div className="hud-data data-a"><span>CGPA</span><strong>7.8</strong></div>
              <div className="hud-data data-b"><span>PROJECTS</span><strong>03+</strong></div>
              <div className="hud-data data-c"><span>FOCUS</span><strong>LLM</strong></div>
              <div className="hud-data data-d"><span>STATUS</span><strong>READY</strong></div>
            </motion.div>
          </div>

          <button className="scroll-cue" onClick={() => goTo('about')}>
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown size={17} />
          </button>
        </motion.section>

        <Reveal id="about" className="section-wrap content-section">
          <SectionHeading
            eyebrow="01 / Origin Story"
            title="Human curiosity. Machine intelligence."
            text="An AI & Machine Learning student building at the intersection of intelligent systems, strong fundamentals and meaningful user experiences."
          />

          <div className="about-grid">
            <Reveal className="glass-panel about-story">
              <div className="panel-corners" />
              <span className="panel-code">PROFILE.LOG</span>
              <h3>Building systems that think, explain and help.</h3>
              <p>
                I am pursuing B.E. Artificial Intelligence and Machine Learning at V.S.B. Engineering College, Karur. My work spans multi-agent AI, NLP, RAG, resume intelligence, computer vision and full-stack interfaces.
              </p>
              <p>
                I enjoy converting complex AI workflows into clear products. I am currently strengthening Data Structures & Algorithms and core computer-science fundamentals for AI/ML engineering and software-development roles.
              </p>
              <div className="location-row"><MapPin size={17} /> Madurai, Tamil Nadu, India</div>
            </Reveal>

            <Reveal className="profile-stats">
              <div className="stat-card"><strong>7.8</strong><span>Current CGPA</span><i>ACADEMIC SIGNAL</i></div>
              <div className="stat-card"><strong>04</strong><span>Core Languages</span><i>JAVA · PY · SQL · JS</i></div>
              <div className="stat-card"><strong>02</strong><span>Internship Stints</span><i>BUILD · TRAIN · TEST</i></div>
              <div className="stat-card"><strong>∞</strong><span>Learning Velocity</span><i>ALWAYS EVOLVING</i></div>
            </Reveal>
          </div>
        </Reveal>

        <Reveal id="skills" className="section-wrap content-section">
          <SectionHeading
            eyebrow="02 / Technology Constellation"
            title="My engineering toolkit"
            text="A growing stack for building intelligent systems from model workflow to polished interface."
          />

          <div className="skills-layout">
            <Reveal className="skill-radar glass-panel">
              <div className="radar-grid" />
              <div className="radar-sweep" />
              <div className="radar-center"><Code2 size={25} /><span>STACK<br />ONLINE</span></div>
              <div className="orbit-label label-1">AI/ML</div>
              <div className="orbit-label label-2">WEB</div>
              <div className="orbit-label label-3">DSA</div>
              <div className="orbit-label label-4">NLP</div>
            </Reveal>

            <div className="skill-bars">
              {skills.map((skill, index) => (
                <Reveal key={skill.name} className="skill-row">
                  <div><span>{String(index + 1).padStart(2, '0')}</span><strong>{skill.name}</strong><em>{skill.level}%</em></div>
                  <div className="skill-track"><motion.i initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: index * 0.07 }} /></div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="tech-marquee">
            <div>
              {['Machine Learning', 'Prompt Engineering', 'RAG', 'CrewAI', 'LangChain', 'React', 'TypeScript', 'Node.js', 'GitHub', 'Streamlit', 'DBMS', 'OOP'].map((item) => <span key={item}>{item}<i>✦</i></span>)}
            </div>
          </Reveal>
        </Reveal>

        <Reveal id="projects" className="section-wrap content-section projects-section">
          <SectionHeading
            eyebrow="03 / Selected Missions"
            title="Projects launched into orbit"
            text="Practical systems created to solve real problems with AI, automation and thoughtful interfaces."
          />

          <div className="project-list">
            {projects.map((project, index) => {
              const Icon = project.icon
              return (
                <motion.article
                  key={project.title}
                  className={`project-card accent-${project.accent}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-70px' }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="project-number">{project.number}</div>
                  <div className="project-icon"><Icon /></div>
                  <div className="project-content">
                    <span>{project.subtitle}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-stack">{project.stack.map((item) => <b key={item}>{item}</b>)}</div>
                  </div>
                  <div className="project-orbit"><span /><i /></div>
                </motion.article>
              )
            })}
          </div>
        </Reveal>

        <Reveal id="experience" className="section-wrap content-section">
          <SectionHeading
            eyebrow="04 / Flight Record"
            title="Experience and education"
            text="Hands-on learning through product building, model development, testing and formal AI/ML study."
          />

          <ExperienceSection />
          
          <div className="timeline" style={{ marginTop: '4rem' }}>

            <Reveal className="timeline-item">
              <div className="timeline-marker"><GraduationCap /></div>
              <div className="timeline-card glass-panel">
                <div className="timeline-top"><div><span>2023–Present</span><h3>B.E. Artificial Intelligence & Machine Learning</h3><p>V.S.B. Engineering College, Karur</p></div><b>EDUCATION</b></div>
                <ul>
                  <li>Current CGPA: 7.8</li>
                  <li>Coursework: Machine Learning, Deep Learning, NLP, DSA, OOP, OS and DBMS.</li>
                  <li>Continuously practising DSA problems on LeetCode.</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </Reveal>

        <Reveal id="contact" className="section-wrap contact-section">
          <motion.div
            className="contact-console"
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85 }}
          >
            <div className="console-grid" />
            <div className="contact-orbit orbit-a" />
            <div className="contact-orbit orbit-b" />
            <div className="contact-core"><TerminalSquare /><span>OPEN CHANNEL</span></div>
            <span className="eyebrow"><Sparkles size={14} /> 05 / Final Transmission</span>
            <h2>Let’s build something<br /><span>out of this world.</span></h2>
            <p>I’m open to AI/ML engineering, software-development opportunities, internships and ambitious collaborations.</p>
            <a className="contact-button" href="mailto:mvictorvengatesh@gmail.com">
              Start a conversation <ArrowUpRight size={19} />
            </a>
            <div className="contact-links">
              <a href="mailto:mvictorvengatesh@gmail.com"><Mail /> Email</a>
              <a href="https://linkedin.com/in/victorvengatesh" target="_blank" rel="noreferrer"><Linkedin /> LinkedIn</a>
              <a href="https://github.com/victorvengatesh" target="_blank" rel="noreferrer"><Github /> GitHub</a>
            </div>
          </motion.div>
        </Reveal>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} M. Victor Vengatesh</span>
        <span>DESIGNED IN EARTH ORBIT · BUILT WITH REACT + THREE.JS</span>
        <button onClick={() => goTo('home')} aria-label="Back to top"><ArrowDown className="back-top" /></button>
      </footer>
      </div>
    </div>
  )
}
