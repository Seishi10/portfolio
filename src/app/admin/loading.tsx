export default function AdminLoading() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-6">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-accent)]" />
        <p className="font-mono text-sm text-[var(--color-text-secondary)]">
          Loading dashboard...
        </p>
      </div>
    </div>
  );
}