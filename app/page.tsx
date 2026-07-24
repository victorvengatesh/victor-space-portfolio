"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const skills = [
  ["Languages", "Python · Java · JavaScript"],
  ["AI / ML", "Machine Learning · NLP · LLM Applications"],
  ["Frameworks", "LangChain · CrewAI · Streamlit"],
  ["Systems", "Multi-Agent Systems · Prompt Engineering · Context-Aware AI"],
  ["Foundations", "DSA · OOP · DBMS · Operating Systems"],
];

const projects = [
  {
    no: "01",
    name: "ClauseAI",
    kind: "MULTI-AGENT LEGAL INTELLIGENCE",
    copy: "A CrewAI orchestrator routes contract clauses to specialist agents, remembers context, and transforms dense legal text into structured risks and obligations.",
    stack: "PYTHON / CREWAI / LANGCHAIN / PROMPT ENGINEERING",
  },
  {
    no: "02",
    name: "AI Resume Analyzer",
    kind: "NLP DOCUMENT INTELLIGENCE",
    copy: "A Streamlit application that parses PDF resumes and organises candidate skills, education, and experience into clear, comparable sections.",
    stack: "PYTHON / STREAMLIT / NLP / PDF PARSING",
  },
  {
    no: "03",
    name: "VisionNet",
    kind: "DEEP LEARNING VISION",
    copy: "A multi-object recognition project shaped through hands-on work in data preparation, model training, classification, and systematic testing.",
    stack: "PYTHON / DEEP LEARNING / COMPUTER VISION",
  },
];

function Arrow() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
}

function Petals({ paused }: { paused: boolean }) {
  return (
    <div className={paused ? "petals paused" : "petals"} aria-hidden="true">
      {Array.from({ length: 20 }, (_, i) => (
        <i key={i} style={{
          "--left": `${(i * 43) % 100}%`,
          "--delay": `${-i * 1.2}s`,
          "--speed": `${11 + (i % 6) * 1.7}s`,
          "--drift": `${-90 + (i % 7) * 30}px`,
          "--size": `${6 + (i % 4) * 3}px`,
        } as React.CSSProperties} />
      ))}
    </div>
  );
}

function Panel({ side = "left", label, title, children }: {
  side?: "left" | "right"; label: string; title: React.ReactNode; children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={`panel ${side}`} initial={{ opacity: 0, x: reduce ? 0 : side === "left" ? -70 : 70, filter: reduce ? "none" : "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }} viewport={{ amount: .45 }}
      transition={{ duration: reduce ? .15 : .85, ease: [0.16, 1, .3, 1] }}>
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      {children}
    </motion.div>
  );
}

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [menu, setMenu] = useState(false);
  const [chapter, setChapter] = useState(0);
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 55, damping: 22, mass: .45 });
  const gate = useTransform(progress, [0, .14, .28], [1, 1, 0]);
  const falls = useTransform(progress, [.18, .3, .7, .84], [0, 1, 1, 0]);
  const court = useTransform(progress, [.72, .87], [0, 1]);
  const scale = useTransform(progress, [0, 1], reduced || paused ? [1, 1] : [1, 1.17]);
  const y = useTransform(progress, [0, 1], reduced || paused ? ["0%", "0%"] : ["0%", "-4%"]);
  const mist = useTransform(progress, [0, 1], ["-10%", "10%"]);
  const line = useTransform(progress, [0, 1], ["0%", "100%"]);

  useEffect(() => progress.on("change", v => setChapter(Math.min(5, Math.floor(v * 6)))), [progress]);

  return (
    <main ref={root}>
      <div className="world" aria-hidden="true">
        <motion.div className="scene gate" style={{ opacity: gate, scale, y }} />
        <motion.div className="scene falls" style={{ opacity: falls, scale, y }} />
        <motion.div className="scene courtyard" style={{ opacity: court, scale, y }} />
        <motion.i className="mist" style={{ x: mist }} />
        <div className="vignette" />
        <Petals paused={Boolean(reduced) || paused} />
      </div>

      <header>
        <a className="brand" href="#home"><span className="torii">鳥</span><span>M. VICTOR<br /><b>VENGATESH</b></span></a>
        <nav className={menu ? "open" : ""}>
          {["About", "Craft", "Works", "Experience", "Contact"].map(x => <a key={x} href={`#${x.toLowerCase()}`} onClick={() => setMenu(false)}>{x}</a>)}
        </nav>
        <button className="pause" onClick={() => setPaused(v => !v)}>{paused ? "PLAY" : "PAUSE"} MOTION</button>
        <button className="menu" onClick={() => setMenu(v => !v)} aria-label="Toggle navigation"><i /><i /></button>
      </header>

      <aside className="rail">
        <i><motion.b style={{ height: line }} /></i>
        {["入口", "起源", "技", "作品", "道", "縁"].map((x, i) => <span key={x} className={i === chapter ? "active" : ""}>{x}</span>)}
      </aside>

      <section className="chapter hero" id="home">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.15, ease: [0.16, 1, .3, 1] }}>
          <p className="eyebrow">PORTFOLIO · 2026 / ENTER THE JOURNEY</p>
          <h1><em>M. VICTOR</em><br />VENGATESH</h1>
          <h3>AI/ML Engineer <b>×</b> Creative Technologist</h3>
          <p>I build intelligent systems where engineering precision meets visual imagination.</p>
          <a className="cta" href="#about">Enter the temple <Arrow /></a>
        </motion.div>
        <div className="scroll">SCROLL TO WALK<i /><b>下</b></div>
      </section>

      <section className="chapter" id="about">
        <Panel label="CHAPTER I · THE ORIGIN" title={<>Between logic<br />and <em>imagination.</em></>}>
          <p>I&apos;m a final-year B.E. Artificial Intelligence and Machine Learning student at V.S.B. Engineering College, Karur.</p>
          <p>From Madurai, I create practical AI applications that make complex information clearer, faster, and more useful.</p>
          <div className="stats"><span><b>7.6</b>CGPA</span><span><b>2023—</b>B.E. AIML</span><span><b>02</b>LANGUAGES</span></div>
        </Panel>
      </section>

      <section className="chapter" id="craft">
        <Panel side="right" label="CHAPTER II · THE CRAFT" title={<>Tools refined<br />through <em>practice.</em></>}>
          <div className="skills">
            {skills.map(([a, b], i) => <motion.div key={a} initial={{ opacity: 0, x: 25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .07 }}><span>0{i + 1}</span><small>{a}</small><p>{b}</p></motion.div>)}
          </div>
        </Panel>
      </section>

      <section className="works chapter" id="works">
        <div className="works-title"><p className="eyebrow">CHAPTER III · SELECTED WORKS</p><h2>Three artifacts.<br /><em>One evolving craft.</em></h2></div>
        <div className="projects">
          {projects.map((p, i) => <motion.article key={p.name} initial={{ opacity: 0, y: reduced ? 0 : 75, rotateX: reduced ? 0 : 8 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ amount: .42 }} transition={{ duration: .85, delay: i * .05 }}>
            <b className="roof" /><span>{p.no}</span><small>{p.kind}</small><h3>{p.name}</h3><p>{p.copy}</p><footer>{p.stack}</footer>
          </motion.article>)}
        </div>
      </section>

      <section className="chapter" id="experience">
        <Panel label="CHAPTER IV · THE PATH" title={<>Learning by<br /><em>building.</em></>}>
          <div className="timeline">
            <div><b>2024</b><h3>Emglitz Technologies</h3><p>Built a Grocery Management System interface and trained a malaria detection model.</p></div>
            <div><b>2025—26</b><h3>AI/ML & Web Development</h3><p>Contributed to VisionNet and strengthened experience in data preparation, model training, and testing.</p></div>
            <div><b>NOW</b><h3>The next chapter</h3><p>Practising DSA, deepening core CS, and building useful AI and SaaS products.</p></div>
          </div>
        </Panel>
      </section>

      <section className="chapter contact" id="contact">
        <motion.div initial={{ opacity: 0, scale: reduced ? 1 : .94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ amount: .45 }} transition={{ duration: 1 }}>
          <p className="eyebrow">FINAL CHAPTER · THE COURTYARD</p>
          <h2>Let&apos;s create<br /><em>something meaningful.</em></h2>
          <a className="mail" href="mailto:mvictorvengatesh@gmail.com">mvictorvengatesh@gmail.com <Arrow /></a>
          <div className="links">
            <a href="https://www.linkedin.com/in/victorvengatesh" target="_blank">LinkedIn</a>
            <a href="https://github.com/victorvengatesh" target="_blank">GitHub</a>
            <a href="https://leetcode.com/u/VICTORVENGATESH" target="_blank">LeetCode</a>
            <a href="/Victor_Vengatesh_Resume.pdf" download>Download Résumé</a>
          </div>
        </motion.div>
        <footer className="final"><span>Madurai, Tamil Nadu</span><span>AI / ML · SOFTWARE DEVELOPMENT</span><span>© 2026 M. Victor Vengatesh</span></footer>
      </section>
    </main>
  );
}
