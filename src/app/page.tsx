import ContactForm from "@/components/ContactForm";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import Reveal from "@/components/Reveal";
import HashScroll from "@/components/HashScroll";
import CaseFilesGrid from "@/components/CaseFilesGrid";
import type { CaseFile } from "@/lib/types";

const certificationGroups = [
  {
    issuer: "Cisco Networking Academy",
    mark: "cisco",
    markClass: "certification-cisco",
    url: "https://www.credly.com/users/jonathan-jude-bulahan.f68cc045",
    certifications: [
      { name: "Ethical Hacker", issuer: "Cisco Networking Academy" },
      { name: "Network Defense", issuer: "Cisco Networking Academy" },
      { name: "Networking Basics", issuer: "Cisco Networking Academy" },
      { name: "Networking Devices and Initial Configuration", issuer: "Cisco Networking Academy" },
    ],
  },
  {
    issuer: "IBM SkillsBuild",
    mark: "ibm",
    markClass: "certification-ibm",
    url: "https://www.credly.com/users/jonathan-jude-bulahan.f68cc045",
    certifications: [
      { name: "Explore Emerging Tech", issuer: "IBM SkillsBuild" },
      { name: "Getting Started with Generative AI", issuer: "IBM SkillsBuild" },
      { name: "Lifelong Professional Skills", issuer: "IBM SkillsBuild" },
    ],
  },
];

type Project = {
  id: string;
  title: string;
  type: string;
  description: string;
  tech: string[];
  created_at: string;
};

export default async function Home() {
  const [projectsResult, caseFilesResult] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
      .returns<Project[]>(),
    supabase
      .from("case_files")
      .select("*")
      .order("case_number", { ascending: true })
      .returns<CaseFile[]>(),
  ]);

  const { data: projects, error } = projectsResult;

  if (error) {
    console.error("Failed to load projects:", error.message);
  }

  const safeProjects = projects ?? [];
  const safeCaseFiles = caseFilesResult.data ?? [];

  return (
    <main className="min-h-screen">
      <HashScroll />
      {/* Hero */}
      <section
        id="home"
        className="mx-auto grid min-h-[85vh] scroll-mt-24 max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 sm:gap-12 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="order-1 lg:order-2">
          <p className="font-mono text-sm text-[var(--color-accent)]">
            Hi, my name is
          </p>

          <h1 className="mt-2 text-4xl font-bold leading-tight sm:text-5xl">
            Jonathan Jude Suico
          </h1>

          <h2 className="mt-2 text-2xl font-semibold text-[var(--color-text-secondary)] sm:text-3xl">
            Computer Engineering graduate &amp; software developer
          </h2>

          <p className="mt-6 max-w-2xl text-[var(--color-text-secondary)]">
            I build practical software with a computer engineering foundation,
            from a Raspberry Pi food locker capstone to tools and interfaces
            shaped by networking and systems work. Security analysis is a
            focused secondary interest.
          </p>

          <p className="mt-4 font-mono text-sm text-[var(--color-accent)]">
            Looking for: entry-level software developer roles in Cebu / remote
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="#work"
              className="glass-action glass-action-primary w-full px-5 py-3 text-center text-sm font-medium sm:w-auto sm:py-2.5"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="glass-action w-full px-5 py-3 text-center text-sm font-medium sm:w-auto sm:py-2.5"
            >
              Contact Me
            </a>

            <a
              href="/Jonathan-Jude-Suico-CV.pdf"
              download="Jonathan-Jude-Suico-CV.pdf"
              className="glass-action w-full px-5 py-3 text-center text-sm font-medium sm:w-auto sm:py-2.5"
            >
              Download CV
            </a>
          </div>
        </div>

        <div className="portrait-stage relative isolate order-2 mx-auto w-full max-w-sm lg:order-1">
          <img
            src="/Images/profile.png"
            alt="Jonathan Jude Suico"
            className="portrait-image relative z-10 block h-auto w-full select-none"
            draggable={false}
          />
        </div>
      </section>

      {/* About */}
      <Reveal>
        <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-3xl font-semibold">About</h2>

          <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">
            I&apos;m a Computer Engineering graduate from the University of
            Cebu focused on building useful software and learning how systems
            work under the hood. My capstone and development projects are
            supported by a foundation in networking, embedded systems, and
            security analysis.
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold">Education</h3>

              <div className="interactive-card mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm">
                <p className="font-medium">BS Computer Engineering</p>

                <p className="text-sm text-[var(--color-text-secondary)]">
                  University of Cebu &ndash; Banilad Campus, 2022&ndash;2026
                </p>

                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                  Dean&apos;s Lister, AY 2024&ndash;2025
                </p>
              </div>
            </div>

          </div>
        </section>
      </Reveal>

      {/* Certifications */}
      <Reveal>
        <section id="certifications" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-10 sm:px-6 sm:py-12">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-semibold">Certifications</h2>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                Cisco networking and security credentials, with additional IBM SkillsBuild coursework.
              </p>
            </div>
            <a href="https://www.credly.com/users/jonathan-jude-bulahan.f68cc045" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-accent)] hover:underline">
              View Credly profile →
            </a>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {certificationGroups.map((group) => (
              <div key={group.issuer} className={`interactive-card rounded-xl border border-[var(--color-border)] p-4 shadow-sm ${group.markClass === "certification-ibm" ? "opacity-85" : ""}`}>
                <div className="flex items-center gap-3">
                  <span className={`certification-issuer-mark ${group.markClass}`} aria-hidden="true">{group.mark}</span>
                  <div>
                    <h3 className="text-sm font-semibold">{group.issuer}</h3>
                    <p className="text-xs text-[var(--color-text-secondary)]">{group.certifications.length} credentials</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.certifications.map((cert) => (
                    <a key={cert.name} href={group.url} target="_blank" rel="noopener noreferrer" className="rounded-md border border-[var(--color-border)] px-2.5 py-1.5 text-xs text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
                      {cert.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Skills */}
      <Reveal>
        <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-3xl font-semibold">Skills</h2>

          <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">
            I use these languages and tools to build small systems, inspect
            network traffic, and investigate suspicious activity.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group) => (
              <div
                key={group.category}
                className="interactive-card rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm"
              >
                <h3 className="text-sm font-semibold text-[var(--color-text-secondary)]">
                  {group.category}
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-chip rounded-md border border-[var(--color-border)] px-2.5 py-1 font-mono text-xs text-[var(--color-text-primary)] transition-colors duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Experience */}
      <Reveal>
        <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-semibold">Experience</h2>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">A short IT support role supporting day-to-day operations.</p>
            </div>
            <a href="/Jonathan-Jude-Suico-CV.pdf" download="Jonathan-Jude-Suico-CV.pdf" className="glass-action w-full px-5 py-3 text-center text-sm font-medium sm:w-auto sm:py-2.5">
              Download CV
            </a>
          </div>

          <div className="mt-10 flex flex-col gap-6">
            {experience.map((job) => (
              <div
                key={job.role + job.company}
                className="interactive-card rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm"
              >
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <h3 className="text-lg font-semibold">{job.role}</h3>

                  <span className="font-mono text-xs text-[var(--color-text-secondary)]">
                    {job.period}
                  </span>
                </div>

                <p className="text-sm text-[var(--color-text-secondary)]">
                  {job.company}
                </p>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--color-text-secondary)]">
                  {job.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Projects */}
      <Reveal>
        <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-3xl font-semibold">Projects</h2>

          <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">
            My capstone was a QR-activated food locker built on a Raspberry Pi.
            This section is for software and hardware projects; the Case Files
            section separately documents guided labs and self-directed analysis.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {safeProjects.map((project) => (
              <div
                key={project.id}
                className="interactive-card flex h-full flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm"
              >
                <div className="flex h-40 shrink-0 items-end rounded-t-xl border-b border-[var(--color-border)] bg-[var(--color-background)] p-5">
                  <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                    {project.type}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="mt-2 text-lg font-semibold">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-[var(--color-border)] px-2.5 py-1 font-mono text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Case Files */}
      <Reveal>
        <section id="case-files" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
          <Link href="/case-files" className="font-mono text-sm text-[var(--color-accent)] hover:underline">
            View all case files →
          </Link>
          <h2 className="mt-2 text-3xl font-semibold">Case Files</h2>
          <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">
            Security analysis labs and case studies, clearly labeled by their
            learning context — including Splunk and Wireshark work tracing DNS
            tunneling in the BOTS v2 dataset.
          </p>

          <CaseFilesGrid caseFiles={safeCaseFiles} />
        </section>
      </Reveal>

      {/* Contact */}
      <Reveal>
        <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-3xl font-semibold">Contact</h2>

          <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">
            Have an opportunity or question? Send a message below and I&apos;ll
            get back to you.
          </p>

          <div className="mt-10 max-w-xl">
            <ContactForm />
          </div>
        </section>
      </Reveal>
    </main>
  );
}

const skillGroups = [
  {
    category: "Languages",
    skills: ["Java", "Python", "C", "JavaScript", "HTML"],
  },
  {
    category: "Developer Tools",
    skills: ["Git", "GitHub", "Visual Studio", "Arduino IDE"],
  },
  {
    category: "Security Analysis Tools",
    skills: [
      "Splunk",
      "Wireshark",
      "Nmap",
      "SIEM",
      "MITRE ATT&CK",
      "VirusTotal",
      "AbuseIPDB",
      "Shodan",
    ],
  },
];

const experience = [
  {
    role: "IT Assistant",
    company: "Metrics Call Services Corp.",
    period: "May 2025 – June 2025",
    responsibilities: [
      "Assisted with agent account creation and basic IT support tasks for daily operations",
      "Troubleshot agent workstation issues and performed initial diagnostics for hardware, software, and connectivity concerns",
      "Coordinated with IT personnel for escalated technical issues to help maintain a smooth workflow",
    ],
  },
];
