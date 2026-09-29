import ContactForm from "@/components/ContactForm";
import { supabase } from "@/lib/supabaseClient";
import Reveal from "@/components/Reveal";
import HashScroll from "@/components/HashScroll";

const certifications = [
  { name: "Ethical Hacker", issuer: "Cisco Networking Academy" },
  { name: "Network Defense", issuer: "Cisco Networking Academy" },
  { name: "Networking Basics", issuer: "Cisco Networking Academy" },
  {
    name: "Networking Devices and Initial Configuration",
    issuer: "Cisco Networking Academy",
  },
  { name: "Explore Emerging Tech", issuer: "IBM SkillsBuild" },
  { name: "Getting Started with Generative AI", issuer: "IBM SkillsBuild" },
  { name: "Lifelong Professional Skills", issuer: "IBM SkillsBuild" },
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
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Project[]>();

  if (error) {
    console.error("Failed to load projects:", error.message);
  }

  const safeProjects = projects ?? [];

  return (
    <main className="min-h-screen">
      <HashScroll />
      {/* Hero */}
      <section
        id="home"
        className="mx-auto grid min-h-[85vh] scroll-mt-24 max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div>
          <p className="font-mono text-sm text-[var(--color-accent)]">
            Hi, my name is
          </p>

          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
            Jonathan Jude Suico
          </h1>

          <h2 className="mt-2 text-2xl font-semibold text-[var(--color-text-secondary)] sm:text-3xl">
            Computer Engineering Graduate &amp; Software Developer
          </h2>

          <p className="mt-6 max-w-2xl text-[var(--color-text-secondary)]">
            I build software with a foundation in computer engineering —
            combining programming, networking fundamentals, and hands-on
            systems experience. Currently seeking opportunities to grow as a
            software developer and contribute to real-world projects.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-[#0A0E17] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_24px_var(--color-accent-soft)] active:translate-y-0"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="rounded-lg border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="relative isolate mx-auto w-full max-w-sm">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, var(--color-accent-soft) 0%, transparent 70%)",
            }}
          />

          <div className="rounded-3xl bg-[linear-gradient(135deg,var(--color-accent),var(--color-border)_45%,var(--color-border)_65%,var(--color-accent))] p-px shadow-[0_0_40px_var(--color-accent-soft)]">
            <div className="rounded-[23px] bg-[var(--color-surface)] p-3 sm:p-4">
              <div className="overflow-hidden rounded-xl border border-[var(--color-border)]">
                <img
                  src="/Images/profile.png"
                  alt="Jonathan Jude Suico"
                  className="block h-auto w-full select-none"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <Reveal>
        <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
          <h2 className="text-3xl font-semibold">About</h2>

          <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">
            I&apos;m a Computer Engineering graduate from the University of
            Cebu, with hands-on experience spanning software development,
            networking fundamentals, and embedded systems. I&apos;m Dean&apos;s
            Lister for the 2024&ndash;2025 academic year, and I&apos;m
            currently focused on growing as a software developer.
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

            <div>
              <h3 className="text-lg font-semibold">Certifications</h3>

              <div className="mt-4 flex flex-col gap-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.name}
                    className="interactive-card rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm"
                  >
                    <p className="text-sm font-medium">{cert.name}</p>

                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {cert.issuer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Skills */}
      <Reveal>
        <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
          <h2 className="text-3xl font-semibold">Skills</h2>

          <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">
            Technical and professional skills developed through coursework,
            projects, and hands-on experience.
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
                      className="rounded-md border border-[var(--color-border)] px-2.5 py-1 font-mono text-xs text-[var(--color-text-primary)] transition-colors duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
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
        <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
          <h2 className="text-3xl font-semibold">Experience</h2>

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
        <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
          <h2 className="text-3xl font-semibold">Projects</h2>

          <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">
            A selection of academic and hands-on projects combining software
            and hardware.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {safeProjects.map((project) => (
              <div
                key={project.id}
                className="interactive-card flex h-full flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm"
              >
                <div className="flex h-40 shrink-0 items-center justify-center rounded-t-xl border-b border-[var(--color-border)] bg-[var(--color-background)]">
                  <span className="font-mono text-4xl text-[var(--color-accent)]">
                    {"</>"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">
                    {project.type}
                  </span>

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

      {/* Contact */}
      <Reveal>
        <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
          <h2 className="text-3xl font-semibold">Contact</h2>

          <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">
            Have an opportunity or question? Send a message below, or reach
            out directly at{" "}
            <a
              href="mailto:shirusei97@gmail.com"
              className="text-[var(--color-accent)] underline underline-offset-2"
            >
              shirusei97@gmail.com
            </a>
            .
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
    category: "Professional Skills",
    skills: ["Communication", "Problem Solving", "Teamwork", "Time Management"],
  },
  {
    category: "Security & SOC Tools",
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
