type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AdminMessagesPanel({
  messages,
}: {
  messages: Message[];
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold">
        Messages ({messages.length})
      </h2>

      {messages.length === 0 ? (
        <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
          No messages yet.
        </p>
      ) : (
        <div className="mt-4 flex flex-col gap-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm"
            >
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <p className="font-medium text-sm">{msg.name}</p>
                <span className="font-mono text-xs text-[var(--color-text-secondary)]">
                  {formatDate(msg.created_at)}
                </span>
              </div>
              
                <a href={`mailto:${msg.email}`}
                className="text-xs text-[var(--color-accent)] underline underline-offset-2"
              >
                {msg.email}
              </a>
              <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}