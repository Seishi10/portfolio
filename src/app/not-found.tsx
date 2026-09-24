export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm text-[var(--color-accent)]">404</p>
      <h1 className="mt-2 text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 max-w-md text-[var(--color-text-secondary)]">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      
       <a href="/"
        className="mt-6 rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Go Home
      </a>
    </div>
  );
}