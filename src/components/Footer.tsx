export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-[var(--color-text-secondary)] sm:flex-row">
        <p>© {new Date().getFullYear()} Jonathan Jude Suico</p>
        <div className="flex gap-4">
          
           <a href="https://www.linkedin.com/in/jonathan-jude-suico-b4231b418"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--color-text-primary)]"
          >
            LinkedIn
          </a>
          <a
            href="https://www.credly.com/users/jonathan-jude-bulahan.f68cc045"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--color-text-primary)]"
          >
            Credly
          </a>
          <a
            href="mailto:shirusei97@gmail.com"
            className="transition-colors hover:text-[var(--color-text-primary)]"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}