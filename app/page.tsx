"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, OrbitControls, Sphere } from "@react-three/drei";
import { motion, useScroll, useSpring } from "motion/react";
import { useMemo, useRef, useState } from "react";
import type { Group } from "three";
import Image from "next/image";
const experience = [
  {
    years: "2023 — 2025",
    role: "Lead DevOps Engineer / Developer",
    company: "Universal Access and Systems Solutions",
    text: "Led DevOps practices and system architecture for dynamic software projects. Built CI/CD pipelines, automated deployments, optimized Docker-based infrastructure, and implemented performance monitoring.",
  },
  {
    years: "2022 — 2023",
    role: "Associate Operations Manager",
    company: "Universal Access and Systems Solutions",
    text: "Oversaw operational workflows, resource allocation, performance tracking, continuous improvement, and communication between technical teams and executive stakeholders.",
  },
  {
    years: "2021 — 2022",
    role: "Team Leader",
    company: "Universal Access and Systems Solutions",
    text: "Supervised and mentored technical support staff, resolved escalated issues, coordinated schedules, and delivered management reporting.",
  },
  {
    years: "2020 — 2021",
    role: "Technical Support Agent",
    company: "Universal Access and Systems Solutions",
    text: "Troubleshot complex system issues within SLAs and documented bugs and resolutions for engineering and product teams.",
  },
  {
    years: "2017 — 2019",
    role: "Account Associate L2 / Team Lead",
    company: "VXI Global Solutions",
    text: "Led customer experience associates across performance, quality assurance, escalations, team alignment, and management communication.",
  },
  {
    years: "2016 — 2017",
    role: "Customer Service Representative",
    company: "Convergys",
    text: "Delivered analytical troubleshooting, issue resolution, and high-quality customer service.",
  },
  {
    years: "2015 — 2016",
    role: "Customer Service Representative",
    company: "iQor",
    text: "Provided technical and customer support in a KPI- and deadline-driven environment.",
  },
];
const skillGroups = [
  {
    n: "01",
    title: "DevOps & Infrastructure",
    skills: [
      "CI/CD",
      "Process Automation",
      "System Monitoring",
      "Systems Architecture",
      "Docker",
      "Containerization",
    ],
  },
  {
    n: "02",
    title: "Software Engineering",
    skills: [
      "Web Development",
      "AI Development",
      "SDLC",
      "Technical Documentation",
      "Git",
      "GitHub",
    ],
  },
  {
    n: "03",
    title: "Technical Leadership",
    skills: [
      "Project Management",
      "Team Leadership",
      "Process Optimization",
      "Stakeholder Communication",
      "Cross-functional Collaboration",
    ],
  },
];
function Core() {
  const ref = useRef<Group>(null);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.12;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
    }
  });
  const nodes = useMemo(
    () =>
      [
        [2.5, 0.4, 0],
        [-2.2, 1, 1],
        [0.2, 2.3, -0.4],
        [-0.5, -2.1, 0.7],
        [2, -1.3, -0.8],
      ] as [number, number, number][],
    [],
  );
  return (
    <group ref={ref}>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.4}>
        <Sphere args={[1.15, 48, 48]}>
          <meshStandardMaterial
            color="#0d2921"
            emissive="#3be6ba"
            emissiveIntensity={0.22}
            metalness={0.65}
            roughness={0.25}
          />
        </Sphere>
        <Sphere args={[0.82, 24, 24]}>
          <meshBasicMaterial
            color="#b7f77c"
            wireframe
            transparent
            opacity={0.16}
          />
        </Sphere>
      </Float>
      {nodes.map((p, i) => (
        <group key={i}>
          <Sphere args={[0.09, 16, 16]} position={p}>
            <meshBasicMaterial color={i % 2 ? "#55e4cf" : "#b7f77c"} />
          </Sphere>
          <Line
            points={[[0, 0, 0], p]}
            color="#55e4cf"
            transparent
            opacity={0.36}
            lineWidth={0.7}
          />
        </group>
      ))}
    </group>
  );
}
function HeroScene() {
  return (
    <div className="scene">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.35} />
        <pointLight position={[4, 4, 5]} color="#b7f77c" intensity={35} />
        <pointLight position={[-4, -2, 2]} color="#55e4cf" intensity={22} />
        <Core />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.25}
        />
      </Canvas>
      <div className="portraitCore">
        <Image
          src="/jommel-lingad.png"
          alt="Portrait of Jommel Joseph R. Lingad"
          fill
          priority
          sizes="(max-width: 560px) 150px, 190px"
        />
      </div>
      <div className="sceneLabel">
        <span>INFRASTRUCTURE CORE</span>
        <b>● LIVE</b>
      </div>
    </div>
  );
}
const Reveal = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
  >
    {children}
  </motion.div>
);
export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 28 });
  const [status, setStatus] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Sending…");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await r.json()) as { message: string };
      setStatus(result.message);
      if (r.ok) form.reset();
    } catch {
      setStatus("Unable to send right now. Please email me directly.");
    }
  }
  return (
    <main>
      <motion.div className="progress" style={{ scaleX }} />
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top">
          <span>JL</span> Jommel Lingad - Your Next VA
        </a>
        <div className="navlinks">
          <a href="#expertise">Expertise</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="navCta" href="#contact">
          Let’s talk ↗
        </a>
      </nav>
      <section className="hero" id="top">
        <div className="heroGrid" aria-hidden="true" />
        <div className="heroCopy">
          <p className="eyebrow">
            <span className="pulse" /> DevOps · Development · Automation
          </p>
          <h1>
            I engineer the
            <br />
            <em>systems behind</em>
            <br />
            great software.
          </h1>
          <p className="lede">
            Lead DevOps Engineer &amp; Developer specializing in automated
            infrastructure, reliable delivery, and intelligent applications.
          </p>
          <div className="actions">
            <a className="primary" href="#experience">
              Explore my experience <span>↓</span>
            </a>
            <a
              className="secondary"
              href="mailto:jommeljosephlingad23@gmail.com"
            >
              Get in touch
            </a>
          </div>
          <div className="stats">
            <div>
              <strong>10+</strong>
              <span>Years across technology &amp; operations</span>
            </div>
            <div>
              <strong>CI/CD</strong>
              <span>Automated delivery systems</span>
            </div>
            <div>
              <strong>B2</strong>
              <span>English proficiency</span>
            </div>
          </div>
        </div>
        <HeroScene />
      </section>
      <section className="marquee" aria-label="Core capabilities">
        <div>
          DEVOPS <i>✦</i> AUTOMATION <i>✦</i> INFRASTRUCTURE <i>✦</i> SOFTWARE
          ENGINEERING <i>✦</i> AI DEVELOPMENT
        </div>
      </section>
      <section className="section intro" id="about">
        <Reveal>
          <p className="kicker">PROFILE / 01</p>
          <h2>
            From customer support to
            <br />
            <em>engineering reliable systems.</em>
          </h2>
        </Reveal>
        <Reveal className="introText">
          <p>
            I’m a versatile Lead DevOps Engineer and Developer with a Bachelor
            of Science in Information Technology and a track record of
            optimizing infrastructure and application performance.
          </p>
          <p>
            I connect technical depth with operational leadership—automating
            complex workflows, building CI/CD pipelines, applying
            containerization, and helping teams deliver scalable software.
          </p>
        </Reveal>
      </section>
      <section className="section expertise" id="expertise">
        <div className="sectionHead">
          <Reveal>
            <p className="kicker">CAPABILITIES / 02</p>
            <h2>
              Engineering across
              <br />
              <em>the entire system.</em>
            </h2>
          </Reveal>
          <p>
            From infrastructure foundations to team execution, each layer is
            designed to improve reliability and delivery.
          </p>
        </div>
        <div className="skillGrid">
          {skillGroups.map((g) => (
            <Reveal className="skillCard" key={g.n}>
              <span className="cardNum">{g.n}</span>
              <div className="skillIcon" aria-hidden="true">
                {g.n === "01" ? "⌬" : g.n === "02" ? "⌘" : "◎"}
              </div>
              <h3>{g.title}</h3>
              <ul>
                {g.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section experience" id="experience">
        <div className="sectionHead">
          <Reveal>
            <p className="kicker">CAREER / 03</p>
            <h2>
              A decade of
              <br />
              <em>progressive responsibility.</em>
            </h2>
          </Reveal>
          <p>
            Customer support → technical support → leadership → operations →
            DevOps engineering.
          </p>
        </div>
        <div className="timeline">
          {experience.map((job, i) => (
            <Reveal className="job" key={job.years + job.role}>
              <div className="jobIndex">{String(i + 1).padStart(2, "0")}</div>
              <div className="jobDate">{job.years}</div>
              <div>
                <h3>{job.role}</h3>
                <h4>{job.company}</h4>
                <p>{job.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section credentials">
        <Reveal className="credential feature">
          <p className="kicker">EDUCATION</p>
          <span className="credentialMark">DH</span>
          <h3>
            Bachelor of Science in
            <br />
            Information Technology
          </h3>
          <p>
            Don Honorio Ventura Technological State University
            <br />
            Bacolor, Pampanga · Graduated April 2015
          </p>
        </Reveal>
        <div className="credentialStack">
          <Reveal className="credential">
            <p className="kicker">CONTINUOUS LEARNING</p>
            <h3>Google Innovator</h3>
            <p>
              Advanced technology, cloud ecosystems, and software solutions.
            </p>
          </Reveal>
          <Reveal className="credential">
            <p className="kicker">PROCESS EXCELLENCE</p>
            <h3>Six Sigma Green Belt Training</h3>
            <p>
              Lean Six Sigma, root cause analysis, process optimization, and
              operational efficiency.
            </p>
          </Reveal>
          <Reveal className="credential">
            <p className="kicker">TECHNICAL PURSUITS</p>
            <h3>Always exploring what’s next.</h3>
            <p>
              AI development, open-source software, and automation technologies.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section contact" id="contact">
        <div>
          <p className="kicker">CONTACT / 04</p>
          <h2>
            Let’s build something
            <br />
            <em>reliable, scalable,</em>
            <br />
            and intelligent.
          </h2>
          <p className="contactText">
            Based in Mabalacat City, Pampanga, Philippines. Available for
            engineering opportunities and technical collaboration.
          </p>
          <a className="email" href="mailto:jommeljosephlingad23@gmail.com">
            jommeljosephlingad23@gmail.com ↗
          </a>
        </div>
        <form onSubmit={submit}>
          <label>
            Name
            <input name="name" required maxLength={80} autoComplete="name" />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              required
              maxLength={120}
              autoComplete="email"
            />
          </label>
          <label>
            Subject
            <input name="subject" required maxLength={120} />
          </label>
          <label>
            Message
            <textarea name="message" required maxLength={2000} rows={5} />
          </label>
          <button className="primary" type="submit">
            Send message ↗
          </button>
          <p role="status" className="formStatus">
            {status}
          </p>
        </form>
      </section>
      <footer>
        <a className="brand" href="#top">
          <span>JL</span> Jommel Joseph R. Lingad
        </a>
        <p>Lead DevOps Engineer &amp; Developer</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
